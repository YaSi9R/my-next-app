
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import * as XLSX from "xlsx";
import { uploadFromUrl } from "@/lib/utils/image-uploader";

// Helper to convert plain text to basic HTML (paragraphs and breaks)
function formatDescription(text: string): string {
    if (!text) return "";

    // If it already looks like HTML (contains < tags), return as is
    if (/<[a-z][\s\S]*>/i.test(text)) {
        return text;
    }

    // Convert double newlines to paragraphs
    const paragraphs = text.split(/\n\n+/).map(p => `<p>${p.trim().replace(/\n/g, '<br />')}</p>`);
    return paragraphs.join('');
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet) as any[];

        console.log(`Processing ${data.length} products from Excel...`);

        let successCount = 0;
        let failCount = 0;
        const errors: string[] = [];

        // Process sequentially to avoid race conditions when creating categories/subcategories
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const rowNum = i + 2; // 1-indexed + header row
            try {
                const {
                    Name, Condition, Category, Subcategory, "Third Level": SubSubcategory,
                    Availability, "Short Description": shortDescription, "Long Description": longDescription,
                    Features, Specifications, Images
                } = item;

                const nameStr = Name ? String(Name).trim() : "";
                const categoryName = Category ? String(Category).trim() : "";
                const subcategoryName = Subcategory ? String(Subcategory).trim() : "";

                if (!nameStr || !categoryName || !subcategoryName) {
                    throw new Error(`Row ${rowNum}: Missing required fields (Name, Category, or Subcategory)`);
                }

                // 1. Resolve Category
                const categorySlug = slugify(categoryName, { lower: true, strict: true });
                let category = await prisma.category.findUnique({ where: { slug: categorySlug } });
                if (!category) {
                    category = await prisma.category.create({
                        data: { name: categoryName, slug: categorySlug }
                    });
                }

                // 2. Resolve Subcategory
                const subcategorySlug = slugify(subcategoryName, { lower: true, strict: true });
                let subcategory = await prisma.subcategory.findFirst({
                    where: { slug: subcategorySlug, categoryId: category.id }
                });
                if (!subcategory) {
                    subcategory = await prisma.subcategory.create({
                        data: {
                            name: subcategoryName,
                            slug: subcategorySlug,
                            categoryId: category.id
                        }
                    });
                }

                // 3. Resolve SubSubcategory (optional)
                let subSubcategoryId: string | null = null;
                if (SubSubcategory) {
                    const subsubName = String(SubSubcategory).trim();
                    if (subsubName) {
                        const subSubcategorySlug = slugify(subsubName, { lower: true, strict: true });
                        let subsub = await prisma.subSubcategory.findFirst({
                            where: { slug: subSubcategorySlug, subcategoryId: subcategory.id }
                        });
                        if (!subsub) {
                            subsub = await prisma.subSubcategory.create({
                                data: {
                                    name: subsubName,
                                    slug: subSubcategorySlug,
                                    subcategoryId: subcategory.id
                                }
                            });
                        }
                        subSubcategoryId = subsub.id;
                    }
                }

                // 4. Handle Images
                let imageUrls: string[] = [];
                if (Images) {
                    const urls = String(Images).split(",").map((u: string) => u.trim()).filter(Boolean);
                    for (const url of urls) {
                        const uploadedUrl = await uploadFromUrl(url);
                        if (uploadedUrl) imageUrls.push(uploadedUrl);
                    }
                }

                // 5. Parse Specifications
                let specs: any[] = [];
                if (Specifications) {
                    specs = String(Specifications).split(";").map((s: string) => {
                        const [label, value] = s.split(":");
                        return { label: label?.trim() || "", value: value?.trim() || "" };
                    }).filter((s: any) => s.label);
                }

                // 6. Parse Features
                const featuresList = Features ? String(Features).split(",").map((f: string) => f.trim()).filter(Boolean) : [];

                // 7. Create Product
                const baseSlug = slugify(nameStr, { lower: true, strict: true });
                await prisma.product.create({
                    data: {
                        name: nameStr,
                        slug: `${baseSlug}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        condition: Condition ? String(Condition).trim() : "New",
                        availability: Availability ? String(Availability).trim() : "In Stock",
                        shortDescription: shortDescription ? String(shortDescription).trim() : "",
                        longDescription: longDescription ? formatDescription(String(longDescription)) : "",
                        images: imageUrls,
                        specifications: specs,
                        features: featuresList,
                        categoryId: category.id,
                        subcategoryId: subcategory.id,
                        subsubcategoryId: subSubcategoryId,
                    },
                });

                successCount++;
            } catch (err: any) {
                failCount++;
                errors.push(err.message || "Unknown error");
                console.error(`Error processing row ${rowNum}:`, err);
            }
        }

        return NextResponse.json({
            success: true,
            summary: {
                total: data.length,
                success: successCount,
                failed: failCount,
                errors: errors.slice(0, 50) // Return first 50 errors
            }
        });

    } catch (error: any) {
        console.error("Bulk Upload Error:", error);
        return NextResponse.json({ error: "Failed to process bulk upload" }, { status: 500 });
    }
}

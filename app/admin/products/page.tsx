"use client";

import { useEffect, useState } from "react";
import slugify from "slugify";
import TableShimmer from "@/components/admin/TableShimmer";

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

interface SubSubcategory {
  id: string;
  name: string;
  subcategoryId: string;
}

interface Product {
  id?: string | null;
  name: string;
  condition: string;
  images: string[];
  shortDescription: string;
  longDescription: string;
  availability: string;
  brandId: string;
  categoryId: string;
  subcategoryId: string;
  subsubcategoryId?: string; // Optional
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
}
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subsubcategories, setSubSubcategories] = useState<SubSubcategory[]>([]);
  const [featuresInput, setFeaturesInput] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Product>({
    name: "",
    condition: "New",
    images: [],
    shortDescription: "",
    longDescription: "",
    availability: "",
    brandId: "",
    categoryId: "",
    subcategoryId: "",
    subsubcategoryId: "",
    specifications: [{ label: "", value: "" }],
    features: [],
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const input = e.target;
    const files = input.files;

    if (!files || files.length === 0) return;

    if (form.images.length >= 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    const selectedFiles: File[] = Array.from(files).slice(
      0,
      4 - form.images.length,
    );

    try {
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        // ✅ Validate file type
        if (!file.type.startsWith("image/")) {
          alert("Only image files are allowed");
          continue;
        }

        // ✅ Validate file size (20MB max)
        if (file.size > MAX_FILE_SIZE) {
          alert(`File ${file.name} exceeds 20MB limit`);
          continue;
        }

        const data = new FormData();
        data.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const result = (await res.json()) as { url?: string };

        if (!result.url) {
          throw new Error("Invalid upload response");
        }

        uploadedUrls.push(result.url);
      }

      if (uploadedUrls.length > 0) {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      }

      // Reset input (TS safe)
      input.value = "";
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed");
    }
  };

  const removeImage = (index: number) => {
    const updated = [...form.images];
    updated.splice(index, 1);

    setForm({
      ...form,
      images: updated,
    });
  };

  const addSpecification = () => {
    setForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: "", value: "" }],
    }));
  };

  const updateSpecification = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    const updated = [...form.specifications];
    updated[index][field] = value;

    setForm({
      ...form,
      specifications: updated,
    });
  };

  const removeSpecification = (index: number) => {
    const updated = [...form.specifications];
    updated.splice(index, 1);

    setForm({
      ...form,
      specifications: updated,
    });
  };

  // ================= FETCH =================

  const fetchData = async () => {
    setLoadingData(true);

    const [p, b, c, s, ss] = await Promise.all([
      fetch("/api/products"),
      fetch("/api/brands"),
      fetch("/api/categories"),
      fetch("/api/subcategories"),
      fetch("/api/subsubcategories"),
    ]);
    const list = await p.json();
    setProducts(list.products);
    console.log("ddd", list.products);
    setBrands(await b.json());
    setCategories(await c.json());
    setSubcategories(await s.json());
    setSubSubcategories(await ss.json());

    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SUBMIT =================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = slugify(form.name, { lower: true, strict: true });

    const payload = {
      ...form,
      slug,
      specifications: form.specifications.filter(
        (s: any) => s.label && s.value,
      ),
      features: featuresInput
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
    };

    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      condition: "New",
      images: [],
      shortDescription: "",
      longDescription: "",
      availability: "",
      brandId: "",
      categoryId: "",
      subcategoryId: "",
      subsubcategoryId: "",
      specifications: [],
      features: [],
    });
    setFeaturesInput("");
  };

  // ================= DELETE =================

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // ================= FILTER SUBCATEGORIES =================

  const filteredSubcategories = subcategories.filter(
    (s) => s.categoryId === form.categoryId,
  );

  const filteredSubSubcategories = subsubcategories.filter(
    (ss) => ss.subcategoryId === form.subcategoryId,
  );

  if (loadingData) return <TableShimmer />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75] mb-6">Products</h1>

      {/* ================= FORM ================= */}

      <div className="bg-white p-6 rounded-xl shadow mb-10 text-[#022c75] space-y-4">
        <h2 className="text-xl font-semibold">
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            required
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded p-2 col-span-2"
          />

          <select
            value={form.brandId}
            onChange={(e) => setForm({ ...form, brandId: e.target.value })}
            className="border rounded p-2"
            required
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="border rounded p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.subcategoryId}
            onChange={(e) =>
              setForm({
                ...form,
                subcategoryId: e.target.value,
                subsubcategoryId: "" // Reset third level when subcategory changes
              })
            }
            className="border rounded p-2"
            required
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {filteredSubSubcategories.length > 0 && (
            <select
              value={form.subsubcategoryId || ""}
              onChange={(e) =>
                setForm({ ...form, subsubcategoryId: e.target.value })
              }
              className="border rounded p-2"
            >
              <option value="">Select Third Level (Optional)</option>
              {filteredSubSubcategories.map((ss) => (
                <option key={ss.id} value={ss.id}>
                  {ss.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            className="border rounded p-2"
          >
            <option>New</option>
            <option>Used</option>
            <option>Refurbished</option>
          </select>

          <div className="col-span-2 space-y-3">
            <label className="font-medium">Upload Images (Max 4)</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border rounded p-2 w-full"
            />

            {/* Preview */}
            <div className="flex gap-4 flex-wrap">
              {form.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    className="w-24 h-24 object-cover rounded border"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input
            placeholder="Availability"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
            className="border rounded p-2 col-span-2"
          />

          <textarea
            placeholder="Short Description"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
            className="border rounded p-2 col-span-2"
          />

          <textarea
            placeholder="Long Description"
            value={form.longDescription}
            onChange={(e) =>
              setForm({
                ...form,
                longDescription: e.target.value,
              })
            }
            className="border rounded p-2 col-span-2"
          />

          {/* <textarea
            placeholder='Specifications JSON (Example: [{"label":"Speed","value":"50k CPH"}])'
            value={form.specifications}
            onChange={(e) =>
              setForm({
                ...form,
                specifications: e.target.value,
              })
            }
            className="border rounded p-2 col-span-2"
          /> */}

          <div className="col-span-2">
            <h3 className="font-semibold mb-2">Specifications</h3>

            {form.specifications.map((spec: any, index: number) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  placeholder="Specification Name"
                  className="border p-2 w-1/2 rounded"
                  value={spec.label}
                  onChange={(e) =>
                    updateSpecification(index, "label", e.target.value)
                  }
                />

                <input
                  placeholder="Specification Value"
                  className="border p-2 w-1/2 rounded"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, "value", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addSpecification}
              className="text-sm text-blue-600 mt-2"
            >
              + Add Specification
            </button>
          </div>

          <input
            placeholder="Features (comma separated)"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            className="border rounded p-2 col-span-2"
          />

          <button className="bg-[#022c75] text-white py-2 rounded col-span-2">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white p-6 rounded-xl shadow text-[#022c75]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Condition</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-3 font-semibold">{p.name}</td>
                <td>{(p as any).category?.name || "N/A"}</td>
                <td>{(p as any).subcategory?.name || "N/A"}</td>
                <td>{p.condition}</td>
                <td>{p.availability}</td>
                <td className="space-x-3">
                  <button
                    onClick={() => {
                      setEditingId(p.id!);
                      setForm({
                        ...p,
                        specifications: (p as any).specifications || [
                          { label: "", value: "" },
                        ],
                        features: Array.isArray(p.features) ? p.features : [],
                      });
                      setFeaturesInput(
                        Array.isArray(p.features) ? p.features.join(", ") : "",
                      );
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id!)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

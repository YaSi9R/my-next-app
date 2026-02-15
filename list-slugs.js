const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    let output = "";
    output += "--- CATEGORIES ---\n";
    const categories = await prisma.category.findMany();
    categories.forEach(c => output += `${c.name} -> ${c.slug} (${c.id})\n`);

    output += "\n--- SUBCATEGORIES ---\n";
    const subcategories = await prisma.subcategory.findMany({
        include: { category: true }
    });
    subcategories.forEach(s => output += `${s.name} (Cat: ${s.category.name}) -> ${s.slug} (${s.id})\n`);

    output += "\n--- BRANDS ---\n";
    const brands = await prisma.brand.findMany();
    brands.forEach(b => output += `${b.name} -> ${b.slug} (${b.id})\n`);

    fs.writeFileSync('slugs_output.txt', output);
    console.log("Output written to slugs_output.txt");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

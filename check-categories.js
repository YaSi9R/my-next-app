const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.findMany({
        include: { subcategories: true }
    });

    categories.forEach(c => {
        console.log(`Category: ${c.name} (Slug: ${c.slug})`);
        c.subcategories.forEach(s => {
            console.log(`  Subcategory: ${s.name} (Slug: ${s.slug})`);
        });
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

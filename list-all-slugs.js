const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- BRANDS ---');
    const brands = await prisma.brand.findMany();
    brands.forEach(b => console.log(`${b.name}: ${b.slug}`));

    console.log('\n--- SUBCATEGORIES ---');
    const subcats = await prisma.subcategory.findMany({ include: { category: true } });
    subcats.forEach(s => console.log(`[${s.category.slug}] ${s.name}: ${s.slug}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

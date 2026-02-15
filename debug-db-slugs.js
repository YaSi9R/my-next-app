const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- CATEGORIES ---');
    const categories = await prisma.category.findMany();
    categories.forEach(c => console.log(`'${c.name}' -> slug: '${c.slug}'`));

    console.log('\n--- SUBCATEGORIES ---');
    const subcats = await prisma.subcategory.findMany();
    subcats.forEach(s => console.log(`'${s.name}' -> slug: '${s.slug}'`));

    console.log('\n--- BRANDS ---');
    const brands = await prisma.brand.findMany();
    brands.forEach(b => console.log(`'${b.name}' -> slug: '${b.slug}'`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

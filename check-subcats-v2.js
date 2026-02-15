const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subcategory.findMany({
        where: { category: { slug: 'smt-machines' } }
    });
    console.log('SMT Machines Subcategories:');
    subcategories.forEach(s => console.log(`- ${s.name} (${s.slug})`));

    const brands = await prisma.brand.findMany();
    console.log('\nAll Brands:');
    brands.forEach(b => console.log(`- ${b.name} (${b.slug})`));
}

main().finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            category: { select: { slug: true, name: true } },
            subcategory: { select: { slug: true, name: true } },
        }
    });

    products.forEach(p => {
        console.log(`Product: ${p.name}`);
        console.log(`  Slug: ${p.slug}`);
        console.log(`  Category: ${p.category?.slug} (${p.category?.name})`);
        console.log(`  Subcategory: ${p.subcategory?.slug} (${p.subcategory?.name})`);
        console.log('---');
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

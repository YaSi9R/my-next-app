const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const brands = await prisma.brand.findMany({
        include: { _count: { select: { products: true } } }
    });
    brands.forEach(b => {
        console.log(`${b.name} (${b.slug}): ${b._count.products} products`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

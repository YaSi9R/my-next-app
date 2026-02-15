const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.product.findUnique({
        where: { id: '6991f73726ca82ba3cca60ee' },
        include: { category: true, subcategory: true, brand: true }
    });
    console.log(JSON.stringify(p, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

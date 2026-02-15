const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const s = await prisma.subcategory.findFirst({
        where: { name: { contains: 'Pick' }, category: { slug: 'smt-machines' } }
    });
    if (s) {
        console.log(`SLUG_FOUND: "${s.slug}"`);
    } else {
        console.log('NOT_FOUND');
    }
}
main().finally(() => prisma.$disconnect());

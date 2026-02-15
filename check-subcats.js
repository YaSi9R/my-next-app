const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subcategory.findMany({
        where: {
            category: {
                slug: 'smt-machines'
            }
        },
        include: {
            category: true
        }
    });

    console.log('Subcategories for smt-machines:');
    subcategories.forEach(s => {
        console.log(`Name: ${s.name}, Slug: ${s.slug}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

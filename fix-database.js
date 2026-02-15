const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Find the 'smt-machines' category
    let smtMachines = await prisma.category.findUnique({ where: { slug: 'smt-machines' } });
    if (!smtMachines) {
        smtMachines = await prisma.category.create({
            data: { name: 'SMT Machines', slug: 'smt-machines' }
        });
        console.log('Created smt-machines category');
    }

    // 2. Find or create 'pick-and-place' subcategory under 'smt-machines'
    let pickAndPlaceSub = await prisma.subcategory.findFirst({
        where: { slug: 'pick-and-place', categoryId: smtMachines.id }
    });
    if (!pickAndPlaceSub) {
        pickAndPlaceSub = await prisma.subcategory.create({
            data: { name: 'Pick & Place', slug: 'pick-and-place', categoryId: smtMachines.id }
        });
        console.log('Created pick-and-place subcategory');
    }

    // 3. Find any products in 'pick-and-place' root category and move them
    const miscategorizedProducts = await prisma.product.findMany({
        include: { category: true }
    });

    for (const p of miscategorizedProducts) {
        if (p.category?.slug === 'pick-and-place' || p.category?.slug === 'yamaha') {
            console.log(`Fixing product: ${p.name}`);
            const updateData = {
                categoryId: smtMachines.id,
                subcategoryId: pickAndPlaceSub.id,
            };

            await prisma.product.update({
                where: { id: p.id },
                data: updateData
            });
        }
    }

    console.log('Database standardization complete');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Find subcategories that have 'pick-and-place-machines' as their category
    const wrongSubcats = await prisma.subcategory.findMany({
        include: { category: true }
    });

    console.log('Checking for data inconsistencies...\n');

    for (const subcat of wrongSubcats) {
        if (subcat.category.slug === 'pick-and-place-machines') {
            console.log(`❌ Found incorrect subcategory: ${subcat.name} (slug: ${subcat.slug})`);
            console.log(`   Category is: ${subcat.category.slug} (should not exist as a category)`);

            // Delete this incorrect subcategory
            await prisma.subcategory.delete({
                where: { id: subcat.id }
            });
            console.log(`   ✅ Deleted incorrect subcategory\n`);
        }
    }

    // Check if 'pick-and-place-machines' exists as a category (it shouldn't)
    const wrongCategory = await prisma.category.findUnique({
        where: { slug: 'pick-and-place-machines' }
    });

    if (wrongCategory) {
        console.log(`❌ Found incorrect category: ${wrongCategory.name} (slug: ${wrongCategory.slug})`);

        // Check if it has any products
        const products = await prisma.product.findMany({
            where: { categoryId: wrongCategory.id }
        });

        if (products.length > 0) {
            console.log(`   ⚠️  This category has ${products.length} products. They need to be moved first.`);

            // Get the correct smt-machines category
            const smtMachines = await prisma.category.findUnique({
                where: { slug: 'smt-machines' }
            });

            // Get the pick-and-place-machines subcategory
            const pickAndPlaceSubcat = await prisma.subcategory.findFirst({
                where: {
                    slug: 'pick-and-place-machines',
                    categoryId: smtMachines.id
                }
            });

            if (smtMachines && pickAndPlaceSubcat) {
                for (const product of products) {
                    await prisma.product.update({
                        where: { id: product.id },
                        data: {
                            categoryId: smtMachines.id,
                            subcategoryId: pickAndPlaceSubcat.id
                        }
                    });
                    console.log(`   ✅ Moved product: ${product.name}`);
                }
            }
        }

        // Now delete the wrong category
        await prisma.category.delete({
            where: { id: wrongCategory.id }
        });
        console.log(`   ✅ Deleted incorrect category\n`);
    }

    console.log('✅ Database cleanup complete!');
}

main()
    .catch(e => console.error('Error:', e))
    .finally(async () => await prisma.$disconnect());

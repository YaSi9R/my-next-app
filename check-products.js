const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Check if any products have a 'type' field
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: 'board-handling'
            }
        },
        include: {
            subcategory: true,
            category: true
        }
    });

    console.log(`\n=== BOARD HANDLING PRODUCTS ===`);
    console.log(`Found ${products.length} products in Board Handling category\n`);

    // Group by subcategory
    const grouped = {};
    products.forEach(p => {
        const subcat = p.subcategory.name;
        if (!grouped[subcat]) {
            grouped[subcat] = [];
        }
        grouped[subcat].push(p);
    });

    Object.keys(grouped).forEach(subcat => {
        console.log(`\n${subcat}:`);
        grouped[subcat].forEach(p => {
            console.log(`  - ${p.name}`);
        });
    });

    // Check the Product model structure
    console.log('\n=== PRODUCT MODEL FIELDS ===');
    if (products.length > 0) {
        const sampleProduct = products[0];
        console.log('Sample product fields:', Object.keys(sampleProduct));
    }
}

main()
    .catch(e => console.error('Error:', e))
    .finally(async () => await prisma.$disconnect());

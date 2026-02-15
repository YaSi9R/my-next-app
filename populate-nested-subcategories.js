const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Nested subcategory data for Board Handling
const boardHandlingData = {
    'loading-and-unloading-systems': [
        { name: 'Magazine Loaders', slug: 'magazine-loaders' },
        { name: 'Vacuum Loaders', slug: 'vacuum-loaders' },
        { name: 'Destackers', slug: 'destackers' },
        { name: 'Magazine Unloaders', slug: 'magazine-unloaders' },
        { name: 'Stackers', slug: 'stackers' },
        { name: 'NG/OK Reject Conveyors', slug: 'ng-ok-reject-conveyors' }
    ],
    'transfer-and-handling-systems': [
        { name: 'Link Conveyors', slug: 'link-conveyors' },
        { name: 'Inspection Conveyors', slug: 'inspection-conveyors' },
        { name: 'Turn Conveyors', slug: 'turn-conveyors' },
        { name: 'Inverters / Flippers', slug: 'inverters-flippers' },
        { name: 'Turn Units', slug: 'turn-units' }
    ],
    'buffering-and-accumulation-systems': [
        { name: 'FIFO Buffers', slug: 'fifo-buffers' },
        { name: 'LIFO Buffers', slug: 'lifo-buffers' },
        { name: 'Vertical Buffers', slug: 'vertical-buffers' },
        { name: 'Cooling Buffers', slug: 'cooling-buffers' }
    ],
    'consumables-and-cleaning': [
        { name: 'Stencil Wiping Rolls', slug: 'stencil-wiping-rolls' },
        { name: 'Cleaning Solvents', slug: 'cleaning-solvents' },
        { name: 'Nozzle Cleaning', slug: 'nozzle-cleaning' },
        { name: 'PCB Cleaning', slug: 'pcb-cleaning' },
        { name: 'Filters & Wipers', slug: 'filters-wipers' }
    ]
};

async function main() {
    console.log('🔄 Populating nested Board Handling subcategories...\n');

    // Get Board Handling category
    const boardHandlingCategory = await prisma.category.findUnique({
        where: { slug: 'board-handling' }
    });

    if (!boardHandlingCategory) {
        console.error('❌ Board Handling category not found!');
        return;
    }

    // Get all parent subcategories
    const parentSubcats = await prisma.subcategory.findMany({
        where: {
            categoryId: boardHandlingCategory.id,
            parentId: null // Only get top-level subcategories
        }
    });

    console.log(`Found ${parentSubcats.length} parent subcategories\n`);

    for (const parentSubcat of parentSubcats) {
        const childrenData = boardHandlingData[parentSubcat.slug];

        if (!childrenData) {
            console.log(`⚠️  No children data for: ${parentSubcat.name}`);
            continue;
        }

        console.log(`📁 ${parentSubcat.name}:`);

        for (const childData of childrenData) {
            // Check if child already exists
            const existing = await prisma.subcategory.findFirst({
                where: {
                    slug: childData.slug,
                    parentId: parentSubcat.id
                }
            });

            if (existing) {
                console.log(`   ⏭️  ${childData.name} (already exists)`);
                continue;
            }

            // Create child subcategory
            await prisma.subcategory.create({
                data: {
                    name: childData.name,
                    slug: childData.slug,
                    categoryId: boardHandlingCategory.id,
                    parentId: parentSubcat.id
                }
            });

            console.log(`   ✅ ${childData.name}`);
        }

        console.log('');
    }

    // Verify the structure
    console.log('\n=== VERIFICATION ===');
    const allSubcats = await prisma.subcategory.findMany({
        where: { categoryId: boardHandlingCategory.id },
        include: {
            children: true,
            parent: true
        },
        orderBy: { name: 'asc' }
    });

    const topLevel = allSubcats.filter(s => !s.parentId);
    console.log(`\n✅ Created hierarchical structure:`);
    console.log(`   - ${topLevel.length} parent subcategories`);
    console.log(`   - ${allSubcats.filter(s => s.parentId).length} child subcategories`);

    console.log('\n📊 Structure:');
    topLevel.forEach(parent => {
        const children = allSubcats.filter(s => s.parentId === parent.id);
        console.log(`\n${parent.name} (${children.length} children):`);
        children.forEach(child => {
            console.log(`  └─ ${child.name}`);
        });
    });

    console.log('\n✅ Done!');
}

main()
    .catch(e => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());

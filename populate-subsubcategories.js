const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// SubSubcategory data for Board Handling
const subSubcategoryData = {
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
    console.log('🔄 Populating SubSubcategories for Board Handling...\n');

    // Get Board Handling category
    const boardHandlingCategory = await prisma.category.findUnique({
        where: { slug: 'board-handling' }
    });

    if (!boardHandlingCategory) {
        console.error('❌ Board Handling category not found!');
        return;
    }

    // Get all Board Handling subcategories
    const subcategories = await prisma.subcategory.findMany({
        where: {
            categoryId: boardHandlingCategory.id
        }
    });

    console.log(`Found ${subcategories.length} Board Handling subcategories\n`);

    let totalCreated = 0;
    let totalSkipped = 0;

    for (const subcat of subcategories) {
        const subsubData = subSubcategoryData[subcat.slug];

        if (!subsubData) {
            console.log(`⚠️  No SubSubcategory data for: ${subcat.name}`);
            continue;
        }

        console.log(`📁 ${subcat.name}:`);

        for (const data of subsubData) {
            // Check if SubSubcategory already exists
            const existing = await prisma.subSubcategory.findFirst({
                where: {
                    slug: data.slug,
                    subcategoryId: subcat.id
                }
            });

            if (existing) {
                console.log(`   ⏭️  ${data.name} (already exists)`);
                totalSkipped++;
                continue;
            }

            // Create SubSubcategory
            await prisma.subSubcategory.create({
                data: {
                    name: data.name,
                    slug: data.slug,
                    subcategoryId: subcat.id
                }
            });

            console.log(`   ✅ ${data.name}`);
            totalCreated++;
        }

        console.log('');
    }

    // Verification
    console.log('\n=== VERIFICATION ===');
    const allSubSubs = await prisma.subSubcategory.findMany({
        include: {
            subcategory: {
                include: {
                    category: true
                }
            }
        },
        where: {
            subcategory: {
                categoryId: boardHandlingCategory.id
            }
        },
        orderBy: { name: 'asc' }
    });

    console.log(`\n✅ Summary:`);
    console.log(`   - Created: ${totalCreated} SubSubcategories`);
    console.log(`   - Skipped: ${totalSkipped} (already existed)`);
    console.log(`   - Total: ${allSubSubs.length} SubSubcategories in Board Handling`);

    console.log('\n📊 Structure:');
    subcategories.forEach(subcat => {
        const subsubs = allSubSubs.filter(ss => ss.subcategoryId === subcat.id);
        if (subsubs.length > 0) {
            console.log(`\n${subcat.name} (${subsubs.length} items):`);
            subsubs.forEach(subsub => {
                console.log(`  └─ ${subsub.name}`);
            });
        }
    });

    console.log('\n✅ Done! SubSubcategories are ready for admin management.');
}

main()
    .catch(e => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());

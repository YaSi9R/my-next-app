const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subcategory.findMany({
        include: { category: true },
        orderBy: { name: 'asc' }
    });

    let output = '';

    output += '\n=== BOARD HANDLING SUBCATEGORIES ===\n';
    const boardHandlingSubcats = subcategories.filter(s => s.category.slug === 'board-handling');
    output += `Found ${boardHandlingSubcats.length} subcategories for board-handling:\n\n`;

    if (boardHandlingSubcats.length === 0) {
        output += '⚠️  NO BOARD HANDLING SUBCATEGORIES FOUND!\n';
        output += 'You need to add Board Handling subcategories to the database.\n\n';
        output += 'Suggested subcategories based on your previous structure:\n';
        output += '  - Loading & Unloading Systems\n';
        output += '  - Transfer & Handling Systems\n';
        output += '  - Buffering & Accumulation Systems\n';
        output += '  - Consumables & Cleaning\n';
    } else {
        boardHandlingSubcats.forEach(s => {
            output += `  ✅ ${s.name} (slug: ${s.slug})\n`;
            output += `     URL: /board-handling/${s.slug}\n\n`;
        });
    }

    output += '\n=== ALL CATEGORIES ===\n';
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
    categories.forEach(c => {
        const subCount = subcategories.filter(s => s.categoryId === c.id).length;
        output += `  - ${c.name} (slug: ${c.slug}) - ${subCount} subcategories\n`;
    });

    fs.writeFileSync('board-handling-check.txt', output);
    console.log(output);
}

main()
    .catch(e => console.error('Error:', e))
    .finally(async () => await prisma.$disconnect());

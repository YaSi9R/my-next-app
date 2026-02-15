const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subcategory.findMany({
        include: { category: true },
        orderBy: { name: 'asc' }
    });

    const brands = await prisma.brand.findMany({
        orderBy: { name: 'asc' }
    });

    let output = '';

    output += '\n=== SUBCATEGORIES ===\n';
    subcategories.forEach(s => {
        output += `- ${s.name} (slug: ${s.slug}, category: ${s.category.slug})\n`;
    });

    output += '\n=== BRANDS ===\n';
    brands.forEach(b => {
        output += `- ${b.name} (slug: ${b.slug})\n`;
    });

    output += '\n=== SMT MACHINES SUBCATEGORIES ===\n';
    const smtMachineSubcats = subcategories.filter(s => s.category.slug === 'smt-machines');
    output += `Found ${smtMachineSubcats.length} subcategories for smt-machines:\n`;
    smtMachineSubcats.forEach(s => {
        output += `  - ${s.name} (slug: ${s.slug})\n`;
    });

    fs.writeFileSync('nav-data-output.txt', output);
    console.log('Output written to nav-data-output.txt');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

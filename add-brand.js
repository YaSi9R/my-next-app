const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Example: Add a new brand (e.g., "Samsung")
    const brandName = 'Samsung'; // Change this to your desired brand name
    const brandSlug = brandName.toLowerCase(); // Will be 'samsung'

    // Check if brand already exists
    const existingBrand = await prisma.brand.findUnique({
        where: { slug: brandSlug }
    });

    if (existingBrand) {
        console.log(`❌ Brand "${brandName}" already exists!`);
        return;
    }

    // Create the new brand
    const newBrand = await prisma.brand.create({
        data: {
            name: brandName,
            slug: brandSlug
        }
    });

    console.log(`✅ Successfully added brand: ${newBrand.name} (slug: ${newBrand.slug})`);
    console.log('\nThe brand will now automatically appear in:');
    console.log('  - SMT Parts dropdown (with all subcategories)');
    console.log('  - Pick & Place Machines dropdown (under SMT Machines)');
    console.log('\nRefresh your browser to see the changes!');
}

main()
    .catch(e => console.error('Error:', e))
    .finally(async () => await prisma.$disconnect());

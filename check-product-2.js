const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.product.findUnique({
        where: { id: '6991f73726ca82ba3cca60ee' },
        include: { category: true, subcategory: true, brand: true }
    });
    if (p) {
        console.log('ID:', p.id);
        console.log('Category Slug:', p.category.slug);
        console.log('Subcategory Slug:', p.subcategory.slug);
        console.log('Subcategory Name:', p.subcategory.name);
        console.log('Brand Slug:', p.brand.slug);
        console.log('Brand Name:', p.brand.name);
    } else {
        console.log('Product not found');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

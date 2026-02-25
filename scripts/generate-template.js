
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function generateTemplate() {
    const dir = path.join(__dirname, '../public/templates');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define columns
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Condition', key: 'condition', width: 15 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Subcategory', key: 'subcategory', width: 20 },
        { header: 'Third Level', key: 'third_level', width: 20 },
        { header: 'Availability', key: 'availability', width: 15 },
        { header: 'Short Description', key: 'short_desc', width: 40 },
        { header: 'Long Description', key: 'long_desc', width: 50 },
        { header: 'Features', key: 'features', width: 40 },
        { header: 'Specifications', key: 'specs', width: 40 },
        { header: 'Images', key: 'images', width: 50 },
    ];

    // Add example row
    worksheet.addRow({
        name: 'Example SMT Machine',
        condition: 'New',
        category: 'SMT Machines',
        subcategory: 'Pick and Place',
        third_level: 'High Speed',
        availability: 'In Stock',
        short_desc: 'High precision SMT machine for electronics assembly.',
        long_desc: 'This is a sample description.\n\nIt supports multiple lines. You do NOT need to use HTML tags like <p> or <br> anymore.\n\nJust write normally and the system will handle the formatting!',
        features: 'Fast, Accurate, Reliable',
        specs: 'Weight: 1200kg; Power: 3-Phase',
        images: 'https://example.com/image1.jpg, https://example.com/image2.jpg'
    });

    // Add Data Validation (Dropdowns)

    // Category dropdown (Fixed 3 items)
    const categoryList = ['SMT Machines', 'SMT Parts', 'Board Handling'];

    // Condition dropdown
    const conditionList = ['New', 'Used', 'Refurbished'];

    // Availability dropdown
    const availabilityList = ['In Stock', 'Out of Stock'];

    // Apply validation to 5000 rows (from row 2 to 5001)
    for (let i = 2; i <= 5001; i++) {
        // Condition (Column B)
        worksheet.getCell(`B${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`"${conditionList.join(',')}"`],
            showErrorMessage: true,
            errorStyle: 'stop',
            errorTitle: 'Invalid Selection',
            error: 'Please select from the list.'
        };

        // Category (Column C)
        worksheet.getCell(`C${i}`).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: [`"${categoryList.join(',')}"`],
            showErrorMessage: true,
            errorStyle: 'stop',
            errorTitle: 'Invalid Category',
            error: 'Please select a valid Category from the list.'
        };

        // Availability (Column F)
        worksheet.getCell(`F${i}`).dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`"${availabilityList.join(',')}"`],
            showErrorMessage: true,
            errorStyle: 'stop',
            errorTitle: 'Invalid Selection',
            error: 'Please select from the list.'
        };
    }

    // Style the header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
    };

    const filePath = path.join(dir, 'bulk-upload-template.xlsx');
    await workbook.xlsx.writeFile(filePath);

    console.log(`Dropdown template generated at: ${filePath}`);
}

generateTemplate().catch(err => console.error(err));

// Demo product data - Replace with real data from client later

export interface Product {
    id: string;
    name: string;
    brand: string;
    brandSlug: string; // New
    category: string;
    categorySlug: string; // New
    subcategory?: string;
    subcategorySlug?: string; // New
    type?: string;
    typeSlug?: string;
    condition: 'New' | 'Used' | 'Refurbished';
    yearOfManufacture?: number;
    image: string;
    images?: string[];
    shortDescription: string;
    longDescription: string;
    specifications: { label: string; value: string }[];
    features: string[];
    availability: string;
}

export const demoProducts: Product[] = [
    // SMT Machines - Pick & Place - Yamaha
    {
        id: 'yamaha-ys12',
        name: 'YS12',
        brand: 'Yamaha',
        brandSlug: 'yamaha',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Pick & Place Machines',
        subcategorySlug: 'pick-and-place',
        condition: 'Used',
        yearOfManufacture: 2018,

        image: '/demo-products/yamaha-ys12.jpg',
        images: ['/demo-products/yamaha-ys12.jpg', '/demo-products/yamaha-ys12-2.jpg'],
        shortDescription: 'High-speed modular pick and place machine with excellent flexibility',
        longDescription: 'The Yamaha YS12 is a high-performance modular mounter that delivers exceptional speed and accuracy. Perfect for high-mix production environments, it offers outstanding flexibility with its modular head design and advanced vision system.',
        specifications: [
            { label: 'Placement Speed', value: '45,000 CPH (IPC9850)' },
            { label: 'Board Size', value: '50mm x 50mm to 510mm x 460mm' },
            { label: 'Component Range', value: '0201 (01005) to 74mm x 74mm' },
            { label: 'Placement Accuracy', value: '±0.035mm (Chip), ±0.05mm (QFP)' },
            { label: 'Feeder Capacity', value: '120 feeders (8mm pitch)' },
            { label: 'Power Supply', value: '3-phase 200-240V AC' },
        ],
        features: [
            'Modular head design for maximum flexibility',
            'Advanced vision recognition system',
            'High-speed linear motor drive',
            'Intelligent feeder management',
            'User-friendly touchscreen interface',
            'Low maintenance design',
        ],
        availability: 'In Stock',
    },
    {
        id: 'yamaha-ysm20',
        name: 'YSM20',
        brand: 'Yamaha',
        brandSlug: 'yamaha',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Pick & Place Machines',
        subcategorySlug: 'pick-and-place',
        condition: 'New',

        image: '/demo-products/yamaha-ysm20.jpg',
        shortDescription: 'Ultra-high-speed modular mounter for maximum productivity',
        longDescription: 'The YSM20 represents the pinnacle of Yamaha\'s modular mounting technology, delivering industry-leading speed and precision for high-volume production.',
        specifications: [
            { label: 'Placement Speed', value: '72,000 CPH (IPC9850)' },
            { label: 'Board Size', value: '50mm x 50mm to 510mm x 510mm' },
            { label: 'Component Range', value: '0201 (01005) to 100mm x 100mm' },
            { label: 'Placement Accuracy', value: '±0.025mm (Chip)' },
            { label: 'Feeder Capacity', value: '144 feeders (8mm pitch)' },
        ],
        features: [
            'Industry-leading placement speed',
            'Advanced AI-powered vision system',
            'Predictive maintenance capabilities',
            'Energy-efficient operation',
            'Seamless line integration',
        ],
        availability: 'Pre-Order (4-6 weeks)',
    },

    // Fuji
    {
        id: 'fuji-nxt-iii',
        name: 'NXT III',
        brand: 'Fuji',
        brandSlug: 'fuji',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Pick & Place Machines',
        subcategorySlug: 'pick-and-place',
        condition: 'Used',
        yearOfManufacture: 2017,

        image: '/demo-products/fuji-nxt3.jpg',
        shortDescription: 'Versatile high-speed modular mounter with proven reliability',
        longDescription: 'The Fuji NXT III offers exceptional versatility and reliability, making it ideal for diverse production requirements from prototyping to high-volume manufacturing.',
        specifications: [
            { label: 'Placement Speed', value: '50,000 CPH' },
            { label: 'Board Size', value: 'Up to 508mm x 508mm' },
            { label: 'Component Range', value: '0201 to 55mm x 100mm' },
            { label: 'Placement Accuracy', value: '±0.035mm' },
        ],
        features: [
            'Modular design for scalability',
            'High-precision placement',
            'Flexible feeder configuration',
            'Advanced component recognition',
        ],
        availability: 'In Stock',
    },
    {
        id: 'fuji-aimex-iii',
        name: 'AIMEX III',
        brand: 'Fuji',
        brandSlug: 'fuji',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Pick & Place Machines',
        subcategorySlug: 'pick-and-place',
        condition: 'Refurbished',
        yearOfManufacture: 2020,

        image: '/demo-products/fuji-aimex3.jpg',
        shortDescription: 'Flexible all-in-one placement platform',
        longDescription: 'The AIMEX III is designed for flexibility, allowing it to handle a wide range of component types and board sizes with ease.',
        specifications: [
            { label: 'Placement Speed', value: '45,000 CPH' },
            { label: 'Board Size', value: 'Up to 774mm x 610mm' },
            { label: 'Component Range', value: '0402 to 74mm x 74mm' },
        ],
        features: [
            'Large board support',
            'High feeder capacity',
            'Quick changeover'
        ],
        availability: 'In Stock',
    },

    // Panasonic
    {
        id: 'panasonic-npm-d3',
        name: 'NPM-D3',
        brand: 'Panasonic',
        brandSlug: 'panasonic',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Pick & Place Machines',
        subcategorySlug: 'pick-and-place',
        condition: 'New',

        image: '/demo-products/panasonic-npmd3.jpg',
        shortDescription: 'Next-generation modular mounter with AI capabilities',
        longDescription: 'The NPM-D3 combines Panasonic\'s legendary reliability with cutting-edge AI technology for unmatched performance and efficiency.',
        specifications: [
            { label: 'Placement Speed', value: '80,000 CPH' },
            { label: 'Board Size', value: 'Up to 610mm x 508mm' },
            { label: 'Component Range', value: '0201 to 150mm x 100mm' },
            { label: 'Placement Accuracy', value: '±0.025mm' },
        ],
        features: [
            'AI-powered optimization',
            'Ultra-high-speed operation',
            'Advanced thermal management',
            'Industry 4.0 ready',
        ],
        availability: 'Pre-Order (8-10 weeks)',
    },

    // Reflow Ovens - Heller
    {
        id: 'heller-1913-mk5',
        name: '1913 MK5',
        brand: 'Heller',
        brandSlug: 'heller',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Reflow Ovens',
        subcategorySlug: 'reflow-ovens',
        condition: 'Used',
        yearOfManufacture: 2019,

        image: '/demo-products/heller-1913.jpg',
        shortDescription: '13-zone reflow oven with nitrogen capability',
        longDescription: 'The Heller 1913 MK5 delivers precise thermal profiling with 13 heating zones and optional nitrogen atmosphere for lead-free soldering.',
        specifications: [
            { label: 'Heating Zones', value: '13 zones' },
            { label: 'Conveyor Width', value: '457mm (18")' },
            { label: 'Heating Length', value: '3.3m' },
            { label: 'Temperature Range', value: 'Up to 350°C' },
        ],
        features: [
            'Nitrogen capability',
            'Advanced profiling software',
            'Energy-efficient design',
            'Easy maintenance access',
        ],
        availability: 'In Stock',
    },
    {
        id: 'heller-1707-mk5',
        name: '1707 MK5',
        brand: 'Heller',
        brandSlug: 'heller',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Reflow Ovens',
        subcategorySlug: 'reflow-ovens',
        condition: 'New',

        image: '/demo-products/heller-1707.jpg',
        shortDescription: 'Efficient 7-zone reflow oven',
        longDescription: 'Optimized for efficiency, the 1707 MK5 is perfect for medium-volume production lines requiring reliable thermal performance.',
        specifications: [
            { label: 'Heating Zones', value: '7 zones' },
            { label: 'Heating Length', value: '1.8m' },
            { label: 'Cooling Zones', value: '2 zones' }
        ],
        features: [
            'Compact footprint',
            'Lead-free process ready',
            'Low energy consumption'
        ],
        availability: 'In Stock',
    },

    // Reflow Ovens - BTU
    {
        id: 'btu-pyramax-150n',
        name: 'Pyramax 150N',
        brand: 'BTU',
        brandSlug: 'btu',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'Screen Printers',
        subcategorySlug: 'screen-printers',
        condition: 'New',

        image: '/demo-products/btu-pyramax.jpg',
        shortDescription: 'High-performance convection reflow oven with nitrogen',
        longDescription: 'The BTU Pyramax 150N offers superior thermal performance with advanced closed-loop control for consistent, repeatable results.',
        specifications: [
            { label: 'Heating Zones', value: '10 zones' },
            { label: 'Conveyor Width', value: '508mm (20")' },
            { label: 'Heating Length', value: '3.8m' },
            { label: 'Temperature Range', value: 'Up to 400°C' },
        ],
        features: [
            'Closed-loop zone control',
            'Nitrogen atmosphere',
            'Real-time profiling',
            'Industry 4.0 connectivity',
        ],
        availability: 'In Stock',
    },
    {
        id: 'spi dummy data',
        name: 'SPI Dummy Data',
        brand: 'SPI Dummy Data',
        brandSlug: 'spi-dummy-data',
        category: 'SMT Machines',
        categorySlug: 'smt-machines',
        subcategory: 'SPI',
        subcategorySlug: 'spi',
        condition: 'New',

        image: '/demo-products/btu-pyramax.jpg',
        shortDescription: 'High-performance convection reflow oven with nitrogen',
        longDescription: 'The BTU Pyramax 150N offers superior thermal performance with advanced closed-loop control for consistent, repeatable results.',
        specifications: [
            { label: 'Heating Zones', value: '10 zones' },
            { label: 'Conveyor Width', value: '508mm (20")' },
            { label: 'Heating Length', value: '3.8m' },
            { label: 'Temperature Range', value: 'Up to 400°C' },
        ],
        features: [
            'Closed-loop zone control',
            'Nitrogen atmosphere',
            'Real-time profiling',
            'Industry 4.0 connectivity',
        ],
        availability: 'In Stock',
    },

];

export const smtLinePackages = [
    {
        id: 'entry-level-line',
        name: 'Entry Level SMT Line',

        image: '/demo-products/entry-line-diagram.jpg',
        machines: [
            'Manual Stencil Printer',
            'Yamaha YS12 Pick & Place',
            'Heller 1913 Reflow Oven',
            'Basic AOI System',
        ],
        suitableFor: 'Small to medium production runs, prototyping, low-volume manufacturing',
        capacity: '500-1000 boards/day',
        floorSpace: '15m x 3m',
        description: 'Perfect starter package for companies entering SMT production or expanding capabilities. Includes all essential equipment with Tekmart installation and training.',
        features: [
            'Complete turnkey solution',
            'Installation & commissioning included',
            '3-day operator training',
            '1-year warranty on all equipment',
            'Technical support package',
        ],
    },
    {
        id: 'high-speed-line',
        name: 'High-Speed SMT Line',

        image: '/demo-products/highspeed-line-diagram.jpg',
        machines: [
            'Automatic Stencil Printer with SPI',
            'Yamaha YSM20 Pick & Place (x2)',
            'BTU Pyramax 150N Reflow Oven',
            'Advanced 3D AOI',
            'Automatic Loader/Unloader',
        ],
        suitableFor: 'High-volume production, automotive, medical devices, consumer electronics',
        capacity: '5000-10000 boards/day',
        floorSpace: '25m x 4m',
        description: 'Premium high-speed production line for demanding manufacturing environments. Fully automated with Industry 4.0 connectivity.',
        features: [
            'Fully automated operation',
            'Real-time quality monitoring',
            'MES integration ready',
            'Complete installation & setup',
            '5-day comprehensive training',
            '2-year warranty package',
        ],
    },
];

export const smtParts: Product[] = [
    {
        id: 'yamaha-cl-8mm-feeder',
        name: 'CL 8mm Feeder',
        brand: 'Yamaha',
        brandSlug: 'yamaha',
        category: 'SMT Parts',
        categorySlug: 'smt-parts',
        subcategory: 'Feeders & Feeder Parts',
        subcategorySlug: 'feeders',
        condition: 'New',

        image: '/demo-products/yamaha-feeder.jpg',
        shortDescription: 'Genuine Yamaha CL-type 8mm tape feeder for high-speed component feeding',
        longDescription: 'Original Yamaha CL 8mm feeder (KHJ-MC100-000) compatible with YS and YSM series machines. Ensures stable and precise component supply.',
        specifications: [
            { label: 'Part Number', value: 'KHJ-MC100-000' },
            { label: 'Tape Width', value: '8mm' },
            { label: 'Pitch', value: '2mm, 4mm' },
            { label: 'Component Height', value: 'Up to 6.5mm' },
        ],
        features: [
            'Compatible with YS12, YS24, YSM20, YSM40',
            'High reliability',
            'Easy maintenance'
        ],
        availability: 'In Stock (50+ units)',
    },
    {
        id: 'yamaha-502-nozzle',
        name: '502 Nozzle Set',
        brand: 'Yamaha',
        brandSlug: 'yamaha',
        category: 'SMT Parts',
        categorySlug: 'smt-parts',
        subcategory: 'Nozzles',
        subcategorySlug: 'nozzles',
        condition: 'New',

        image: '/demo-products/yamaha-nozzle.jpg',
        shortDescription: 'High-precision 502 nozzle for 0402-0603 chip components',
        longDescription: 'Standard Yamaha 502 nozzle (KV8-M7710-00X) designed for reliable pickup and placement of small chips.',
        specifications: [
            { label: 'Part Number', value: 'KV8-M7710-00X' },
            { label: 'Nozzle Type', value: '502' },
            { label: 'Component Size', value: '0402, 0603' },
            { label: 'Material', value: 'Ceramic tip' },
        ],
        features: [
            'Compatible with YS12, YS24, YSM20',
            'Ceramic tip for long life',
            'High precision'
        ],
        availability: 'In Stock (100+ pieces)',
    },
    {
        id: 'fuji-nxt-feeder-8mm',
        name: 'NXT W08f Feeder',
        brand: 'Fuji-Parts',
        brandSlug: 'fuji',
        category: 'SMT Parts',
        categorySlug: 'smt-parts',
        subcategory: 'Feeders & Feeder Parts',
        subcategorySlug: 'feeders',
        condition: 'Used',

        image: '/demo-products/fuji-feeder.jpg',
        shortDescription: 'Original Fuji NXT W08f intelligent feeder',
        longDescription: 'Fuji NXT W08f 8mm intelligent feeder for NXT and AIMEX series machines. Fully tested and calibrated.',
        specifications: [
            { label: 'Type', value: 'Intelligent Feeder' },
            { label: 'Width', value: '8mm' },
            { label: 'Compatibility', value: 'NXT I/II/III, AIMEX' }
        ],
        features: [
            'Fast loading',
            'Splice detection',
            'High accuracy'
        ],
        availability: 'In Stock'
    },
    {
        id: 'panasonic-cm-nozzle-110',
        name: 'CM 110 Nozzle',
        brand: 'Panasonic',
        brandSlug: 'panasonic',
        category: 'SMT Parts',
        categorySlug: 'smt-parts',
        subcategory: 'Nozzles',
        subcategorySlug: 'nozzles',
        condition: 'New',

        image: '/demo-products/pana-nozzle.jpg',
        shortDescription: 'Panasonic CM Series Type 110 Nozzle',
        longDescription: 'High-quality nozzle for Panasonic CM402/CM602/NPM machines. Type 110 for small chips.',
        specifications: [
            { label: 'Type', value: '110' },
            { label: 'Machine', value: 'CM/NPM' }
        ],
        features: [
            'Durable construction',
            'Precise pickup'
        ],
        availability: 'In Stock'
    },
    {
        id: 'others dummy',
        name: 'CM 110 Nozzle',
        brand: 'other',
        brandSlug: 'other',
        category: 'SMT Parts',
        categorySlug: 'smt-parts',
        subcategory: 'Nozzles',
        subcategorySlug: 'nozzles',
        condition: 'New',

        image: '/demo-products/pana-nozzle.jpg',
        shortDescription: 'Panasonic CM Series Type 110 Nozzle',
        longDescription: 'High-quality nozzle for Panasonic CM402/CM602/NPM machines. Type 110 for small chips.',
        specifications: [
            { label: 'Type', value: '110' },
            { label: 'Machine', value: 'CM/NPM' }
        ],
        features: [
            'Durable construction',
            'Precise pickup'
        ],
        availability: 'In Stock'
    },

    // Board Handling - Loading & Unloading
    {
        id: 'magazine-loader-xl',
        name: 'High-Speed Magazine Loader',
        brand: 'Tekmart',
        brandSlug: 'tekmart',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Loading & Unloading Systems',
        subcategorySlug: 'loading-unloading',
        type: 'Magazine Loaders',
        typeSlug: 'loaders',
        condition: 'New',
        image: '/demo-products/loader.jpg',
        shortDescription: 'Automatic PCB loader for high-volume SMT lines',
        longDescription: 'Our High-Speed Magazine Loader is designed for seamless entry automation. It handles various magazine sizes and ensures a steady flow of PCBs into the production line.',
        specifications: [
            { label: 'PCB Size', value: '50x50mm - 460x400mm' },
            { label: 'Cycle Time', value: 'Approx. 10 seconds' },
            { label: 'Magazine Capacity', value: 'Up to 50 PCBs' }
        ],
        features: [
            'SMEMA compatible',
            'Touchscreen PLC control',
            'Adjustable width',
            'Fail-safe sensors'
        ],
        availability: 'In Stock'
    },
    {
        id: 'vacuum-loader-standard',
        name: 'Vacuum Bare Board Loader',
        brand: 'Tekmart',
        brandSlug: 'tekmart',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Loading & Unloading Systems',
        subcategorySlug: 'loading-unloading',
        type: 'Vacuum Loaders',
        typeSlug: 'vacuum',
        condition: 'New',
        image: '/demo-products/vacuum-loader.jpg',
        shortDescription: 'Reliable vacuum-based loading for bare PCBs',
        longDescription: 'Ideal for loading bare boards from a stack, this vacuum loader provides gentle and precise board handling to prevent scratching or damage.',
        specifications: [
            { label: 'Type', value: 'Vacuum Suction' },
            { label: 'Stack Height', value: 'Max 300mm' }
        ],
        features: [
            'No board damage',
            'High reliability',
            'Compact footprint'
        ],
        availability: 'In Stock'
    },

    // Board Handling - Transfer & Handling
    {
        id: 'link-conveyor-1m',
        name: '1-Meter Link Conveyor',
        brand: 'Tekmart',
        brandSlug: 'tekmart',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Transfer & Handling Systems',
        subcategorySlug: 'transfer-handling',
        type: 'Link Conveyors',
        typeSlug: 'link',
        condition: 'New',
        image: '/demo-products/conveyor.jpg',
        shortDescription: 'Standard 1m link conveyor for PCB movement',
        longDescription: 'High-quality link conveyor for smooth PCB transport between machines. Features ESD-safe belts and adjustable speed.',
        specifications: [
            { label: 'Length', value: '1000mm' },
            { label: 'Width', value: '50-460mm' }
        ],
        features: [
            'ESD safe',
            'Adjustable speed',
            'SMEMA interface'
        ],
        availability: 'In Stock'
    },
    {
        id: 'turn-unit-90',
        name: '90-Degree Turn Unit',
        brand: 'Tekmart',
        brandSlug: 'tekmart',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Transfer & Handling Systems',
        subcategorySlug: 'transfer-handling',
        type: 'Turn Units',
        typeSlug: 'units',
        condition: 'New',
        image: '/demo-products/turn-unit.jpg',
        shortDescription: 'Space-saving 90-degree PCB turn unit',
        longDescription: 'Enables L-shaped or U-shaped line configurations by turning PCBs 90 degrees during transport.',
        specifications: [
            { label: 'Rotation', value: '90 Degrees' },
            { label: 'Max PCB Size', value: '460 x 400mm' }
        ],
        features: [
            'Compact design',
            'Precision rotation',
            'Easy integration'
        ],
        availability: '4-6 weeks'
    },

    // Board Handling - Buffering & Accumulation
    {
        id: 'fifo-buffer-20',
        name: '20-Slot FIFO Buffer',
        brand: 'Tekmart',
        brandSlug: 'tekmart',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Buffering & Accumulation Systems',
        subcategorySlug: 'buffering-accumulation',
        type: 'FIFO Buffers',
        typeSlug: 'fifo',
        condition: 'New',
        image: '/demo-products/buffer.jpg',
        shortDescription: 'First-In-First-Out buffer for line balancing',
        longDescription: 'Helps balance production line flow by temporarily storing PCBs between processes. Essential for managing machine downtime or speed variations.',
        specifications: [
            { label: 'Capacity', value: '20 PCBs' },
            { label: 'Mode', value: 'FIFO / Pass-through' }
        ],
        features: [
            'Smart line balancing',
            'Gentle handling',
            'Status indicators'
        ],
        availability: 'In Stock'
    },

    // Consumables (Nested under Board Handling)
    {
        id: 'stencil-wiping-roll',
        name: 'Premium Stencil Wiping Rolls',
        brand: 'Tekmart-Consumables',
        brandSlug: 'consumables',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Consumables & Cleaning Materials',
        subcategorySlug: 'consumables',
        type: 'Stencil Wiping Rolls',
        typeSlug: 'rolls',
        condition: 'New',
        image: '/demo-products/wiping-roll.jpg',
        shortDescription: 'Lint-free stencil wiping rolls for all printer brands',
        longDescription: 'High-absorbency, lint-free wiping rolls compatible with DEK, MPM, and Yamaha printers. Ensures clean apertures and high print quality.',
        specifications: [
            { label: 'Material', value: 'Non-woven fabric' },
            { label: 'Compatibility', value: 'Universal' }
        ],
        features: [
            'Low linting',
            'Strong durability',
            'Excellent solvent absorption'
        ],
        availability: 'In Stock'
    },
    {
        id: 'cleaning-solvent-s1',
        name: 'SMT Stencil Cleaning Solvent',
        brand: 'Tekmart-Consumables',
        brandSlug: 'consumables',
        category: 'Board Handling',
        categorySlug: 'board-handling',
        subcategory: 'Consumables & Cleaning Materials',
        subcategorySlug: 'consumables',
        type: 'Cleaning Solvents',
        typeSlug: 'solvents',
        condition: 'New',
        image: '/demo-products/cleaning-solvent.jpg',
        shortDescription: 'Fast-evaporating stencil cleaning solvent',
        longDescription: 'Specifically formulated for removing solder paste and SMT adhesives from stencils without damaging the mesh or frames.',
        specifications: [
            { label: 'Container Size', value: '5 Liters' },
            { label: 'Flash Point', value: '>60°C' }
        ],
        features: [
            'Fast evaporating',
            'Eco-friendly',
            'Non-toxic'
        ],
        availability: 'In Stock'
    }
];

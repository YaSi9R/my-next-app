// Demo product data - Replace with real data from client later

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    subcategory?: string;
    condition: 'New' | 'Used' | 'Refurbished';
    yearOfManufacture?: number;
    price?: string;
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
        category: 'SMT Machines',
        subcategory: 'Pick & Place Machines',
        condition: 'Used',
        yearOfManufacture: 2018,
        price: 'Contact for Quote',
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
        category: 'SMT Machines',
        subcategory: 'Pick & Place Machines',
        condition: 'New',
        price: 'Contact for Quote',
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
        category: 'SMT Machines',
        subcategory: 'Pick & Place Machines',
        condition: 'Used',
        yearOfManufacture: 2017,
        price: 'Contact for Quote',
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

    // Panasonic
    {
        id: 'panasonic-npm-d3',
        name: 'NPM-D3',
        brand: 'Panasonic',
        category: 'SMT Machines',
        subcategory: 'Pick & Place Machines',
        condition: 'New',
        price: 'Contact for Quote',
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

    // Reflow Ovens
    {
        id: 'heller-1913-mk5',
        name: '1913 MK5',
        brand: 'Heller',
        category: 'SMT Machines',
        subcategory: 'Reflow Ovens',
        condition: 'Used',
        yearOfManufacture: 2019,
        price: 'Contact for Quote',
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
        id: 'btu-pyramax-150n',
        name: 'Pyramax 150N',
        brand: 'BTU',
        category: 'SMT Machines',
        subcategory: 'Reflow Ovens',
        condition: 'New',
        price: 'Contact for Quote',
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
        price: 'Contact for Quote',
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
        price: 'Contact for Quote',
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

export const smtParts = [
    {
        id: 'yamaha-cl-8mm-feeder',
        name: 'CL 8mm Feeder',
        brand: 'Yamaha',
        category: 'SMT Parts',
        subcategory: 'Feeders & Feeder Parts',
        partNumber: 'KHJ-MC100-000',
        condition: 'New' as const,
        price: '$450',
        image: '/demo-products/yamaha-feeder.jpg',
        compatibleModels: ['YS12', 'YS24', 'YSM20', 'YSM40'],
        description: 'Genuine Yamaha CL-type 8mm tape feeder for high-speed component feeding',
        specifications: [
            { label: 'Tape Width', value: '8mm' },
            { label: 'Pitch', value: '2mm, 4mm' },
            { label: 'Component Height', value: 'Up to 6.5mm' },
        ],
        availability: 'In Stock (50+ units)',
    },
    {
        id: 'yamaha-502-nozzle',
        name: '502 Nozzle Set',
        brand: 'Yamaha',
        category: 'SMT Parts',
        subcategory: 'Nozzles',
        partNumber: 'KV8-M7710-00X',
        condition: 'New' as const,
        price: '$85/piece',
        image: '/demo-products/yamaha-nozzle.jpg',
        compatibleModels: ['YS12', 'YS24', 'YSM20'],
        description: 'High-precision 502 nozzle for 0402-0603 chip components',
        specifications: [
            { label: 'Nozzle Type', value: '502' },
            { label: 'Component Size', value: '0402, 0603' },
            { label: 'Material', value: 'Ceramic tip' },
        ],
        availability: 'In Stock (100+ pieces)',
    },
];
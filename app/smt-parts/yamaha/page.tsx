import React from 'react';
import Link from 'next/link';
import { smtParts } from '@/data/demoProducts';
import { ArrowRight, Package, CheckCircle } from 'lucide-react';

export default function YamahaPartsPage() {
    const categories = [
        { name: 'Feeders & Feeder Parts', href: '/smt-parts/yamaha/feeders', icon: Package },
        { name: 'Nozzles', href: '/smt-parts/yamaha/nozzles', icon: Package },
        { name: 'Motors / Belts', href: '/smt-parts/yamaha/motors-belts', icon: Package },
        { name: 'Sensors / Valves', href: '/smt-parts/yamaha/sensors-valves', icon: Package },
        { name: 'Consumables', href: '/smt-parts/yamaha/consumables', icon: Package },
    ];

    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
               
                <div className="text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-[#e6e6e6]">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/smt-parts" className="hover:text-[#e6e6e6]">SMT Parts</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#e6e6e6] font-semibold">Yamaha Parts</span>
                </div>

               
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Yamaha SMT Parts & Accessories
                    </h1>
                    <p className="text-xl text-gray-600">
                        Genuine and compatible parts for all Yamaha SMT machines - New, refurbished, and used options available
                    </p>
                </div>

                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-[#e6e6e6] transition-colors">
                                    <category.icon className="w-6 h-6 text-[#e6e6e6] group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                                    <span className="text-sm text-[#e6e6e6] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Browse Parts
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

              
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Parts</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {smtParts.map((part) => (
                            <div
                                key={part.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {/* Part Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                                    <Package className="w-20 h-20 text-gray-300" />
                                </div>

                                {/* Part Info */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{part.name}</h3>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                            {part.condition}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-2">Part #: {part.partNumber}</p>
                                    <p className="text-gray-600 mb-4">{part.description}</p>

                                    {/* Compatible Models */}
                                    <div className="mb-4">
                                        <p className="text-xs font-semibold text-gray-700 mb-2">Compatible Models:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {part.compatibleModels.map((model) => (
                                                <span
                                                    key={model}
                                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                                >
                                                    {model}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price & Availability */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div>
                                            <p className="text-2xl font-bold text-[#e6e6e6]">{part.price}</p>
                                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                                <CheckCircle className="w-3 h-3" />
                                                {part.availability}
                                            </p>
                                        </div>
                                        <Link
                                            href="/quote"
                                            className="px-4 py-2 bg-[#e6e6e6] text-white rounded-full text-sm font-semibold hover:bg-[#033a95] transition"
                                        >
                                            Order Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border-l-4 border-[#e6e6e6] rounded-lg p-6 mb-12">
                    <h3 className="font-bold text-gray-900 mb-2">Need Help Finding the Right Part?</h3>
                    <p className="text-gray-700 mb-4">
                        Our parts specialists can help you identify the exact part you need. Send us your machine model and part requirements.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#e6e6e6] text-white rounded-full font-semibold hover:bg-[#033a95] transition"
                        >
                            Contact Parts Team
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="mailto:parts@tekmart.com"
                            className="inline-flex items-center gap-2 px-6 py-2 border-2 border-[#e6e6e6] text-[#e6e6e6] rounded-full font-semibold hover:bg-[#e6e6e6] hover:text-white transition"
                        >
                            Email Us
                        </Link>
                    </div>
                </div>

                {/* Bulk Order CTA */}
                <div className="bg-[#e6e6e6] rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Bulk Orders & Special Pricing</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Contact us for volume discounts and customized parts packages for your facility
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-[#e6e6e6] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                        Request Bulk Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}

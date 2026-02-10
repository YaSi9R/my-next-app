import React from 'react';
import Link from 'next/link';
import { demoProducts } from '@/data/demoProducts';
import { ArrowRight } from 'lucide-react';

export default function YamahaPickPlacePage() {
    const yamahaProducts = demoProducts.filter(
        (p) => p.brand === 'Yamaha' && p.subcategory === 'Pick & Place Machines'
    );

    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-[#e6e6e6]">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/smt-machines" className="hover:text-[#e6e6e6]">SMT Machines</Link>
                    <span className="mx-2">/</span>
                    <Link href="/smt-machines/pick-and-place" className="hover:text-[#e6e6e6]">Pick & Place</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#e6e6e6] font-semibold">Yamaha</span>
                </div>

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Yamaha Pick & Place Machines
                    </h1>
                    <p className="text-xl text-gray-600">
                        High-performance modular mounters from Yamaha - Industry-leading speed and precision
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {yamahaProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/smt-machines/pick-and-place/yamaha/${product.id}`}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            {/* Product Image */}
                            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[#e6e6e6] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div className="text-6xl font-bold text-gray-300 group-hover:scale-110 transition-transform">
                                    {product.name}
                                </div>
                                {/* Placeholder for actual product image */}
                                {/* <Image src={product.image} alt={product.name} fill className="object-cover" /> */}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.condition === 'New'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        {product.condition}
                                    </span>
                                </div>

                                {product.yearOfManufacture && (
                                    <p className="text-sm text-gray-500 mb-3">
                                        Year: {product.yearOfManufacture}
                                    </p>
                                )}

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {product.shortDescription}
                                </p>

                                {/* Key Specs */}
                                <div className="space-y-2 mb-4">
                                    {product.specifications.slice(0, 2).map((spec, idx) => (
                                        <div key={idx} className="text-sm">
                                            <span className="font-semibold text-gray-700">{spec.label}:</span>
                                            <span className="text-gray-600 ml-2">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <span className="text-lg font-bold text-[#e6e6e6]">{product.price}</span>
                                    <span className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold group-hover:gap-3 transition-all">
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-[#e6e6e6] rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Machine?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Our experts can help you select the perfect Yamaha machine for your production needs
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-[#e6e6e6] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                        Contact Our Team
                    </Link>
                </div>
            </div>
        </div>
    );
}

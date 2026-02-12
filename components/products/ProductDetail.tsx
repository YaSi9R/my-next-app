import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Phone, Mail } from 'lucide-react';
import { Product } from '@/data/demoProducts';

interface Props {
    product: Product;
}

export default function ProductDetail({ product }: Props) {
    // Determine back link based on hierarchy
    // If brandSlug exists, go back to brand page. Else go to subcategory.
    const backLink = product.brandSlug
        ? `/smt-machines/${product.subcategorySlug}/${product.brandSlug}`
        : `/smt-machines/${product.subcategorySlug}`;

    const backLabel = product.brandSlug
        ? `Back to ${product.brand} Machines`
        : `Back to ${product.subcategory}`;

    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <Link
                    href={backLink}
                    className="inline-flex items-center gap-2 text-[#e6e6e6] hover:gap-3 transition-all mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {backLabel}
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                            {/* Use product image if available, else placeholder text */}
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-8xl font-bold text-gray-300">{product.name}</div>
                            )}
                        </div>

                        {/* Thumbnail Gallery (placeholder) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs"
                                >
                                    View {i}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                        {product.brand} {product.name}
                                    </h1>
                                    <p className="text-gray-600">{product.subcategory}</p>
                                </div>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${product.condition === 'New'
                                        ? 'bg-green-100 text-green-700'
                                        : product.condition === 'Used'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}
                                >
                                    {product.condition}
                                </span>
                            </div>

                            {product.yearOfManufacture && (
                                <p className="text-sm text-gray-500 mb-4">
                                    Year of Manufacture: {product.yearOfManufacture}
                                </p>
                            )}

                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {product.longDescription}
                            </p>

                            {/* Price & Availability */}
                            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Price</p>
                                    <p className="text-3xl font-bold text-[#022c75]">{product.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                                    <p className="text-lg font-semibold text-green-600">{product.availability}</p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/quote"
                                    className="bg-[#022c75] text-white text-center py-3 rounded-full font-bold hover:bg-[#033a95] transition"
                                >
                                    Request Quote
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border-2 border-[#022c75] text-[#022c75] text-center py-3 rounded-full font-bold hover:bg-[#e6e6e6] hover:text-white transition"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Contact</h3>
                            <div className="space-y-3">
                                <a href="tel:+911234567890" className="flex items-center gap-3 text-gray-700 hover:text-[#022c75]">
                                    <Phone className="w-5 h-5" />
                                    <span>+91 123 456 7890</span>
                                </a>
                                <a href="mailto:sales@tekmart.com" className="flex items-center gap-3 text-gray-700 hover:text-[#022c75]">
                                    <Mail className="w-5 h-5" />
                                    <span>sales@tekmart.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {product.specifications.map((spec, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-[#022c75] rounded-full mt-2"></div>
                                <div>
                                    <p className="font-semibold text-gray-900">{spec.label}</p>
                                    <p className="text-gray-600">{spec.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

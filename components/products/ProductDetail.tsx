import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Phone, Mail } from 'lucide-react';
import { Product } from '@/data/demoProducts';

interface Props {
    product: Product;
}

export default function ProductDetail({ product }: Props) {
    const backLink = product.brandSlug
        ? `/${product.categorySlug}/${product.subcategorySlug}/${product.brandSlug}`
        : `/${product.categorySlug}/${product.subcategorySlug}`;

    const backLabel = product.brandSlug
        ? `Back to ${product.brand} Machines`
        : `Back to ${product.subcategory}`;

    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
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
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-[#022c75] mb-2 leading-tight">
                                        {product.brand} {product.name}
                                    </h1>
                                    <p className="text-[#022c75] font-bold uppercase tracking-widest text-xs">{product.subcategory}</p>
                                </div>
                                <span
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${product.condition === 'New'
                                        ? 'bg-green-100 text-green-700'
                                        : product.condition === 'Used'
                                            ? 'bg-blue-100 text-[#022c75]'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}
                                >
                                    {product.condition}
                                </span>
                            </div>

                            {product.yearOfManufacture && (
                                <div className="inline-block bg-[#022c75] px-3 py-1 rounded-lg text-xs font-bold text-[#e6e6e6] mb-6">
                                    Year of Manufacture: {product.yearOfManufacture}
                                </div>
                            )}

                            <div className="prose prose-blue max-w-none mb-8">
                                <h3 className="text-lg font-bold text-[#022c75] mb-2">Description</h3>
                                <p className="text-[#022c75] leading-relaxed">
                                    {product.longDescription}
                                </p>
                            </div>

                            {/* CTA Section */}
                            <div className="pt-8 border-t border-gray-100">
                                <Link
                                    href="/quote"
                                    className="block w-full bg-[#022c75] text-white text-center py-4 rounded-xl font-bold hover:bg-[#033a95] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 capitalize tracking-wide"
                                >
                                    Request  Quote
                                </Link>
                                <p className="text-center text-[10px] text-[#022c75] mt-4 font-semibold uppercase tracking-[0.2em]">
                                    Direct inquiry to administrator
                                </p>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="bg-white border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-[#022c75] uppercase tracking-widest">Stock Status</span>
                                <span className="text-[#e6e6e6] bg-[#022c75] rounded-sm font-bold uppercase tracking-widest text-sm">{product.availability}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications - Professional Table */}
                <div className="mt-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-[#022c75]">Technical Specifications</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white">
                                    <th className="px-8 py-4 text-xs font-bold text-[#022c75] uppercase tracking-widest border-b border-gray-100 w-1/3">Parameter</th>
                                    <th className="px-8 py-4 text-xs font-bold text-[#022c75] uppercase tracking-widest border-b border-gray-100">Description / Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {product.specifications.map((spec, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-8 py-5 text-sm font-bold text-[#022c75] bg-gray-50/50">{spec.label}</td>
                                        <td className="px-8 py-5 text-sm text-[#022c75] font-medium">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#022c75] mb-8 border-l-4 border-[#022c75] pl-4">Key Performance Features</h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center mt-0.5">
                                    <Check className="w-4 h-4 text-[#022c75] bg-[#e6e6e6]" />
                                </div>
                                <p className="text-sm text-[#022c75] font-medium leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

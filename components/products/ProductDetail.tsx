"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Phone, Mail } from 'lucide-react';
import { Product } from '@/lib/api';

interface Props {
    product: Product;
}

export default function ProductDetail({ product }: Props) {
    const [activeImage, setActiveImage] = useState(product.images?.[0] || "");

    useEffect(() => {
        if (product.images?.[0]) {
            setActiveImage(product.images[0]);
        }
    }, [product.images]);

    // Keyboard Navigation for Images
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!product.images || product.images.length <= 1) return;

            const currentIndex = product.images.indexOf(activeImage);
            if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % product.images.length;
                setActiveImage(product.images[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
                setActiveImage(product.images[prevIndex]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeImage, product.images]);

    const backLink = `/${product.category?.slug}/${product.subcategory?.slug}${product.subsubcategory?.slug ? `/${product.subsubcategory.slug}` : ''}`;

    const backLabel = product.subsubcategory?.name
        ? `Back to ${product.subsubcategory.name}`
        : `Back to ${product.subcategory?.name}`;

    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <Link
                    href={backLink}
                    className="inline-flex items-center gap-2 text-[#022c75] hover:gap-3 transition-all mb-6 font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {backLabel}
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className=" rounded-xl flex items-center justify-center mb-6 overflow-hidden relative  h-[400px]">
                            {activeImage ? (
                                <img src={activeImage} alt={product.name} className="w-full h-full object-contain transition-all duration-300" />
                            ) : (
                                <div className="text-4xl font-bold text-gray-300 uppercase">{product.name}</div>
                            )}
                        </div>

                        {/* Thumbnail Gallery (real) */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images?.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={`aspect-square bg-white border-2 rounded-lg flex items-center justify-center overflow-hidden transition-all cursor-pointer ${activeImage === img ? "border-[#022c75] ring-2 ring-[#022c75]/20" : "border-gray-100 hover:border-blue-400"
                                        }`}
                                >
                                    <img src={img} className="w-full h-full object-contain p-2" />
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
                                        {product.name}
                                    </h1>
                                    <p className="text-[#022c75] font-bold uppercase tracking-widest text-xs">
                                        {product.subcategory?.name} {product.subsubcategory?.name ? `| ${product.subsubcategory.name}` : ''}
                                    </p>
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

                          

                            <div className="prose prose-blue max-w-none mb-8">
                                <h3 className="text-lg font-bold text-[#022c75] mb-2">Description</h3>
                                <div
                                    className="text-[#022c75] leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: product.longDescription }}
                                />
                            </div>

                            {/* CTA Section */}
                            <div className="pt-8 border-t border-gray-100">
                                <Link
                                    href={`/quote?product=${encodeURIComponent(product.name)}&subcategory=${encodeURIComponent(product.subcategory?.name || '')}`}
                                    className="block w-full bg-[#022c75] text-white text-center py-4 rounded-xl font-bold hover:bg-[#033a95] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 capitalize tracking-wide"
                                >
                                    Request Quote
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
                                {Array.isArray(product.specifications) && product.specifications.map((spec: any, idx) => (
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
                        {product.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                                    <Check className="w-4 h-4 text-[#022c75]" />
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

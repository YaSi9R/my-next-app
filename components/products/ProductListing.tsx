import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/data/demoProducts';

interface Props {
    title: string;
    description: string;
    products: Product[];
    breadcrumbs: { label: string; href: string }[];
}

export default function ProductListing({ title, description, products, breadcrumbs }: Props) {
    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-[#e6e6e6]">Home</Link>
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            <span className="mx-2">/</span>
                            {idx === breadcrumbs.length - 1 ? (
                                <span className="text-[#e6e6e6] font-semibold">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.href} className="hover:text-[#e6e6e6]">{crumb.label}</Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-300">
                        {description}
                    </p>
                </div>

                {/* Product Grid */}
                {products.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                // Dynamic Link: /smt-machines/[subcategory]/[brand]/[id]
                                href={`/smt-machines/${product.subcategorySlug || 'other'}/${product.brandSlug}/${product.id}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Product Image */}
                                <div className="relative h-64 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[#e6e6e6] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-4xl font-bold text-gray-300 group-hover:scale-110 transition-transform text-center px-4">
                                            {product.name}
                                        </div>
                                    )}
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
                                        <span className="text-lg font-bold text-[#022c75]">{product.price}</span>
                                        <span className="inline-flex items-center gap-2 text-[#022c75] font-semibold group-hover:gap-3 transition-all">
                                            View Details
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl">
                        <p className="text-white text-xl">No products found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

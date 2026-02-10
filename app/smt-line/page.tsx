import React from 'react';
import Link from 'next/link';
import { smtLinePackages } from '@/data/demoProducts';
import { Check, ArrowRight, Factory, Zap, Users } from 'lucide-react';

export default function SMTLinePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        SMT Production Line Solutions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Complete turnkey SMT production lines tailored to your manufacturing needs - from entry-level to high-speed production
                    </p>
                </div>

                {/* Line Packages */}
                <div className="space-y-12">
                    {smtLinePackages.map((line, idx) => (
                        <div
                            key={line.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Line Diagram */}
                                <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <Factory className="w-32 h-32 text-[#022c75] mx-auto mb-4 opacity-20" />
                                        <p className="text-gray-500 text-sm">Line Flow Diagram</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            (Placeholder - actual diagram will be provided)
                                        </p>
                                    </div>
                                </div>

                                {/* Line Details */}
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <h2 className="text-3xl font-bold text-gray-900">{line.name}</h2>
                                        <span className="px-4 py-2 bg-[#022c75] text-white rounded-full text-sm font-semibold">
                                            {idx === 0 ? 'Popular' : 'Premium'}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-6 leading-relaxed">{line.description}</p>

                                    {/* Key Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-5 h-5 text-[#022c75]" />
                                                <p className="text-sm font-semibold text-gray-700">Capacity</p>
                                            </div>
                                            <p className="text-gray-900 font-bold">{line.capacity}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Factory className="w-5 h-5 text-[#022c75]" />
                                                <p className="text-sm font-semibold text-gray-700">Floor Space</p>
                                            </div>
                                            <p className="text-gray-900 font-bold">{line.floorSpace}</p>
                                        </div>
                                    </div>

                                    {/* Suitable For */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-[#022c75]" />
                                            Suitable For
                                        </h3>
                                        <p className="text-gray-600">{line.suitableFor}</p>
                                    </div>

                                    {/* Included Machines */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 mb-3">Included Equipment</h3>
                                        <div className="space-y-2">
                                            {line.machines.map((machine, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700">{machine}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 mb-3">Package Includes</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {line.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Investment</p>
                                            <p className="text-2xl font-bold text-[#022c75]">{line.price}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/smt-line/${line.id}`}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#022c75] text-white rounded-full font-semibold hover:bg-[#033a95] transition"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-[#022c75] rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Need a Custom SMT Line Configuration?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Our engineers can design a bespoke production line tailored to your specific requirements
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-[#022c75] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                        >
                            Contact Engineering Team
                        </Link>
                        <Link
                            href="https://wa.me/911234567890"
                            className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#022c75] transition"
                        >
                            WhatsApp Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

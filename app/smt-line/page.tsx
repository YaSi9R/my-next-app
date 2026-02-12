import React from 'react';
import Link from 'next/link';
import { getAllLinePackages } from '@/lib/api';
import { Check, ArrowRight, Factory, Zap, Users } from 'lucide-react';

export default async function SMTLinePage() {
    const smtLinePackages = await getAllLinePackages();
    return (
        <div className="min-h-screen bg-[#022c75] py-12">
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


                <div className="space-y-12">
                    {smtLinePackages.map((line, idx) => (
                        <div
                            key={line.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="grid lg:grid-cols-2 gap-8">

                                <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-8 flex items-center justify-center">
                                    <div className="text-center">
                                        <Factory className="w-32 h-32 text-[#e6e6e6] mx-auto mb-4 opacity-20" />
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
                                        <span className="px-4 py-2 bg-[#e6e6e6] text-white rounded-full text-sm font-semibold">
                                            {idx === 0 ? 'Popular' : 'Premium'}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-6 leading-relaxed">{line.description}</p>

                                    {/* Key Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="w-5 h-5 text-[#e6e6e6]" />
                                                <p className="text-sm font-semibold text-gray-700">Capacity</p>
                                            </div>
                                            <p className="text-gray-900 font-bold">{line.capacity}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Factory className="w-5 h-5 text-[#e6e6e6]" />
                                                <p className="text-sm font-semibold text-gray-700">Floor Space</p>
                                            </div>
                                            <p className="text-gray-900 font-bold">{line.floorSpace}</p>
                                        </div>
                                    </div>

                                    {/* Suitable For */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-[#e6e6e6]" />
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

                                    {/* CTA */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pricing</span>
                                            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Request Technical Quote</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/smt-line/${line.id}`}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#022c75] text-white rounded-xl font-bold hover:bg-[#033a95] transition shadow-lg hover:shadow-xl"
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
                <div className="mt-16 bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 text-center text-white backdrop-blur-sm shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6 tracking-tight">Need a Custom SMT Line Configuration?</h2>
                    <p className="text-lg mb-10 text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
                        Our specialized engineers can design a bespoke production line tailored to your specific manufacturing volume and technical requirements.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/quote"
                            className="inline-block bg-white text-[#022c75] px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition shadow-2xl hover:scale-105"
                        >
                            Request Custom Line Quote
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

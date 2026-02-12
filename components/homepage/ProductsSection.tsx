import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

const ProductsSection = () => {
    return (
        <section className="lg:py-20 px-4 bg-[#e6e6e6] ">
            <div className="container mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    <div className="space-y-6 mt-[100px]">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#022c75] leading-tight">
                            Purchase Your SMT Machine, Parts, and Line at One stop, at Once
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Whether you're in the market for complete SMT machines or fully-built production lines, Tekmart's lineup of products is sure to meet your diverse manufacturing needs.
                        </p>
                    </div>

                    {/* Right Grid - 3 Product Cards */}
                    <div className="grid grid-cols-1 gap-6">

                        <div className="bg-[#022c75] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#e6e6e6] group">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <Star className="w-7 h-7 text-[#022c75]" fill="currentColor" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">SMT Machine</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed mb-4">
                                        As SMT machine supplier, Tekmart carries a range of brand-new and used SMT machines that support the most famous brands, all at amazingly competitive prices.
                                    </p>
                                    <Link href="/smt-machines" className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <div className="grid md:grid-cols-2 gap-6">
                            {/* SMT Parts Card */}
                            <div className="bg-[#022c75] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#e6e6e6] group">
                                <div className="space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <Star className="w-7 h-7 text-[#022c75]" fill="currentColor" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#e6e6e6]">SMT Parts</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed">
                                        Purchase all the SMT parts you need at one stop! Tekmart has new and refurbished parts that will perfectly fit your market demands.
                                    </p>
                                    <Link href="/smt-parts" className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* SMT Production Line Card */}
                            <div className="bg-[#022c75] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#e6e6e6] group">
                                <div className="space-y-4">
                                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <Star className="w-7 h-7 text-[#022c75]" fill="currentColor" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#e6e6e6]">SMT Production Line</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed">
                                        With Tekmart's robust experience in SMT construction and abundant resources, we offer professional bespoke electronic production line solutions and unmatched service.
                                    </p>
                                    <Link href="/smt-line" className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;

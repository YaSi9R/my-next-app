import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

const ProductsSection = () => {
    return (
        <section className="lg:py-20 px-4 bg-[#e6e6e6] ">
            <div className="container mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 justify-center items-center">

                    <div className="space-y-6  justify-center items-center">
                        <h2 className="text-3xl lg:text-5xl font-bold text-[#022c75] leading-tight">
                            Solving Real SMT Procurement Challenges for Indian Manufacturers
                        </h2>
                        <p className="text-[#022c75] text-lg leading-relaxed">
                            SMT equipment purchasing is not just about availability. It involves compatibility, lead time, machine condition and long-term support. Tekmart addresses these critical factors to reduce production risk and decision uncertainty.
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
                                    <h3 className="text-2xl font-bold text-[#e6e6e6] mb-3">Downtime Due to Spare Part Delays
</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed mb-4">
                                        We maintain access to critical SMT spare parts to minimize unexpected production interruptions.

                                    </p>
                                    <Link href="/smt-parts" className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold hover:gap-3 transition-all">
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
                                    <h3 className="text-2xl font-bold text-[#e6e6e6]">Uncertainty in Refurbished Machine Condition</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed">
                                       Machines are evaluated for operational integrity, key assemblies and performance suitability before offering.

                                    </p>
                                    <Link href="/smt-machines" className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold hover:gap-3 transition-all">
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
                                    <h3 className="text-2xl font-bold text-[#e6e6e6]">Difficulty in Line Compatibility</h3>
                                    <p className="text-[#e6e6e6] leading-relaxed">
                                        We guide equipment selection based on PCB size, feeder compatibility and production volume requirements
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

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Factory, Zap, Activity, BarChart3, ChevronRight } from 'lucide-react';

export default function SMTLinePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* Hero Section */}
            <div className="bg-[#e6e6e6] py-6 lg:py-10 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight leading-tight text-[#022c75]">
                            Complete SMT Lines Configured for <span className="text-[#022c75] text-4xl block">Every Production Scale</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-3xl mx-auto">
                            Tekmart designs and configures complete SMT production lines combining refurbished core
                            machines with select new peripherals. From compact 20,000 CPH setups to
                            high-performance 60,000+ CPH systems, each line is structured around your production
                            goals, space constraints, and investment strategy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Line Cards Section */}
            <div className="container mx-auto px-4 max-w-7xl py-8 -mt-16 z-20 relative">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Entry Level Card */}
                    <div className="bg-[#022c75] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border  border-[#022c75]">
                        <div className="h-2 bg-[#022c75]"></div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="w-14 h-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-[#022c75]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#e6e6e6] mb-2">Entry Level SMT Line</h3>
                            <div className="text-sm font-bold text-[#022c75] mb-4 bg-[#e6e6e6] inline-block px-3 py-1 rounded-full w-fit">
                                Up to 20,000 CPH
                            </div>
                            <p className="text-[#e6e6e6] mb-8 flex-1 leading-relaxed">
                                Smart automation designed for new SMT setups, manual-to-automation upgrades, and budget-conscious expansion.
                            </p>
                            <Link
                                href="/smt-line/entry-level"
                                className="group flex items-center justify-between w-full py-3 px-5 bg-[#e6e6e6]  text-[#022c75]  rounded-xl transition-all duration-300 font-semibold"
                            >
                                Explore Entry Line
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Mid Level Card */}
                    <div className="bg-[#e6e6e6] rounded-2xl shadow-xl overflow-hidden hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-[#022c75] relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-[#022c75] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            MOST POPULAR
                        </div>
                        <div className="h-2 bg-[#022c75]"></div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="w-14 h-14 bg-[#022c75] rounded-xl flex items-center justify-center mb-6">
                                <Activity className="w-8 h-8 text-[#e6e6e6]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#022c75] mb-2">Mid Level SMT Line</h3>
                            <div className="text-sm font-bold text-[#e6e6e6] mb-4 bg-[#022c75] inline-block px-3 py-1 rounded-full w-fit">
                                Up to 40,000 CPH
                            </div>
                            <p className="text-[#022c75] mb-8 flex-1 leading-relaxed">
                                Balanced throughput and flexibility for growing EMS and OEM manufacturers handling multiple SKUs.
                            </p>
                            <Link
                                href="/smt-line/mid-scale"
                                className="group flex items-center justify-between w-full py-3 px-5 bg-[#022c75] text-white rounded-xl transition-all duration-300 font-semibold shadow-lg "
                            >
                                Explore Mid Level Line
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* High Speed Card */}
                    <div className="bg-[#022c75] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100">
                        <div className="h-2 bg-[#022c75]"></div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="w-14 h-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center mb-6">
                                <BarChart3 className="w-8 h-8 text-[#022c75]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#e6e6e6] mb-2">High Speed SMT Line</h3>
                            <div className="text-sm font-bold text-[#022c75] mb-4 bg-[#e6e6e6] inline-block px-3 py-1 rounded-full w-fit">
                                40,000–60,000+ CPH
                            </div>
                            <p className="text-[#e6e6e6] mb-8 flex-1 leading-relaxed">
                                Engineered for high-volume production environments requiring speed, precision, and operational stability.
                            </p>
                            <Link
                                href="/smt-line/high-speed"
                                className="group flex items-center justify-between w-full py-3 px-5 bg-[#e6e6e6] text-[#022c75] rounded-xl transition-all duration-300 font-semibold"
                            >
                                Explore High Speed Line
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto px-4 max-w-4xl py-20 text-center">
                <div className="bg-[#e6e6e6] rounded-3xl p-10 md:p-14 shadow-lg border border-[2px] border-[#022c75]">
                    <h2 className="text-3xl font-bold text-[#022c75] mb-4">Not Sure Which Line Fits Your Production?</h2>
                    <p className="text-lg text-[#022c75] mb-8 max-w-2xl mx-auto">
                        Speak with our technical team to receive a structured recommendation based on your PCB type, target output, and budget.
                    </p>
                    <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 bg-[#022c75] text-[#e6e6e6] px-8 py-4 rounded-full font-bold text-lg  transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Schedule Consultation
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

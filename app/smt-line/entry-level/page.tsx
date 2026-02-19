import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, CircuitBoard, Layers, Zap, ArrowRight, Settings, Sliders } from 'lucide-react';
import Image from 'next/image';
import image1 from "../../../public/entry-level-image.png"
import AvailableConfig from '@/components/smt-line/AvailableConfig';

export default function EntryLevelLinePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* Hero Section */}
            <div className="bg-[#e6e6e6] text-[#022c75] py-16 lg:py-24 relative overflow-hidden">

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <Link href="/smt-line" className="inline-flex items-center text-[#022c75] font-semibold  mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to SMT Lines
                    </Link>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                                Entry Level SMT Production Line <span className="text-[#022c75] text-4xl">Stable Automation</span>
                                <br /> <span className="text-xl font-bold block mt-2">Up to 20,000 CPH • Compact Layout • Modular Scalability</span>
                            </h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    Up to 20,000 CPH
                                </span>
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    Compact Layout
                                </span>
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    Modular Scalability
                                </span>
                            </div>
                            <p className="text-lg text-[#022c75] leading-relaxed mb-8">
                                Suitable for low to medium production volumes while maintaining placement accuracy and consistent process stability.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/quote"
                                    className="inline-flex 
 items-center justify-center px-6 py-3.5 bg-[#022c75] text-[#e6e6e6] rounded-xl font-bold hover:bg-[#022c75]/80 transition shadow-lg hover:shadow-[#022c75]/25"
                                >
                                    Request Complete Line Proposal
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex whitespace-nowrap items-center justify-center px-6 py-3.5 bg-[#e6e6e6] border border-[#022c75] border-[2px] text-[#022c75] rounded-xl font-bold hover:bg-white/20 transition backdrop-blur-sm"
                                >
                                    Schedule Consultation
                                </Link>
                            </div>
                        </div>
                        <div className="relative  lg:block">

                            <div className="relative border border-white/10 rounded-2xl p-6 scale-120">
                                {/* Placeholder for Line Diagram or Image */}
                                <Image
                                    src={image1}
                                    alt="Entry Level SMT Line"
                                    width={700}
                                    height={700}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl py-16">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Line Overview */}
                        <section>
                            <h2 className="text-3xl font-bold text-[#022c75] mb-6 flex items-center gap-3">
                                <Layers className="w-8 h-8 text-[#022c75]" />
                                Line Overview
                            </h2>
                            <div className="bg-[#e6e6e6] rounded-2xl p-8 shadow-sm border border-[#022c75] border-[2px]">
                                <p className="text-[#022c75] leading-relaxed text-lg mb-8">
                                    This entry-level SMT production line provides stable automation with modular scalability. It is suitable for low to medium production volumes while maintaining placement accuracy and consistent process stability.
                                </p>
                                <div className="mb-8">
                                    <h4 className="font-bold text-[#022c75] mb-4">Each configuration is structured around:</h4>
                                    <ul className="space-y-2">
                                        {['PCB complexity', 'Target throughput (CPH)', 'Available production floor space', 'Future expansion planning'].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-[#022c75]">
                                                <Check className="w-5 h-5 text-[#022c75]" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#e6e6e6] rounded-xl p-6 ">
                                    <h3 className="font-bold text-[#022c75] mb-4 uppercase text-sm tracking-wider">Typical SMT Line Structure</h3>
                                    <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 text-sm font-medium text-[#e6e6e6]">
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Loader</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Screen Printer</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Pick & Place</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Reflow Oven</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">AOI</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Unloader</span>
                                    </div>
                                    <p className="mt-6 text-sm text-[#022c75]/80 italic">
                                        Peripheral selection and layout adjustments can be configured based on operational requirements.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Available Configurations */}
                        <AvailableConfig pageSlug="entry-level" />

                    </div>

                    {/* Sidebar / Snapshot */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#e6e6e6] rounded-2xl shadow-lg border border-[2px] border-[#022c75] overflow-hidden sticky top-24">
                            <div className="bg-[#022c75] text-[#e6e6e6] p-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-[#e6e6e6]" />
                                    Performance Snapshot
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Maximum Placement Speed</p>
                                    <p className="text-lg font-bold text-[#022c75]">Up to 20,000 CPH</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Component Capability</p>
                                    <p className="text-lg font-bold text-[#022c75]">0402 standard</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">PCB Size Support</p>
                                    <p className="text-lg font-bold text-[#022c75]">Standard industrial PCB size ranges</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Line Footprint</p>
                                    <p className="text-lg font-bold text-[#022c75]">Compact and space-efficient</p>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="/quote"
                                        className="block w-full text-center bg-[#022c75] text-white py-3 rounded-xl font-bold hover:bg-[#033a95] transition"
                                    >
                                        Request Line Proposal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Closing CTA */}
            <div className="bg-[#e6e6e6] border-t border-gray-200 py-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-[#022c75] mb-6">Build Your SMT Production Line with Confidence.</h2>
                    <p className="text-lg text-[#022c75] mb-8">Get a structured proposal tailored to your production plan.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#022c75] text-[#e6e6e6] rounded-full font-bold hover:bg-[#033a95] transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Request Proposal
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#e6e6e6] text-[#022c75] border-2 border-[#022c75] rounded-full font-bold  transition hover:-translate-y-0.5"
                        >
                            Schedule Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

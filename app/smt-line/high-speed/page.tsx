import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, CircuitBoard, Layers, Zap, ArrowRight, Settings, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import image1 from "../../../public/highscalesmt.png";
import AvailableConfig from '@/components/smt-line/AvailableConfig';

export default function HighSpeedLinePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* Hero Section */}
            <div className="bg-[#e6e6e6] text-[#022c75] py-16 lg:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <Link href="/smt-line" className="inline-flex items-center text-[#022c75] font-semibold mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to SMT Lines
                    </Link>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                                High-Volume Production with <span className="text-[#022c75] text-4xl">Advanced Line Integration</span>
                            </h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    40,000–60,000+ CPH
                                </span>
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    Automation Ready
                                </span>
                                <span className="bg-[#022c75] text-[#e6e6e6] border border-[#022c75]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                    Industrial Reliability
                                </span>
                            </div>
                            <p className="text-lg text-[#022c75] leading-relaxed mb-8">
                                Engineered for large-scale EMS operations, export-focused manufacturers, and industrial-grade production environments.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center justify-center px-6 py-3.5 bg-[#022c75] text-[#e6e6e6] rounded-xl font-bold hover:bg-[#022c75]/80 transition shadow-lg hover:shadow-[#022c75]/25"
                                >
                                    Request Complete Line Proposal
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3.5 bg-[#e6e6e6] border border-[#022c75] border-[2px] text-[#022c75] rounded-xl font-bold hover:bg-white/20 transition backdrop-blur-sm"
                                >
                                    Schedule Consultation
                                </Link>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="relative border border-white/10 rounded-2xl p-6 ">
                                {/* Placeholder for Line Diagram or Image */}
                                <Image
                                    src={image1}
                                    alt="Entry Level SMT Line"
                                    width={500}
                                    height={500}
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
                                    This configuration supports continuous high-volume output with enhanced process stability and inspection integration.
                                </p>

                                <div className="bg-[#e6e6e6] rounded-xl p-6 ">
                                    <h3 className="font-bold text-[#022c75] mb-4 uppercase text-sm tracking-wider">Typical Line Structure</h3>
                                    <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 text-sm font-medium text-[#e6e6e6]">
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Loader</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">High-Precision Printer</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Multi-Gantry Pick & Place</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Nitrogen Reflow (Optional)</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">SPI/AOI</span>
                                        <ArrowRight className="w-4 h-4 text-[#022c75] rotate-90 md:rotate-0" />
                                        <span className="bg-[#022c75] px-3 py-2 rounded-lg shadow-sm border">Unloader</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Available Configurations */}
                        <AvailableConfig pageSlug="high-speed" />

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
                                    <p className="text-lg font-bold text-[#022c75]">60,000+ CPH</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Component Capability</p>
                                    <p className="text-lg font-bold text-[#022c75]">0201 & Fine Pitch Support</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Process Options</p>
                                    <p className="text-lg font-bold text-[#022c75]">Nitrogen Reflow Available</p>
                                </div>
                                <div className="h-px bg-[#022c75]/20"></div>
                                <div>
                                    <p className="text-sm font-semibold text-[#022c75] mb-1">Automation Integration</p>
                                    <p className="text-lg font-bold text-[#022c75]">Inspection & Data Monitoring Ready</p>
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
                    <h2 className="text-3xl font-bold text-[#022c75] mb-6">Build a High-Performance SMT Line Designed for Scale.</h2>
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
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#e6e6e6] text-[#022c75] border-2 border-[#022c75] rounded-full font-bold transition hover:-translate-y-0.5"
                        >
                            Schedule Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

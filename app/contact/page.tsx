"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-[#022c75] mb-6 tracking-tight">Get in Touch</h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto leading-relaxed">
                        For all equipment inquiries, technical specifications, and procurement needs, please use our unified quote request system.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Primary Action Card */}
                    <div className="lg:col-span-2 bg-[#e6e6e6] border border-[#022c75] rounded-[40px] p-12 shadow-2xl flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#022c75] mb-6">Request Technical Information</h2>
                            <p className="text-[#022c75] text-lg mb-8 leading-relaxed">
                                Our technical team is ready to assist you with detailed machine configurations, part compatibility checks, and production line optimization proposals.
                            </p>
                            <div className="space-y-4 mb-12">
                                <div className="flex items-center gap-4 text-[#022c75] font-medium">
                                    <div className="w-2 h-2 bg-[#022c75] rounded-full"></div>
                                    Detailed Technical Proposals
                                </div>
                                <div className="flex items-center gap-4 text-[#022c75] font-medium">
                                    <div className="w-2 h-2 bg-[#022c75] rounded-full"></div>
                                    Custom Production Line Solutions
                                </div>
                                <div className="flex items-center gap-4 text-[#022c75] font-medium">
                                    <div className="w-2 h-2 bg-[#022c75] rounded-full"></div>
                                    Specialized SMT Spare Parts Sourcing
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/quote"
                            className="bg-[#022c75] text-white text-center py-5 rounded-2xl font-bold text-xl hover:bg-[#033a95] transition-all shadow-xl flex items-center justify-center gap-3 group"
                        >
                            Request a Professional Quote
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {/* Side Info */}
                    <div className="space-y-6">
                        <div className="bg-white border border-[#022c75] rounded-[30px] p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-[#022c75]">Registered Office</h3>
                            <div className="flex gap-3 text-[#022c75]">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <p className="text-sm leading-relaxed">
                                    M 304, Dharma Apartment<br />
                                    IP Extension, Plot No. 2<br />
                                    Patparganj, New Delhi – 110092<br />
                                    Delhi, India
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#022c75] rounded-[30px] p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-[#022c75]">Sales Office</h3>
                            <div className="flex gap-3 text-[#022c75]">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <p className="text-sm leading-relaxed">
                                    260, Block BG-1<br />
                                    Paschim Vihar<br />
                                    New Delhi – 110063<br />
                                    India
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#022c75] rounded-[30px] p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-[#022c75]">Warehouse & Refurbishment Centre</h3>
                            <div className="flex gap-3 text-[#022c75]">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <p className="text-sm leading-relaxed">
                                    Plot No. 1405<br />
                                    Dheeraj Nagar Extension<br />
                                    Faridabad – 121013<br />
                                    Haryana, India
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#022c75] rounded-[30px] p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-[#022c75]">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-[#022c75]">
                                    <Phone className="w-5 h-5 shrink-0" />
                                    <div className="text-sm">
                                        <p>+91 9220246692</p>
                                        <p>+91 9811613022</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-[#022c75]">
                                    <Mail className="w-5 h-5 shrink-0" />
                                    <a href="mailto:sarthak@tekmartindia.com" className="text-sm hover:underline">
                                        sarthak@tekmartindia.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

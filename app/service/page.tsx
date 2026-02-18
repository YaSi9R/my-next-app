import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Settings, Wrench, ShieldCheck, PhoneCall, Clock, Calendar, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import image1 from "../../public/service.png"
export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* 1. HERO SECTION */}
            <section className="bg-[#e6e6e6] text-[#022c75] py-10 lg:py-10 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">

                    <div className="grid lg:grid-cols-2 items-center gap-12">

                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ">
                               SMT Service,Installation & Technical Support Across India
                            </h1>

                            <p className="text-lg md:text-xl text-[#022c75]/80 mb-10 leading-relaxed max-w-2xl">
                              Tekmart India provides structured installation, preventive maintenance, AMC coverage and breakdown assistance for refurbished SMT machines and complete SMT production lines.
Our service approach is designed to ensure long-term operational reliability, reduced downtime and stable manufacturing performance for EMS and OEM manufacturers across India.

                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#support"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-[#022c75] text-white rounded-xl font-bold hover:bg-[#022c75]/90 transition shadow-lg"
                                >
                                    Request Service Support
                                </Link>

                                <Link
                                    href="#amc"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#022c75] text-[#022c75] rounded-xl font-bold hover:bg-[#022c75]/5 transition"
                                >
                                    Enquire About AMC
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="flex justify-center lg:justify-end">
                            <Image
                                src={image1}
                                alt="SMT Machine Repair"
                                className="rounded-2xl object-contain"
                                width={600}
                                height={500}
                            />
                        </div>

                    </div>
                </div>
            </section>


          
            <section className="py-20 bg-[#e6e6e6] -mt-10 relative z-20">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <Link href="#installation" className="group">
                            <div className="bg-[#022c75] p-8 rounded-2xl shadow-lg  h-full flex flex-col justify-between  transition-colors duration-300 hover:-translate-y-0.5">
                                <div>
                                    <div className="w-12 h-12 bg-[#e6e6e6] rounded-lg flex items-center justify-center mb-6">
                                        <Settings className="w-6 h-6 text-[#022c75]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#e6e6e6] mb-2  transition-colors">Installation & Commissioning</h3>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-semibold text-[#e6e6e6]">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Card 2 */}
                        <Link href="#maintenance" className="group">
                            <div className="bg-[#e6e6e6] p-8 rounded-2xl shadow-lg border border-[#022c75] border-2 h-full flex flex-col justify-between hover:border-[#022c75] transition-colors duration-300 hover:-translate-y-0.5">
                                <div>
                                    <div className="w-12 h-12 bg-[#022c75] rounded-lg flex items-center justify-center mb-6">
                                        <Wrench className="w-6 h-6 text-[#e6e6e6]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#022c75] mb-2  transition-colors">Preventive Maintenance</h3>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-semibold text-[#022c75]">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Card 3 */}
                        <Link href="#amc" className="group">
                            <div className="bg-[#022c75] p-8 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col justify-between hover:border-[#022c75] transition-colors duration-300 hover:-translate-y-0.5">
                                <div>
                                    <div className="w-12 h-12 bg-[#e6e6e6] rounded-lg flex items-center justify-center mb-6">
                                        <ShieldCheck className="w-6 h-6 text-[#022c75]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#e6e6e6] mb-2  transition-colors">Annual Maintenance Contract (AMC)</h3>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-semibold text-[#e6e6e6]">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Card 4 */}
                        <Link href="#support" className="group">
                            <div className="bg-[#e6e6e6] p-8 rounded-2xl shadow-lg border border-[#022c75] border-2 h-full flex flex-col justify-between hover:border-[#022c75] transition-colors duration-300 hover:-translate-y-0.5">
                                <div>
                                    <div className="w-12 h-12 bg-[#022c75] rounded-lg flex items-center justify-center mb-6">
                                        <PhoneCall className="w-6 h-6 text-[#e6e6e6]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#022c75] mb-2  transition-colors">Breakdown Support</h3>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-semibold text-[#022c75]">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DETAILED SECTIONS */}
            <div className="container mx-auto px-4 max-w-5xl space-y-24 pb-24">

                {/* SECTION 1 – INSTALLATION */}
                <section id="installation" className="scroll-mt-24">
                    <div className="bg-[#e6e6e6] rounded-3xl p-8 md:p-12 border border-2 border-[#022c75] shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-[#022c75] rounded-xl">
                                <Settings className="w-8 h-8 text-[#e6e6e6]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-[#022c75] mb-2">Machine Installation & Line Integration</h2>
                                <p className="text-lg text-[#022c75]">
                                  Complete installation and structured commissioning support to ensure stable SMT machine performance from day one.

                                </p>
                            </div>
                        </div>

                        <div className="bg-[#e6e6e6] rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-[#022c75] mb-4 uppercase tracking-wider text-sm">Scope Includes</h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Machine positioning and precision leveling",
                                    "Electrical and pneumatic verification",
                                    "Calibration and alignment",
                                    "Trial production validation",
                                    "Initial operator guidance"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#022c75] shrink-0 mt-0.5" />
                                        <span className="text-[#022c75] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 – PREVENTIVE MAINTENANCE */}
                <section id="maintenance" className="scroll-mt-24">
                    <div className="bg-[#e6e6e6] rounded-3xl p-8 md:p-12 border border-[#022c75] border-2 shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-[#022c75] rounded-xl">
                                <Wrench className="w-8 h-8 text-[#e6e6e6]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-[#022c75] mb-2">Preventive Maintenance & Health Checks</h2>
                                <p className="text-lg text-[#022c75]">
                                   Scheduled inspection and calibration programs designed to reduce downtime and maintain placement accuracy across SMT production lines
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#e6e6e6] rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-[#022c75] mb-4 uppercase tracking-wider text-sm">Scope Includes</h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Mechanical and electrical inspection",
                                    "Cleaning of critical assemblies",
                                    "Motion system calibration",
                                    "Firmware and software verification",
                                    "Detailed service report"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#022c75] shrink-0 mt-0.5" />
                                        <span className="text-[#022c75] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 3 – AMC */}
                <section id="amc" className="scroll-mt-24">
                    <div className="bg-[#022c75] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                        {/* Background Pattern */}
                        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div> */}

                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="p-3 bg-[#e6e6e6] rounded-xl backdrop-blur-sm">
                                    <ShieldCheck className="w-8 h-8 text-[#022c75]" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold mb-2 text-[#e6e6e6]">Annual Maintenance Contract (AMC)</h2>
                                    <p className="text-[#e6e6e6] text-lg">
                                        Tekmart offers structured one-year AMC coverage for individual SMT machines and complete production lines.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-[#e6e6e6] rounded-2xl p-6 backdrop-blur-md">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#022c75]">
                                        <Calendar className="w-5 h-5 text-[#022c75]" />
                                        Contract Structure
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "1-year duration",
                                            "4 preventive visits per year",
                                            "Comprehensive inspection",
                                            "Cleaning and calibration",
                                            "Technical support during contract period"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-[#022c75]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#022c75] mt-2 shrink-0 font-semibold"></div>
                                                <span className="font-semibold">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#e6e6e6] rounded-2xl p-6 backdrop-blur-md">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#022c75]">
                                        <CheckCircle2 className="w-5 h-5 text-[#022c75]" />
                                        Key Benefits
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Improved uptime",
                                            "Reduced unexpected breakdowns",
                                            "Priority response scheduling",
                                            "Improved operational stability"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-[#022c75]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#022c75] mt-2 shrink-0"></div>
                                                <span className="font-semibold">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-[#e6e6e6] rounded-xl p-6 mb-8 border border-white/10">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-[#022c75] mb-3">Exclusions</h3>
                                <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#022c75] font-bold">
                                    <li>• Major repairs quoted separately</li>
                                    <li>• Consumables unless specified</li>
                                    <li>• External damage</li>
                                </ul>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-[#e6e6e6] text-[#022c75] rounded-xl font-bold hover:bg-blue-50 transition"
                            >
                                Request AMC Proposal
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 4 – BREAKDOWN SUPPORT */}
                <section id="support" className="scroll-mt-24">
                    <div className="bg-[#e6e6e6] rounded-3xl p-8 md:p-12 border border-[#022c75] border-2 shadow-lg">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-[#022c75] rounded-xl">
                                <PhoneCall className="w-8 h-8 text-[#e6e6e6]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-[#022c75] mb-2">Breakdown Troubleshooting & Technical Support</h2>
                                <p className="text-lg text-[#022c75] font-semibold">
                                    Structured fault diagnosis and technical assistance for Tekmart-supplied SMT machines and production lines.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#e6e6e6]/30 rounded-2xl p-8 mb-6">
                            <h3 className="text-lg font-bold text-[#022c75] mb-4 uppercase tracking-wider text-sm">Support Includes</h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "On-site technical visit",
                                    "Fault diagnosis and corrective action",
                                    "Spare part identification",
                                    "Remote technical guidance (where feasible)"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#022c75] shrink-0 mt-0.5" />
                                        <span className="text-[#022c75] font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                       
                    </div>
                </section>

            </div>

            {/* FINAL CTA SECTION */}
            <section className="bg-[#022c75] text-[#e6e6e6] py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Reliable Machines Require Structured Support</h2>
                    <p className="text-xl text-[#e6e6e6] mb-10 max-w-2xl mx-auto">
                        Speak with our technical team to plan installation, maintenance, or AMC coverage.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#e6e6e6] text-[#022c75] rounded-xl font-bold hover:bg-blue-50 transition"
                        >
                            Request Service Support
                        </Link>
                        <Link
                            href="#amc"
                            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#e6e6e6] text-[#e6e6e6] rounded-xl font-bold hover:bg-white/10 transition"
                        >
                            Enquire About AMC
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

"use client";

import React from "react";
import { ChevronRight, MessageSquare } from "lucide-react";

const FeatureCard = ({ title, items, linkText, linkHref }: { title: string, items: string[], linkText: string, linkHref: string }) => (
    <div className="bg-[#022c75] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
        <h3 className="text-xl font-bold text-[#e6e6e6] mb-6">{title}</h3>
        <ul className="space-y-4  mb-12">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#e6e6e6] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e6e6e6] mt-1.5 flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
        <a href={linkHref} className="text-[#e6e6e6] font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all  hover:text-[#e6e6e6]">
            {linkText} <ChevronRight size={16} />
        </a>
    </div>
);

const FeaturesSection = () => {
    return (
        <section className="bg-[#e6e6e6] py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8 text-[#e6e6e6]">

                    {/* Left Grid: Features */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 text-[#e6e6e6]">
                        <FeatureCard
                            title="Refurbished SMT Machines"
                            items={["High-performance Pick & Place machines, Reflow Ovens, Screen Printers, AOI & SPI systems from trusted global brands."]}
                            linkText="Explore SMT Machines"
                            linkHref="/smt-machines"
                        />
                        <FeatureCard
                            title="SMT Spare Parts & Feeders
"
                            items={["Original and compatible feeders, nozzles, motors, electrical boards and critical SMT replacement components."]}
                            linkText="Browse Spare Parts"
                            linkHref="/smt-parts"
                        />
                        <FeatureCard
                            title="Complete SMT Line Solutions
"
                            items={["End-to-end SMT line planning, machine integration, board handling equipment and production optimization support."]}
                            linkText="Build Your SMT Line"
                            linkHref="/smt-line"
                        />
                        <FeatureCard
                            title="Installation & Technical Services
"
                            items={["Professional installation, commissioning, operator training and long-term technical support across India."]}
                            linkText="View Support Services"
                            linkHref="/service"
                        />
                    </div>

                    {/* Right Block: Stats */}
                    <div className="lg:w-1/2 bg-[#e6e6e6] rounded-3xl p-10 md:p-16 text-[#022c75] relative">
                        <div className="max-w-md">
                            <p className="text-sm font-medium mb-2 opacity-90">Rapid, Simple and Reliable</p>
                            <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-4">
                                Simplifying SMT Equipment Procurement for Indian Manufacturers
                            </h2>
                            <p className="text-sm opacity-90 leading-relaxed mb-4">
                                Tekmart India Exim Pvt. Ltd. provides reliable access to refurbished SMT machines, genuine spare parts and complete line solutions for EMS and OEM manufacturers across India. From sourcing to commissioning, we ensure transparency, technical reliability and timely execution at every stage.
                            </p>

                            <div className="flex  md:grid-cols-3 gap-y-10 gap-x-12  border-t border-white/20 pt-10">
                                <div >
                                    <div className="text-3xl md:text-4xl font-bold mb-1">30+</div>
                                    <div className="text-xs opacity-80">Global SMT Brands Supported</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">4,000+</div>
                                    <div className="text-xs opacity-80">SMT Machines & Spare Parts Available
</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">15+</div>
                                    <div className="text-xs opacity-80">Years of Industry Experience</div>
                                </div>
                               
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

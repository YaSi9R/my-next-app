"use client";

import React from "react";
import { ChevronRight, MessageSquare } from "lucide-react";

const FeatureCard = ({ title, items, linkText, linkHref }: { title: string, items: string[], linkText: string, linkHref: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
        <h3 className="text-xl font-bold text-[#022c75] mb-6">{title}</h3>
        <ul className="space-y-3 mb-8 flex-grow">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
        <a href={linkHref} className="text-[#2d3748] font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all  hover:text-[#022c75]">
            {linkText} <ChevronRight size={16} />
        </a>
    </div>
);

const FeaturesSection = () => {
    return (
        <section className="bg-[#e6e6e6] py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 text-[#022c75]">

                    {/* Left Grid: Features */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 text-[#022c75]">
                        <FeatureCard
                            title="Find Your Product"
                            items={["Wide Product Coverage", "Responsive Product Finding", "100% Product Matching"]}
                            linkText="Find Now"
                            linkHref="#"
                        />
                        <FeatureCard
                            title="Get Your Products"
                            items={["Ample SMT Product Expertise", "Solid Supply Chain System", "Proficiency in Tricky Products"]}
                            linkText="Request Support"
                            linkHref="#"
                        />
                        <FeatureCard
                            title="Inspect Your Products"
                            items={["Triple Inspections", "Professional Quality Inspection", "Stringent Quality System"]}
                            linkText="Learn Quality Control"
                            linkHref="#"
                        />
                        <FeatureCard
                            title="Deliver Your Products"
                            items={["Sufficient Inventory", "Reliable Logistic Partners", "On Time Delivery"]}
                            linkText="Warehouse Tour"
                            linkHref="#"
                        />
                    </div>

                    {/* Right Block: Stats */}
                    <div className="lg:w-1/2 bg-[#022c75] rounded-3xl p-10 md:p-16 text-[#e6e6e6] relative">
                        <div className="max-w-md">
                            <p className="text-sm font-medium mb-4 opacity-90">Rapid, Simple and Reliable</p>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                                Purchasing SMT Product Has Never Been this Easy
                            </h2>
                            <p className="text-sm opacity-90 leading-relaxed mb-12">
                                From sourcing the right products to safe and on-time delivery, Tekmart takes care of purchasing so you can focus on expanding your business.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 border-t border-white/20 pt-10">
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">30+</div>
                                    <div className="text-xs opacity-80">Brands We Support</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">4,301+</div>
                                    <div className="text-xs opacity-80">Products We Cover</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">16+</div>
                                    <div className="text-xs opacity-80">Years We Engage</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">3+</div>
                                    <div className="text-xs opacity-80">Days We Deliver</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">1+</div>
                                    <div className="text-xs opacity-80">MOQ Starts from</div>
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

"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";
import warehouseImage from "../../public/image1 (3).png"

const features = [
    {
        title: "SMT Solution Provider",
        description: "Our professional SMT solutions are tailor-made to satisfy the unique needs of your market and audience.",
    },
    {
        title: "SMT Products Supplier & Wholesaler",
        description: "Cater to a broader market with our series of SMT products, including SMT machines, SMT parts, and SMT lines from reputable brands.",
    },
    {
        title: "SMT Production Line Integrator",
        description: "Customize your cost-effective SMT production line with our SMT machines to raise your systems' efficiency, productivity, and profitability.",
    },
];

const AboutSection = () => {
    return (
        <section className="py-20 bg-[#e6e6e6] overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="lg:max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-6">
                            Meet TekMart, Your Robust SMT Partner
                        </h2>
                        <p className="text-[#022c75]/80 leading-relaxed">
                            Since 2000, TekMart has been a leading supplier of reliable SMT machines and SMT parts in India. Our dedication to providing global electronics manufacturing enterprises with all-in-one PCB assembly equipment solutions has resulted in many successful and long-term partnerships with leading brands worldwide.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <button className="bg-[#022c75] hover:bg-[#0441ac] text-white font-bold py-4 px-10 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                            Explore TekMart
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Video/Image Placeholder */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                        <div className="aspect-video relative bg-gray-200">
                            <Image
                                src={warehouseImage}
                                alt="TekMart Facility"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-[#022c75] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform">
                                    <Play size={32} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature List */}
                    <div className="space-y-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle2 className="text-[#022c75]" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#022c75] mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#022c75]/80 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                    {index < features.length - 1 && (
                                        <div className="mt-8 border-b border-gray-100" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

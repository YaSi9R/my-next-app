"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";
import warehouseImage from "../../public/DEK-Printer-Photoroom.png"
import Link from "next/link";

const features = [
    {
        title: "Equipment Selection & Guidance",
        description: "Practical recommendations based on PCB type, production volume and operational requirements.",
    },
    {
        title: "Refurbished Machines & Critical Spares",
        description: "Quality-tested SMT machines and essential spare parts to support stable manufacturing operations.",
    },
    {
        title: "Complete Line Coordination",
        description: "Support for machine compatibility, board handling integration and structured production line setup.",
    },
];

const AboutSection = () => {
    return (
        <section className="py-20 bg-[#e6e6e6] overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="flex  lg:items-center justify-center gap-8 mb-16">
                    <div className="lg:max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-6">
                            Meet Tekmart India – Your Structured SMT Equipment Partner

                        </h2>
                        <p className="text-[#022c75]/80 leading-relaxed">
                            Tekmart India Exim Pvt. Ltd. supports EMS and OEM manufacturers with refurbished SMT machines, genuine spare parts and complete SMT line solutions. We focus on technically suitable equipment selection, transparent communication and reliable execution across India.
                        </p>
                    </div>
                    
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Video/Image Placeholder */}
                    <div className="relative rounded-2xl overflow-hidden  group cursor-pointer">
                        <div className="aspect-video relative ">
                            <Image
                                src={warehouseImage}
                                alt="TekMart Facility"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            
                        </div>
                    </div>

                    {/* Right: Feature List */}
                    <div className="space-y-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-1">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle2 className="text-[#022c75]" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#022c75] ">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#022c75]/80 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                    {index < features.length - 1 && (
                                        <div className=" border-b border-gray-100" />
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

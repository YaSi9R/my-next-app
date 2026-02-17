"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Zap,
    ShieldCheck,
    Users,
    Globe,
    Award,
    Settings,
    HeartHandshake,
    Cpu,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

// Assets
import heroImage from "@/public/image copy.png";
import qualityImage from "@/public/image1 (2).png";
import serviceImage from "@/public/img01.png";
import AboutSection from "@/components/homepage/AboutSection";

const pillars = [
    {
        title: "Unrivaled Expertise",
        description: "Multi-decade experience in SMT line integration and machine lifecycle management.",
        icon: Award,
    },
    {
        title: "Global Reach",
        description: "Seamless logistics and support network spanning India, Americas, and SE Asia.",
        icon: Globe,
    },
    {
        title: "Technical Mastery",
        description: "Engineers certified in Yamaha, Fuji, Panasonic, and other industry-leading brands.",
        icon: Settings,
    },
    {
        title: "Customer Integrity",
        description: "Transparent sourcing and genuine parts guarantee to ensure your production never stops.",
        icon: HeartHandshake,
    },
];

const benefits = [
    "24/7 Global Technical Support",
    "Tailor-made SMT Solutions",
    "High-Efficiency Production Lines",
    "Competitive Pricing & Genuine Parts",
    "Comprehensive Operator Training",
    "Rapid Spare Parts Logistics"
];

export default function WhyTekmart() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <main className="bg-[#e6e6e6] min-h-screen">
           
            {/* Quality Section */}
         <AboutSection/>
            {/* Why Choose Us Pillars */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold text-[#022c75] uppercase tracking-widest mb-4">Core Differentiators</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-6">Why Manufacturers Choose Us</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#022c75] p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-all border border-gray-100 group"
                            >
                                <div className="w-14 h-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <pillar.icon className="text-[#022c75]" size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-[#e6e6e6] mb-4">{pillar.title}</h4>
                                <p className="text-[#e6e6e6] text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Innovation Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <motion.div
                            {...fadeInUp}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-sm font-bold text-[#022c75] uppercase tracking-widest mb-4">Service Ecosystem</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-8 leading-tight">
                                Beyond Just Machines
                            </h3>
                            <p className="text-lg text-[#022c75]/80 mb-8">
                                Tekmart provides a complete lifecycle support ecosystem. We don't just sell machines; we integrate solutions, train operators, and provide 24/7 technical assistance to ensure peak manufacturing output.
                            </p>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#022c75]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="text-[#022c75]" size={20} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-[#022c75]">Rapid Integration</h5>
                                        <p className="text-sm text-[#022c75]/70">Minimizing downtime with expert SMT line deployment.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#022c75]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Cpu className="text-[#022c75]" size={20} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-[#022c75]">Spare Parts Sovereignty</h5>
                                        <p className="text-sm text-[#022c75]/70">Unmatched inventory of genuine SMT feeders, nozzles, and motors.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <Image
                                src={serviceImage}
                                alt="Support Excellence"
                                className="w-full h-auto rounded-3xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#022c75] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-[#e6e6e6] mb-8 relative z-10">
                            Ready to Partner with Tekmart?
                        </h2>
                        <p className="text-[#e6e6e6] text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                            Experience the reliability and excellence that has made us a trusted global leader in SMT solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <a
                                href="/contact"
                                className="bg-[#e6e6e6] text-[#022c75] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1"
                            >
                                Contact Our Team
                            </a>
                            <a
                                href="/quote"
                                className="bg-transparent border-2 border-[#e6e6e6] text-[#e6e6e6] hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all"
                            >
                                Request a Quote
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

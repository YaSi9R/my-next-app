"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Users,
    Globe,
    Award,
    ShieldCheck,
    Cpu,
    Zap,
    CheckCircle2,
    Truck,
    ArrowRight
} from "lucide-react";

// Assets
import heroImage from "@/public/heroBanner.jpg";
import warehouseImage from "@/public/image1 (1).png";
import machineImage from "@/public/machine.png";

const stats = [
    { label: "Years of Excellence", value: "24+" },
    { label: "Global Clients", value: "500+" },
    { label: "Products in Catalog", value: "1000+" },
    { label: "Support Locations", value: "15+" },
];

const values = [
    {
        title: "Quality Excellence",
        description: "We never compromise on the quality of our SMT equipment and parts, ensuring long-term reliability for our partners.",
        icon: ShieldCheck,
    },
    {
        title: "Global Reliability",
        description: "With a presence across continents, Tekmart ensures seamless supply chain and technical support worldwide.",
        icon: Globe,
    },
    {
        title: "Customer Centric",
        description: "Every solution we provide is tailored to meet the specific manufacturing needs of our diverse clientele.",
        icon: Users,
    },
    {
        title: "Innovation Driven",
        description: "Leading the industry with the latest SMT technology and innovative integration solutions.",
        icon: Zap,
    },
];

const locations = [
    "India (HQ)", "Mexico", "Brazil", "USA", "Thailand", "Vietnam", "Malaysia"
];

export default function CompanyOverview() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <main className="bg-[#e6e6e6] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt="Tekmart Facility"
                    fill
                    className="object-cover brightness-40"
                    priority
                />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#e6e6e6] mb-6 tracking-tight"
                    >
                        Pioneering <span className="text-[#022c75]">SMT Excellence</span> Since 2000
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-[#e6e6e6] max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Tekmart is a global leader in providing consolidated SMT manufacturing solutions, bridging the gap between quality equipment and efficient production lines.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <a
                            href="#story"
                            className="bg-[#022c75] hover:bg-[#033a95] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2 group"
                        >
                            Learn Our Story
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#e6e6e6] py-12 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-extrabold text-[#022c75] mb-2">{stat.value}</div>
                                <div className="text-sm md:text-base text-[#022c75] font-semibold uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section id="story" className="py-24 overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            {...fadeInUp}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-sm font-bold text-[#022c75] uppercase tracking-widest mb-4">Our Journey</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-8 leading-tight">
                                A Legacy of Trust and Technological Precision
                            </h3>
                            <div className="space-y-6 text-[#022c75] leading-relaxed text-lg">
                                <p>
                                    Founded in the year 2000, Tekmart began with a vision to revolutionize the electronics manufacturing industry by providing high-quality, reliable SMT (Surface Mount Technology) solutions. What started as a focused operation in India has now expanded into a global powerhouse.
                                </p>
                                <p>
                                    Today, we are recognized as a premier partner for electronics manufacturers worldwide, offering everything from standalone SMT machines to fully integrated turnkey production lines. Our expertise spans across top-tier brands like Yamaha, Fuji, Panasonic, and ASM.
                                </p>
                                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Global Distribution Network</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">24/7 Technical Support</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Genuine Spare Parts</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Certified Engineers</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-20">
                                <Image
                                    src={warehouseImage}
                                    alt="Tekmart Warehouse"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#022c75]/5 rounded-full -z-10 blur-3xl" />
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full -z-10 blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-[#022c75] text-[#e6e6e6]">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold text-[#e6e6e6] uppercase tracking-widest mb-4">Why We Lead</h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#e6e6e6]">Our Foundational Values</h3>
                        <p className="text-[#e6e6e6] text-lg">
                            Our culture is built on a commitment to excellence, integrity, and a deep understanding of our customers' manufacturing challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#e6e6e6] backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-400 transition-all group"
                            >
                                <div className="w-14 h-14 bg-[#022c75] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <value.icon className="text-[#e6e6e6] " size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-[#022c75] mb-4">{value.title}</h4>
                                <p className="text-[#022c75] leading-relaxed text-sm">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Presence Section */}
            <section className="py-24 bg-[#e6e6e6]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <motion.div
                            {...fadeInUp}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-sm font-bold text-[#022c75] uppercase tracking-widest mb-4">Global Reach</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-8 leading-tight">
                                Supporting Electronics Manufacturing Worldwide
                            </h3>
                            <p className="text-[#022c75] leading-relaxed text-lg mb-8">
                                Tekmart has strategically placed offices and logistic centers across the globe to ensure that our clients receive support wherever they are located. From North America to Southeast Asia, we bridge the gap in SMT solutions.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {locations.map((loc) => (
                                    <span key={loc} className="px-5 py-2 bg-[#022c75] rounded-full border border-gray-200 text-[#e6e6e6] font-bold shadow-sm text-sm">
                                        {loc}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <Image
                                src={machineImage}
                                alt="Global Operations"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#022c75] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <h2 className="text-3xl md:text-5xl font-bold text-[#e6e6e6] mb-8 relative z-10">
                            Ready to Enhance Your Production?
                        </h2>
                        <p className="text-[#e6e6e6] text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                            Join hundreds of manufacturers who trust Tekmart for their SMT needs. Let's discuss how we can help your business grow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <a
                                href="/contact"
                                className="bg-[#e6e6e6] text-[#022c75] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1"
                            >
                                Contact Our Experts
                            </a>
                            <a
                                href="/smt-machines"
                                className="bg-transparent border-2 border-[#e6e6e6] text-[#e6e6e6] hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all"
                            >
                                Explore Products
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

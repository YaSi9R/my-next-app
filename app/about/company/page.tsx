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
import warehouseImage from "@/public/J-Photoroom.png";
import machineImage from "@/public/Products_450x350px-03-Photoroom.png";

const stats = [
    { label: "Refurbished SMT Machines Supplied Across India", value: "150+" },
    { label: "Active EMS & OEM Manufacturing Customers", value: "100+" },
    { label: "SMT Spare Parts & Critical Components Accessible", value: "5000+" },
    { label: "Leading SMT Equipment Brands Supported", value: "10+" },
    { label: "Combined Industry Experience in SMT Solutions", value: "20+ years" },
    
];

const values = [
    {
        title: "Quality-Focused Equipment Selection",
        description: "We prioritize technically suitable refurbished SMT machines and genuine spare parts to ensure stable and reliable manufacturing operations.",
        icon: ShieldCheck,
    },
    {
        title: "Reliable Pan-India Supply",
        description: "Structured procurement and coordinated logistics ensure timely equipment and spare parts delivery across India.",
        icon: Globe,
    },
    {
        title: "Customer-Specific Solutions",
        description: "Machine recommendations and line configurations are guided by PCB type, production volume and operational requirements.",
        icon: Users,
    },
    {
        title: "Practical Industry Experience",
        description: "Hands-on exposure to SMT production environments enables us to support installation, maintenance and line integration effectively.",
        icon: Zap,
    },
];

const locations = [
    "Pan-India Equipment Delivery", "On-Site Installation & Maintenance Support ", "Structured Spare Parts Dispatch", "Technical Coordination Across Production Facilities", " Serving EMS & OEM Manufacturers Nationwide",
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
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#022c75] mb-6 tracking-tight"
                    >
                        Proven Experience in SMT Machines & Spare Parts Supply Across India

                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-[#022c75] max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Tekmart India Exim Pvt. Ltd. supports EMS and OEM manufacturers with refurbished SMT machines, genuine spare parts and complete production line solutions. Our measurable experience reflects structured execution and long-term manufacturing support across India.

                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <a
                            href="/about/why-tekmart"
                            className="bg-[#022c75] hover:bg-[#033a95] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2 group"
                        >
                            Learn Our Story
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#e6e6e6] py-12 border-b border-gray-200 max-w-7xl mx-auto ">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 justify-center [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
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
                                    Tekmart India Exim Pvt. Ltd. was established with a clear objective — to support the electronics manufacturing industry with reliable refurbished SMT machines, genuine spare parts and structured production line solutions.
                                </p>
                                <p>
                                   Over the years, we have supported EMS and OEM manufacturers across India by delivering technically suitable equipment, practical procurement coordination and dependable on-site installation support.

                                </p>
                                <p>From supplying individual Pick & Place machines and Reflow Ovens to assisting with complete SMT production line requirements, our growth has been driven by operational understanding, transparent execution and long-term customer relationships.
</p>
<p>Our experience spans leading SMT equipment brands including Yamaha, Fuji, Panasonic and other major industry manufacturers.
</p>
                                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Pan-India Supply of Refurbished SMT Machines
</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Genuine & Compatible SMT Spare Parts Support
</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">On-Site Installation & Maintenance Assistance
</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-[#022c75] flex-shrink-0" size={24} />
                                        <span className="font-semibold text-[#022c75]">Practical Experience in SMT Line Coordination</span>
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
                            <div className="relative rounded-3xl overflow-hidden  z-20">
                                <Image
                                    src={warehouseImage}
                                    alt="Tekmart Warehouse"
                                    className="w-full h-auto object-cover p-8"
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
                        <h2 className="text-sm font-bold text-[#e6e6e6] uppercase tracking-widest mb-4">WHY MANUFACTURERS TRUST TEKMART INDIA
</h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#e6e6e6]">Built on Technical Understanding & Structured Execution
</h3>
                        <p className="text-[#e6e6e6] text-lg">
                           Our approach is rooted in practical industry experience, transparent coordination and long-term manufacturing support for EMS and OEM companies across India.
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
                            <h2 className="text-sm font-bold text-[#022c75] uppercase tracking-widest mb-4">NATIONAL PRESENCE</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-8 leading-tight">
                                Supporting SMT Manufacturing Operations Across India
                            </h3>
                            <p className="text-[#022c75] leading-relaxed text-lg mb-8">
                               Tekmart India provides structured supply of refurbished SMT machines, genuine spare parts and coordinated on-site support to EMS and OEM manufacturers throughout India.

                            </p>
                            <p className="text-[#022c75] leading-relaxed text-lg mb-8">With organized logistics and technical assistance, we ensure reliable execution wherever your production facility operates.</p>
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
                            Strengthen Your SMT Production with the Right Equipment & Support

                        </h2>
                        <p className="text-[#e6e6e6] text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                            Partner with Tekmart India for refurbished SMT machines, genuine spare parts and structured production line solutions. Let’s align your manufacturing requirements with technically suitable and commercially balanced solutions.

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

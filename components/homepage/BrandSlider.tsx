"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import yamahalogo from "../../public/hd-yamaha-motor-logo-transparent-background-701751694771525iicfmgap8a-Photoroom.png";
import fuji from "../../public/images-Photoroom.png";
import goldland from "../../public/logo_heller_optimizada (1)-Photoroom.png";
import panasonic from "../../public/logo-omron-healthcare-co-ltd-brand-microscan-systems-inc-business-Photoroom.png";
import asm from "../../public/logo_sticky-Photoroom.png";
import asmReal from "../../public/asm-pacific-technology-limited-asm-assembly-systems-llc-asm-international-electronics-technology-Photoroom.png";
import kohyoung from "../../public/circle-design-logo-koh-young-organization-koh-young-technology-angle-text-green-png-clipart-Photoroom.png";
import hanwa from "../../public/png-transparent-juki-hd-logo-Photoroom.png";
import juki from "../../public/png-transparent-hanwha-hd-logo-Photoroom.png";
const brands = [
    { name: "Goldland", logo: goldland },
    { name: "FUJI", logo: fuji },
    { name: "Panasonic", logo: panasonic },
    { name: "ASM", logo: asm },
    { name: "YAMAHA", logo: yamahalogo },

{name:"juki",logo:juki},
     { name: "ASM", logo: asmReal },
    { name: "YAMAHA", logo: kohyoung },
    {name:"hanwa",logo:hanwa}
];

const BrandSlider = () => {
   
    const duplicatedBrands = [...brands, ...brands, ...brands];
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % brands.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-[#e6e6e6] overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-[#022c75] mb-16">
                    Global SMT Brands We Support
                </h2>

                <div className="relative group px-12">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex items-center"
                            animate={{
                                x: `-${currentIndex * (100 / 5)}%`,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            {[...brands, ...brands].map((brand, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-1/2 md:w-1/5 flex items-center justify-center p-4 grayscale-0 transition-all duration-300"
                                >
                                    <div className="relative w-full aspect-[2/1] max-w-[140px]">
                                        <Image
                                            src={brand.logo}
                                            alt={brand.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-[#e6e6e6] hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-[#e6e6e6] hover:text-white transition-colors cursor-pointer"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

               
            </div>
        </section>
    );
};

export default BrandSlider;

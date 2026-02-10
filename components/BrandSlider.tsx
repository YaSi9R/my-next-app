"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import yamahalogo from "../public/yamaha.jpg";
import fuji from "../public/fuji.png";
import goldland from "../public/goldland.png";
import panasonic from "../public/panasonic.jpg";
import asm from "../public/asm.png";

const brands = [
    { name: "Goldland", logo: goldland },
    { name: "FUJI", logo: fuji },
    { name: "Panasonic", logo: panasonic },
    { name: "ASM", logo: asm },
    { name: "YAMAHA", logo: yamahalogo },
];

const BrandSlider = () => {
    // Triple the brands array to ensure enough content for seamless loop
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
                    Brands We Support, But Are Not Limited to
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

                <div className="mt-16 flex justify-center cursor-pointer">
                    <button className="bg-[#022c75] hover:bg-[#0441ac] text-white font-semibold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                        Explore More Brands
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BrandSlider;

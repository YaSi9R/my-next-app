"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import imae from "../public/image.png";

const machines = [
    { id: 1, name: "SMT Reflow Oven", image: imae },
    { id: 2, name: "Solder Paste Inspection & Automated Optical Inspection Machine", image: imae },
    { id: 3, name: "X-ray Machine", image: imae },
    { id: 4, name: "PCB Conveyor", image: imae },
    { id: 5, name: "Pick and Place Machine", image: imae },
    { id: 6, name: "Stencil Printer", image: imae },
];

const MachineSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalMachines = machines.length;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalMachines);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalMachines) % totalMachines);
    };

    // Auto-run slider
    useEffect(() => {
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 bg-[#e6e6e6] overflow-hidden relative group">
            <div className="container mx-auto px-4">
                <div className="relative">
                    {/* Slider Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                        >
                            {/* Duplicate items for a pseudo-infinite loop effect */}
                            {[...machines, ...machines].map((machine, index) => (
                                <div
                                    key={`${machine.id}-${index}`}
                                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] flex-shrink-0"
                                >
                                    <div className="bg-[#e6e6e6] rounded-lg p-2 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100 cursor-pointer">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                                            <Image
                                                src={machine.image}
                                                alt={machine.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-center font-bold text-gray-800 line-clamp-2 min-h-[3.5rem] px-2 text-sm md:text-base">
                                            {machine.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-[#022c75] shadow-lg text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-[#022c75] shadow-lg text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="mt-8 flex justify-center gap-2">
                    {machines.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? "bg-[#022c75] w-6" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MachineSlider;

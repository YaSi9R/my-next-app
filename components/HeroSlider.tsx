"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import image1 from "@/public/image1 (1).png";
import image2 from "@/public/image1 (2).png";
import image3 from "@/public/image1 (3).png";

const slides = [
    {
        id: 1,

        subtitle: "Your Reliable Dearest Partner",
        image: image1,
    },
    {
        id: 2,

        subtitle: "Precision and Speed Reimagined",
        image: image2,
    },
    {
        id: 3,

        subtitle: "Optimizing Your Production Efficiency",
        image: image3,
    },
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            {/* Static Teal Overlay - Reduced opacity for clarity */}
            <div className="absolute inset-0 z-10 bg-[#4fd1c5]/20 backdrop-blur-[1px]"></div>
            {/* Background Decorative Pattern (Waves/Circles) */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="500" cy="500" r="100" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="500" cy="500" r="200" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="500" cy="500" r="300" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="500" cy="500" r="400" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="500" cy="500" r="500" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="500" cy="500" r="600" fill="none" stroke="white" strokeWidth="2" />
                </svg>
            </div>

            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", duration: 1, ease: "easeInOut" },
                        opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slides[current].image}
                            alt="Background SMT"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Static Teal Overlay and Content - Reduced opacity for clarity */}
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                <div className="w-full max-w-5xl flex flex-col items-center">

                    <motion.h1
                        initial={{ y: 30, opacity: 0.4 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="
        text-white
        font-bold
        drop-shadow-xl
        tracking-tight
        text-center
        text-[clamp(1.75rem,5vw,4.5rem)]
        leading-tight
        whitespace-normal
        md:whitespace-nowrap
      "
                    >
                        We bring you impactful SMT solution
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="bg-black/45 backdrop-blur-md rounded-2xl px-6 py-10 md:px-12 md:py-14 text-center max-w-5xl 
        mt-6
        text-white/90
        text-base
        md:text-lg
        leading-relaxed
        max-w-3xl
        drop-shadow-md
      "
                    >
                        Providing the global market with practical and comprehensive SMT solutions is what Tekmart is all about.
                        As a supplier of SMT machines and SMT parts, we have ensured unparalleled satisfaction since 2006.
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer bg-[#022c75]
        mt-10
        inline-flex items-center justify-center
        rounded-full
        bg-primary
        hover:bg-primary/90
        px-10
        py-4
        text-base
        md:text-lg
        font-semibold
        tracking-wide
        text-white
        shadow-2xl
        transition-all
      "
                    >
                        Get instant quote
                    </motion.button>

                </div>
            </div>


            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
                <ChevronLeft size={48} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
                <ChevronRight size={48} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > current ? 1 : -1);
                            setCurrent(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>



        </section>
    );
};

export default HeroSlider;

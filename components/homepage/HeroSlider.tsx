"use client";

import { CheckCircle2, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import machine from "../../public/image copy1.png";
import machine2 from "../../public/image_copy3-.png";

const images = [
  { src: machine, alt: "SMT & PCB Manufacturing Equipment 1" },
  { src: machine2, alt: "SMT & PCB Manufacturing Equipment 2" },
];

export function HeroSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#e6e6e6] pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-3">



            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#022c75] leading-tight tracking-tight"
              >
                Your Trusted Partner for SMT & PCB <br /> <span className="text-[#022c75] text-3xl">Manufacturing Solutions</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-md md:text-md text-[#022c75] leading-relaxed max-w-xl"
              >
                We specialize in supplying used and refurbished SMT machines, new spare parts, and board handling equipment with comprehensive after-sales support for EMS and OEM manufacturers across India.
              </motion.p>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-1 "
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Build & Expand Production Lines</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Complete Equipment & Parts Solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Technical Expertise & Dependable Support</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-2 "
            >
              {/* Primary button */}
              <Link
                href="/quote"
                className="bg-[#022c75] hover:bg-[#033a95]
               text-white font-bold
               px-8 py-4
               rounded-xl shadow-lg hover:shadow-2xl
               transition-all flex items-center gap-3 group"
              >
                Request Free Quote
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>

              {/* Secondary button */}
              <Link
                href="/smt-line"
                className="bg-[#022c75] hover:bg-[#022c75]/85
               text-[#e6e6e6]
               border border-[#022c75]/40
               font-bold px-8 py-4
               rounded-lg transition-all"
              >
                View Solutions
              </Link>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#022c75] text-sm font-medium pt-4"
            >
              ✓ No hidden costs  •  ✓ Free consultation  •  ✓ Instant quote
            </motion.div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full h-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[currentImage].src}
                      alt={images[currentImage].alt}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage ? "bg-[#022c75] w-6" : "bg-[#022c75]/30 hover:bg-[#022c75]/50"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section >
  )
}

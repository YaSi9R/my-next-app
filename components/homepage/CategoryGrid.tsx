"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Placeholder images from the public directory
import machine1 from "../../public/image.png";
import machine2 from "../../public/image copy.png";
import machine3 from "../../public/image copy1.png";
import machine4 from "../../public/image copy2.png";
import machine5 from "../../public/image1 (1).png";
import machine6 from "../../public/image1 (2).png";
import machine7 from "../../public/machine.png";
import machine8 from "../../public/heroBanner.jpg";

const categories = [
    {
        title: "Pick & Place",
        image: machine1,
        href: "/smt-machines/pick-and-place",
    },
    {
        title: "Feeders",
        image: machine2,
        href: "/smt-parts/yamaha", // Pointing to Yamaha parts hub for now
    },
    {
        title: "Inspection - AOI/SPI",
        image: machine3,
        href: "/smt-machines", // General machines page
    },
    {
        title: "Screen Printer",
        image: machine4,
        href: "/smt-machines",
    },
    {
        title: "Oven",
        image: machine5,
        href: "/smt-machines/reflow-ovens",
    },
    {
        title: "Soldering Systems",
        image: machine6,
        href: "/smt-machines",
    },
    {
        title: "PTH / Auto Insertion",
        image: machine7,
        href: "/smt-machines",
    },
    {
        title: "Board Handling",
        image: machine8,
        href: "/smt-machines",
    },
];

export default function CategoryGrid() {
    return (
        <section className="py-16 bg-[#e6e6e6] max-w-7xl mx-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group relative overflow-hidden rounded-xl bg-white shadow-md aspect-[4/3] block"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                            </div>

                            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                                <div className="flex items-center justify-between transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                                    <h3 className="text-xl font-bold text-white leading-tight">
                                        {category.title}
                                    </h3>
                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Hover highlight border */}
                            <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-[#022c75]/30 rounded-xl" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

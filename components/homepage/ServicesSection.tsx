import React from "react";
import { Recycle, Package, Monitor, Wrench } from "lucide-react";
import Image from "next/image";
import image1 from "../../public/6644392c5763832305-Photoroom.png"
import image2 from "../../public/H24S-Photoroom.png"
import image3 from "../../public/3.png"
import image4 from "../../public/4.png"

const services = [
    {
        image:image1,
        title: "Feeders & Feeder Components",
        description: "Original and compatible feeders along with critical feeder parts to maintain accurate component placement and stable production flow.",
    },
    {
        image:image2,
        title: "Nozzles & Placement Heads",
        description: "Precision nozzles and head assemblies designed for performance consistency across major SMT machine brands.",
    },
    {
        image:image3,
        title: "Motors, Boards & Motion Components",
        description: "Servo motors, driver boards and electronic control components that support reliable machine operation.",
    },
    {
        image:image4,
        title: "Critical Replacement Parts Availability",
        description: "Access to essential SMT components with structured sourcing support to reduce unexpected downtime risks.",
    },
];

const ServicesSection = () => {
    return (
        <section className="pt-20 bg-[#e6e6e6]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                        Reliable SMT Spare Parts Supply for Continuous Production

                    </h2>
                    <p className="text-[#022c75]/80 max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                        Production downtime often begins with unavailable spare parts. Tekmart India supports manufacturers with structured access to critical SMT feeders, nozzles, motors and electronic components to ensure operational continuity across India.

                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-16">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-2  rounded-2xl  group-hover:bg-[#022c75]/10 transition-colors duration-300">
                                <Image src={service.image} alt={service.title} width={200} height={200} />
                            </div>
                            <h3 className="text-xl font-bold text-[#022c75] mb-2 leading-tight min-h-[3.5rem] flex items-center justify-center">
                                {service.title}
                            </h3>
                            <p className="text-[#022c75]/80 text-sm leading-relaxed px-2">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                
            </div>
        </section>
    );
};

export default ServicesSection;

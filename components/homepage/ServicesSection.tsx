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
        title: "Used SMT Machine & Parts Reclaiming",
        description: "Make more room on your inventory and your budget as we purchase your surplus SMT machines and parts.",
    },
    {
        image:image2,
        title: "Drop Shipping Service",
        description: "Enjoy fast purchasing with guaranteed safe and quick deliveries with our partner logistics companies bringing your products directly to your doorstep.",
    },
    {
        image:image3,
        title: "Machine Maintenance",
        description: "You can rest assured about after-sales problems as we offer preventive maintenance services on the SMT machines upon request.",
    },
    {
        image:image4,
        title: "Technical Support",
        description: "Equipped with expert technicians with robust product experience, our support team is ready to tackle your equipment concerns.",
    },
];

const ServicesSection = () => {
    return (
        <section className="pt-20 bg-[#e6e6e6]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                        Unparalleled Services Get You all Covered
                    </h2>
                    <p className="text-[#022c75]/80 max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                        More than a source for premium SMT machines and parts, TekMart offers a scope of services that brings more value to your brand.
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

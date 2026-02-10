import React from "react";
import { Recycle, Package, Monitor, Wrench } from "lucide-react";

const services = [
    {
        icon: <Recycle className="w-16 h-16 text-[#022c75]" />,
        title: "Used SMT Machine & Parts Reclaiming",
        description: "Make more room on your inventory and your budget as we purchase your surplus SMT machines and parts.",
    },
    {
        icon: <Package className="w-16 h-16 text-[#022c75]" />,
        title: "Drop Shipping Service",
        description: "Enjoy fast purchasing with guaranteed safe and quick deliveries with our partner logistics companies bringing your products directly to your doorstep.",
    },
    {
        icon: <Monitor className="w-16 h-16 text-[#022c75]" />,
        title: "Machine Maintenance",
        description: "You can rest assured about after-sales problems as we offer preventive maintenance services on the SMT machines upon request.",
    },
    {
        icon: <Wrench className="w-16 h-16 text-[#022c75]" />,
        title: "Technical Support",
        description: "Equipped with expert technicians with robust product experience, our support team is ready to tackle your equipment concerns.",
    },
];

const ServicesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                        Unparalleled Services Get You all Covered
                    </h2>
                    <p className="text-gray-600 max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
                        More than a source for premium SMT machines and parts, TekMart offers a scope of services that brings more value to your brand.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-4 rounded-2xl bg-gray-50 group-hover:bg-teal-50 transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#022c75] mb-4 leading-tight min-h-[3.5rem] flex items-center justify-center">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-2">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="bg-[#022c75] hover:bg-[#0441ac] text-white font-semibold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                        Explore Our Services
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

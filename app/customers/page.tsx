import React from 'react';
import Image from 'next/image';
import customers from "../../public/customers_logo.png";
// Placeholder logo data
const clients = [
    { id: 1, name: 'Client 1', logo: '/client-logos/logo1.svg' },
    { id: 2, name: 'Client 2', logo: '/client-logos/logo2.svg' },
    { id: 3, name: 'Client 3', logo: '/client-logos/logo3.svg' },
    { id: 4, name: 'Client 4', logo: '/client-logos/logo4.svg' },
    { id: 5, name: 'Client 5', logo: '/client-logos/logo5.svg' },
    { id: 6, name: 'Client 6', logo: '/client-logos/logo1.svg' }, // Reusing for demo
    { id: 7, name: 'Client 7', logo: '/client-logos/logo2.svg' }, // Reusing for demo
    { id: 8, name: 'Client 8', logo: '/client-logos/logo3.svg' }, // Reusing for demo
    { id: 9, name: 'Client 9', logo: '/client-logos/logo4.svg' }, // Reusing for demo
    { id: 10, name: 'Client 10', logo: '/client-logos/logo5.svg' }, // Reusing for demo
     { id: 11, name: 'Client 11', logo: '/client-logos/logo1.svg' }, // Reusing for demo
    { id: 12, name: 'Client 12', logo: '/client-logos/logo2.svg' }, // Reusing for demo
    { id: 13, name: 'Client 13', logo: '/client-logos/logo3.svg' }, // Reusing for demo
    { id: 14, name: 'Client 14', logo: '/client-logos/logo4.svg' }, // Reusing for demo
    { id: 15, name: 'Client 15', logo: '/client-logos/logo5.svg' }, 
];

export default function CustomersPage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* 1. Hero Section */}
            <section className="bg-[#e6e6e6] py-6 md:py-10">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#022c75] mb-6 tracking-tight">
                        Trusted by EMS & OEM Manufacturers Across India
                    </h1>
                    <p className="text-lg md:text-xl text-[#022c75] leading-relaxed max-w-3xl mx-auto">
                       Tekmart delivers refurbished SMT machines, genuine spare parts and complete SMT production line solutions with structured technical support to manufacturers nationwide.
                    </p>
                </div>
            </section>

           
            <section className="py-20 bg-[#e6e6e6]">
                <div className=" flex container mx-auto px-4 max-w-7xl justify-center items-center">
                    <Image src={customers} alt="customers" width={1000} height={1000} />
                </div>
            </section>

           
        </div>
    );
}

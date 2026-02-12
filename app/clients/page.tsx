import React from 'react';
import Link from 'next/link';
import { Building2, Factory } from 'lucide-react';

export default function ClientsPage() {
    
    const clients = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Client ${i + 1}`,
        category: i % 2 === 0 ? 'EMS' : 'OEM',
    }));

    const emsClients = clients.filter((c) => c.category === 'EMS');
    const oemClients = clients.filter((c) => c.category === 'OEM');

    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
               
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Clients
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Trusted by leading EMS & OEM manufacturers across India
                    </p>
                </div>

                
                <div id="ems" className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Factory className="w-8 h-8 text-[#e6e6e6]" />
                        <h2 className="text-3xl font-bold text-gray-900">EMS Manufacturers</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {emsClients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center aspect-square"
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <Building2 className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-500">Logo Placeholder</p>
                                    <p className="text-xs text-gray-400 mt-1">{client.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div id="oem" className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Building2 className="w-8 h-8 text-[#e6e6e6]" />
                        <h2 className="text-3xl font-bold text-gray-900">OEM Manufacturers</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {oemClients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center aspect-square"
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <Factory className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-500">Logo Placeholder</p>
                                    <p className="text-xs text-gray-400 mt-1">{client.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div id="logos" className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        All Client Logos
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="aspect-square bg-gray-100 rounded-lg p-4 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <p className="text-xs text-gray-400">{client.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">
                            Replace placeholder icons with actual client logos (PNG/SVG format recommended)
                        </p>
                        <p className="text-sm text-gray-500">
                            Recommended logo size: 200x200px minimum, transparent background
                        </p>
                    </div>
                </div>

               
                <div className="mt-16 bg-[#e6e6e6] rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Join Our Growing Client Base</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Partner with Tekmart for your SMT equipment and production line needs
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-[#e6e6e6] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                        Become a Client
                    </Link>
                </div>
            </div>
        </div>
    );
}

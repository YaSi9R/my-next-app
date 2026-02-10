import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Globe, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
                <p className="text-xl text-gray-600 text-center mb-12">
                    Get in touch with our team - We're here to help with all your SMT equipment needs
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Phone */}
                    <div id="phone" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Phone className="w-8 h-8 text-[#022c75]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                        <p className="text-gray-600 mb-3">Call us for immediate assistance</p>
                        <a href="tel:+911234567890" className="text-[#022c75] font-semibold hover:underline">
                            +91 123 456 7890
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Mon-Sat: 9:00 AM - 6:00 PM IST</p>
                    </div>

                    {/* Email */}
                    <div id="email" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-[#022c75]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-600 mb-3">Send us your inquiries</p>
                        <a href="mailto:sales@tekmart.com" className="text-[#022c75] font-semibold hover:underline block mb-1">
                            sales@tekmart.com
                        </a>
                        <a href="mailto:support@tekmart.com" className="text-[#022c75] font-semibold hover:underline block">
                            support@tekmart.com
                        </a>
                    </div>

                    {/* Website */}
                    <div id="website" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <Globe className="w-8 h-8 text-[#022c75]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Website</h3>
                        <p className="text-gray-600 mb-3">Visit our online catalog</p>
                        <a href="https://www.tekmart.com" className="text-[#022c75] font-semibold hover:underline">
                            www.tekmart.com
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Browse products 24/7</p>
                    </div>

                    {/* Location */}
                    <div id="location" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="w-8 h-8 text-[#022c75]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                        <p className="text-gray-600 mb-3">Visit our office</p>
                        <p className="text-gray-700">
                            Tekmart India<br />
                            [Full Address]<br />
                            [City, State - PIN]<br />
                            India
                        </p>
                        <button className="mt-3 text-[#022c75] font-semibold hover:underline text-sm">
                            Get Directions →
                        </button>
                    </div>

                    {/* WhatsApp */}
                    <div id="whatsapp" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                        <p className="text-gray-600 mb-3">Chat with us instantly</p>
                        <a
                            href="https://wa.me/911234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                        >
                            Start Chat
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Quick response guaranteed</p>
                    </div>

                    {/* WeChat */}
                    <div id="wechat" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8 text-[#022c75]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">WeChat</h3>
                        <p className="text-gray-600 mb-3">Connect on WeChat</p>
                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <div className="w-24 h-24 bg-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                                <MessageSquare className="w-12 h-12 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-600">QR Code Placeholder</p>
                            <p className="text-xs text-gray-500 mt-1">Scan to add us</p>
                        </div>
                        <p className="text-sm text-gray-700 mt-2 font-semibold">ID: Tekmart_India</p>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Send Us a Message</h2>
                    <p className="text-gray-600 text-center mb-8">
                        Fill out the form below and our team will get back to you within 24 hours
                    </p>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-gray-600 text-center mb-6">
                            Contact form will be implemented here based on client requirements
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/quote"
                                className="inline-block bg-[#022c75] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#033a95] transition"
                            >
                                Request a Quote
                            </Link>
                            <a
                                href="mailto:sales@tekmart.com"
                                className="inline-block border-2 border-[#022c75] text-[#022c75] px-8 py-3 rounded-full font-semibold hover:bg-[#022c75] hover:text-white transition"
                            >
                                Email Us Directly
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h2>
                    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">Google Maps Embed Placeholder</p>
                            <p className="text-sm text-gray-500 mt-2">Add Google Maps iframe or embed code here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

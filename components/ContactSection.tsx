"use client";

import React from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
    return (
        <div className="w-full bg-[#e6e6e6]">
            {/* CTA Banner */}
            <section className="bg-[#022c75] py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="text-white text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Boost Your Business with TekMart?
                            </h2>
                            <p className="text-white/90 text-lg">
                                Let TekMart's expertise and experience propel your brand to greater heights. Book a consultation today to find out how.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 bg-[#e6e6e6]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                            Contact Us
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Have questions or need a custom solution? Reach out to us and our team of experts will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#38b2ac]">
                                    <MapPin size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#022c75] mb-1">Our Location</h4>
                                    <p className="text-gray-600 text-sm">Industrial Zone A, New Delhi, India</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#38b2ac]">
                                    <Phone size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#022c75] mb-1">Call Us</h4>
                                    <p className="text-gray-600 text-sm">+86 755 1234 5678</p>
                                    <p className="text-gray-600 text-sm">Mon-Fri: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#38b2ac]">
                                    <Mail size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#022c75] mb-1">Email Us</h4>
                                    <p className="text-gray-600 text-sm">sales@tekmart.com</p>
                                    <p className="text-gray-600 text-sm">support@tekmart.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-50">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-6  text-black  py-4 rounded-xl border border-gray-200 focus:border-[#38b2ac] focus:ring-2 focus:ring-[#38b2ac]/20 transition-all outline-none bg-gray-50 overflow-hidden"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4  text-black  rounded-xl border border-gray-200 focus:border-[#38b2ac] focus:ring-2 focus:ring-[#38b2ac]/20 transition-all outline-none bg-gray-50 overflow-hidden"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                                        <select className="w-full  text-black  px-6 py-4 rounded-xl border border-gray-200 focus:border-[#38b2ac] focus:ring-2 focus:ring-[#38b2ac]/20 transition-all outline-none bg-gray-50 appearance-none overflow-hidden">
                                            <option>General Inquiry</option>
                                            <option>Product Sourcing</option>
                                            <option>Technical Support</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full  text-black  px-6 py-4 rounded-xl border border-gray-200 focus:border-[#38b2ac] focus:ring-2 focus:ring-[#38b2ac]/20 transition-all outline-none bg-gray-50 resize-none overflow-hidden"
                                    ></textarea>
                                </div>

                                <button className="w-full bg-[#022c75] hover:bg-[#0441ac] text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1">
                                    <Send size={20} />
                                    Send Your Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactSection;

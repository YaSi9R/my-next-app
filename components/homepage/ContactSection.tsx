"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import image1 from "../../public/image1 (3).png";
import { h2 } from "framer-motion/client";

const ContactSection = () => {
    return (
        <div className="w-full bg-[#e6e6e6]">
            {/* CTA Banner */}
            <section className="bg-[#e6e6e6] py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="text-[#022c75] text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Boost Your Business with TekMart?
                            </h2>
                            <p className="text-[#022c75]/80 text-lg">
                                Let TekMart's expertise and experience propel your brand to greater heights. Book a consultation today to find out how.
                            </p>
                        </div>
                    </div>

                </div>

            </section>
            <div className="h-[80px] bg-[#022c75]"></div>

            {/* Contact Form Section with Stuck Background */}
            <section className="relative py-24 min-h-screen flex items-center overflow-hidden" style={{ clipPath: 'inset(0)' }}>
                {/* Fixed Background Container */}



                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                            Contact Us
                        </h2>
                        <p className="text-[#022c75] max-w-2xl mx-auto">
                            Have questions or need a custom solution? Reach out to us and our team of experts will get back to you within 24 hours.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-[#022c75] backdrop-blur-md p-8 rounded-2xl shadow-sm border border-[#e6e6e6]/20 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6e6e6] flex items-center justify-center flex-shrink-0">
                                    <MapPin size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#e6e6e6] mb-1">Our Location</h4>
                                    <p className="text-[#e6e6e6] text-sm">Industrial Zone A, New Delhi, India</p>
                                </div>
                            </div>
                            <div className="bg-[#022c75] backdrop-blur-md p-8 rounded-2xl shadow-sm border border-[#e6e6e6]/20 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6e6e6] flex items-center justify-center flex-shrink-0">
                                    <Phone size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#e6e6e6] mb-1">Call Us</h4>
                                    <p className="text-[#e6e6e6] text-sm">+91 1234 567 890</p>
                                    <p className="text-[#e6e6e6] text-sm">Mon-Fri: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                            <div className="bg-[#022c75] backdrop-blur-md p-8 rounded-2xl shadow-sm border border-[#e6e6e6]/20 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e6e6e6] flex items-center justify-center flex-shrink-0">
                                    <Mail size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#e6e6e6] mb-1">Email Us</h4>
                                    <p className="text-[#e6e6e6] text-sm">sales@tekmart.com</p>
                                    <p className="text-[#e6e6e6] text-sm">support@tekmart.com</p>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <div className="lg:col-span-2 bg-[#e6e6e6] p-8 md:p-12 rounded-3xl shadow-2xl border border-[#022c75]">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#022c75] ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-6 text-[#022c75] py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#022c75] ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4 text-[#022c75] rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#022c75] ml-1">Subject</label>
                                        <select className="w-full text-[#022c75] px-6 py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20 appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Product Sourcing</option>
                                            <option>Technical Support</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#022c75] ml-1">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full text-[#022c75] px-6 py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20 resize-none"
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
            <div className="h-[80px] bg-[#022c75]"></div>
        </div>
    );
};

export default ContactSection;

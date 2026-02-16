"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "SMT Machines",
        company: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "submitted">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/queries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    interest: formData.interest,
                    message: formData.message,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit quote request");
            }

            setStatus("submitted");
        } catch (err: any) {
            console.error("Submission error:", err);
            setErrorMessage(err.message || "An error occurred. Please try again.");
            setStatus("error");
        }
    };
    if (status === "submitted") {
        return (
            <div className="min-h-screen bg-[#e6e6e6] flex items-center justify-center px-4">
                <div className="bg-[#022c75] rounded-[40px] p-12 max-w-xl w-full text-center shadow-2xl transition-all animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-[#022c75]" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#e6e6e6] mb-4">Request Received</h1>
                    <p className="text-[#e6e6e6] text-lg mb-12 leading-relaxed">
                        Thank you for your interest. Our technical team has received your request and will provide a detailed quote within 24 hours.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#e6e6e6] text-[#022c75] px-8 py-4 rounded-2xl font-bold  transition-all shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="w-full bg-[#e6e6e6]">

            <section className="relative py-14 min-h-screen flex items-center overflow-hidden" style={{ clipPath: 'inset(0)' }}>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#022c75] mb-4">
                            Request a Quote
                        </h2>
                        <p className="text-[#022c75] max-w-2xl mx-auto">
                            Submit your technical requirements and our specialized engineers will provide a customized solution and formal quote within 24 hours.
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
                            <div className="bg-[#022c75] backdrop-blur-md p-8 rounded-2xl shadow-sm border border-[#e6e6e6]/20 flex items-start gap-4">
                               <div className="w-12 h-12 rounded-full bg-[#e6e6e6] flex items-center justify-center flex-shrink-0">
                                    <MapPin size={24} className="text-[#022c75]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#e6e6e6] mb-1">Refurbishment Centre</h4>
                                    <p className="text-[#e6e6e6] text-sm">Plot No.1405, Dheeraj Nagar Extension Faridabad, Haryana 121013</p>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <div className="lg:col-span-2 bg-[#e6e6e6] p-8 md:p-12 rounded-3xl shadow-2xl border border-[#022c75]">
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#022c75] mb-2">Request Sent Successfully!</h3>
                                    <p className="text-[#022c75]/80 mb-8">
                                        Thank you for contacting us. We will get back to you shortly.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="bg-[#022c75] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#033a95] transition-all"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#022c75] ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-6 text-[#022c75] py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#022c75] ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 text-[#022c75] rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#022c75] ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                className="w-full px-6 text-[#022c75] py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#022c75] ml-1">Company Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Enter company name"
                                                className="w-full px-6 text-[#022c75] py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                            />


                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#022c75] ml-1">Interest Category</label>
                                            <select
                                                name="interest"
                                                value={formData.interest}
                                                onChange={handleChange}
                                                className="w-full px-6 text-[#022c75] py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20"
                                            >
                                                <option>SMT Machines</option>
                                                <option>SMT Parts / Consumables</option>
                                                <option>SMT Production Lines</option>
                                                <option>Board Handling Equipment</option>
                                                <option>Technical Services</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#022c75] ml-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us about your requirements..."
                                            className="w-full text-[#022c75] px-6 py-4 rounded-xl border border-[#022c75] focus:border-[#e6e6e6] focus:ring-2 focus:ring-[#e6e6e6]/20 transition-all outline-none bg-[#022c75]/20 resize-none"
                                        ></textarea>
                                    </div>

                                    {status === "error" && (
                                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                                            <AlertCircle size={16} />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-[#022c75] hover:bg-[#0441ac] disabled:bg-[#022c75]/70 text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Your Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>



                </div>
            </section>
            
        </div>
    );
};

export default ContactSection;

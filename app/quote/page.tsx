"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuotePage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#022c75] flex items-center justify-center px-4">
                <div className="bg-white rounded-[40px] p-12 max-w-xl w-full text-center shadow-2xl transition-all animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Received</h1>
                    <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                        Thank you for your interest. Our technical team has received your request and will provide a detailed quote within 24 hours.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#022c75] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#033a95] transition-all shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#022c75] py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/10">
                    <div className="bg-gray-50 px-12 py-10 border-b border-gray-100 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Request Technical Quote</h1>
                        <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                            Provide your technical requirements below. Our specialized engineers will review your request and provide a comprehensive proposal.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-12 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Company Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter company name"
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Interest Category</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium appearance-none">
                                    <option>SMT Machines</option>
                                    <option>SMT Parts / Consumables</option>
                                    <option>SMT Production Lines</option>
                                    <option>Board Handling Equipment</option>
                                    <option>Technical Services</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Technical Requirements / Message</label>
                            <textarea
                                required
                                rows={6}
                                placeholder="Describe the specific machines, parts, or services you require technical information and pricing for..."
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#022c75] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#033a95] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
                            >
                                <Send className="w-5 h-5" />
                                Submit Request
                            </button>
                            <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-[0.3em]">
                                Secured & Guaranteed Professional Privacy
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

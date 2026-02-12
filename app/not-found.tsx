"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[40px] p-12 md:p-16 shadow-2xl border border-gray-200"
                >
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Clock className="w-12 h-12 text-[#022c75]" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#022c75] mb-6 tracking-tight">
                        Content Coming Soon
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-md mx-auto">
                        We are currently building this section to provide you with more advanced SMT solutions. Stay tuned for updates!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="bg-[#022c75] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#033a95] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                        >
                            <Home className="w-5 h-5" />
                            Back to Homepage
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="text-[#022c75] font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>
                </motion.div>

                <div className="mt-12">
                    <p className="text-[#022c75]/40 font-bold uppercase tracking-[0.3em] text-xs">
                        Tekmart India • Professional SMT Solutions
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../public/TEKMART LOGO.png";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { Send } from "lucide-react";
import WeChatModal from './WeChatModal';
import indiamartlog from "../public/download.png"
import linkedinlogo from "../public/linkedin.png"
import wechatlogo from "../public/wechat.png"

const Footer = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
                setTimeout(() => {
                    router.push("/");
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus("error");
        }
    };

    return (
        <>
            <footer className="bg-[#e6e6e6] text-[#022c75] pb-6 pt-16 border-t border-[#022c75]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Column 1: Company Logo & Identity */}
                        <div className="space-y-6">
                            <div className="-mt-12 -ml-4">
                                <Image src={logo} alt="TEKMART Logo" className="w-48 h-48 object-contain" />
                            </div>
                            <div className="-mt-8 space-y-4">
                                <ul className="space-y-2 text-sm font-medium opacity-90">
                                    <li>• Refurbished SMT Machines</li>
                                    <li>• Genuine SMT Spare Parts</li>
                                    <li>• Complete SMT Production Lines</li>
                                    <li>• Installation & Technical Support Across India</li>
                                </ul>
                            </div>
                            <div className='space-y-2'><p className='font-bold'>GST - 07AACCT5172H1ZA</p>
                                <p className='font-bold'>PAN - AACCT5172H</p>
                                <p className='font-bold'>TAN - DELT08222E</p>
                                <p className='font-bold'>IEC CODE - 0507000102</p>    
                            </div>

                        </div>

                        {/* Column 2: Contact & Explore */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[#022c75] font-bold text-lg mb-6 uppercase tracking-wider border-b border-[#022c75]/20 pb-2">Contact</h3>
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-[#022c75] flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p>+91 9220246692</p>
                                            <p>+91 9811613022</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-[#022c75] flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                        <a href="mailto:sarthak@tekmartindia.com" className="hover:underline">sarthak@tekmartindia.com</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[#022c75] font-bold text-lg mb-4 uppercase tracking-wider">Explore</h3>
                                <ul className="space-y-2 text-sm font-medium">
                                    <li><Link href="/smt-machines" className="hover:text-blue-700 flex items-center gap-2"><span className="text-xs">&gt;</span> SMT Machines</Link></li>
                                    <li><Link href="/smt-line" className="hover:text-blue-700 flex items-center gap-2"><span className="text-xs">&gt;</span> SMT Production Lines</Link></li>
                                    <li><Link href="/smt-parts" className="hover:text-blue-700 flex items-center gap-2"><span className="text-xs">&gt;</span> SMT Spare Parts</Link></li>
                                    <li><Link href="/service" className="hover:text-blue-700 flex items-center gap-2"><span className="text-xs">&gt;</span> Service & Technical Support</Link></li>
                                    <li><Link href="/quote" className="hover:text-blue-700 flex items-center gap-2"><span className="text-xs">&gt;</span> Request a Quote</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Locations */}
                        <div className="space-y-6">
                            <h3 className="text-[#022c75] font-bold text-lg mb-6 uppercase tracking-wider border-b border-[#022c75]/20 pb-2">Our Locations</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-bold uppercase mb-1">Registered Office</h4>
                                    <p className="text-xs leading-relaxed font-medium opacity-90">
                                        M 304, Dharma Apartment, IP Extension, Plot No. 2, Patparganj, New Delhi – 110092, Delhi, India
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase mb-1">Sales Office</h4>
                                    <p className="text-xs leading-relaxed font-medium opacity-90">
                                        260, Block BG-1, Paschim Vihar, New Delhi – 110063, India
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase mb-1">Warehouse & Refurbishment Centre</h4>
                                    <p className="text-xs leading-relaxed font-medium opacity-90">
                                        Plot No. 1405, Dheeraj Nagar Extension, Faridabad – 121013, Haryana, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Stay Updated */}
                        <div>
                            <h3 className="text-[#022c75] font-bold text-lg mb-6 uppercase tracking-wider border-b border-[#022c75]/20 pb-2">Stay Updated</h3>
                            <p className="text-sm font-medium mb-6 opacity-90">
                                Get updates on available SMT machines, spare parts and production line solutions.
                            </p>
                            <form onSubmit={handleSubmit} className="flex mb-8 shadow-sm">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-white text-[#022c75] px-4 py-3 w-full focus:outline-none rounded-l-lg border-y border-l border-[#022c75]/30"
                                    disabled={status === "loading" || status === "success"}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#022c75] px-6 py-3 text-white hover:bg-blue-800 transition-colors disabled:bg-gray-400 rounded-r-lg"
                                    disabled={status === "loading" || status === "success"}
                                >
                                    <Send size={18} />
                                </button>
                            </form>

                            <div className="flex flex-wrap gap-2">
                                {/* Phone */}
                                <a href="tel:+919220246692" className="w-10 h-10 rounded-full  flex items-center justify-center hover:scale-110 transition-transform ">
                                    <FaPhoneAlt className="w-10 h-8 text-[#022c75]" />
                                </a>

                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/company/tekmart-india/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full    flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                    <Image src={linkedinlogo} alt="linkedinlogo" className="w-10 h-10 object-contain" />
                                </a>

                                {/* IndiaMART */}
                                <a href="https://www.indiamart.com/tekmartindia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                    <Image src={indiamartlog} alt="indiamartlog" className="w-10 h-10 object-contain" />
                                </a>

                                {/* WeChat - Click to open Modal */}
                                <button
                                    onClick={() => setIsWeChatModalOpen(true)}
                                    className="w-10 h-10 rounded-full  flex items-center justify-center hover:scale-110 transition-transform shadow-sm cursor-pointer"
                                >
                                    <Image src={wechatlogo} alt="wechatlogo" className="w-10 h-10 object-contain" />
                                </button>

                                {/* WhatsApp */}
                                <a href="https://wa.me/919220246692" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full  flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                    <FaWhatsapp className="w-10 h-10 text-white bg-[#25D366]" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#022c75]/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-bold text-[#022c75]">© 2026 Tekmart India Exim Pvt. Ltd. All Rights Reserved.</p>
                        <p className="text-[10px] md:text-xs font-bold text-[#022c75]/80 uppercase tracking-widest space-x-2">
                            <Link href="/smt-machines" className="hover:text-blue-700">SMT Machines</Link>
                            <span>|</span>
                            <Link href="/smt-parts" className="hover:text-blue-700">SMT Spare Parts</Link>
                            <span>|</span>
                            <Link href="/smt-line" className="hover:text-blue-700">SMT Production Line Solutions</Link>
                            <span>|</span>
                            <Link href="/contact" className="hover:text-blue-700">India</Link>
                        </p>
                    </div>
                </div>
            </footer>

            <WeChatModal isOpen={isWeChatModalOpen} onClose={() => setIsWeChatModalOpen(false)} />
        </>
    );
};

export default Footer;

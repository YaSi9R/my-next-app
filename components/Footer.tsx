"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../public/TEKMART LOGO.png";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        <footer className="bg-[#e6e6e6] text-white pb-6 pt-10 border-t border-[#022c75]">
            <div className="container mx-auto px-4 w-9/11">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className='-translate-y-[34px]
'>
                        <Image src={logo} alt="logo" className="w-40 h-40 " />

                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full border border-[#022c75] flex items-center justify-center text-[#022c75]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <span className='text-[#022c75]'>+86 123 4567 8910</span>

                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full border border-[#022c75] flex items-center justify-center text-[#022c75]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <span className='text-[#022c75]'>+86 123 4567 8910</span>

                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full border border-[#022c75] flex items-center justify-center text-[#022c75]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <a href="mailto:smt@smt11.com" className="text-[#022c75]">Demo@gmail.com</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full border border-[#022c75] flex items-center justify-center text-[#022c75]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <a href="mailto:smt@smt11.com" className="text-[#022c75]">Demo@gmail.com</a>
                            </li>

                        </ul>
                        <div className="mt-4 space-y-2">
                            <Link href="/quote" className="block text-[#022c75] hover:text-[#022c75]/70 flex items-center">
                                <span className="text-[#022c75] mr-2">&gt;</span> Request Quote
                            </Link>
                            <Link href="/contact" className="block text-[#022c75] hover:text-[#022c75]/70 flex items-center">
                                <span className="text-[#022c75] mr-2">&gt;</span> Visit Us
                            </Link>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-[#022c75]">
                            <li><Link href="/faq" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">FAQ</Link></li>
                            {/* <li><Link href="/join-us" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Join Us</Link></li> */}
                            {/* <li><Link href="/training" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Training</Link></li> */}
                            <li><Link href="/privacy-policy" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Privacy policy</Link></li>
                            <li><Link href="/smt-dictionary" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Dictionary</Link></li>
                            <li><Link href="/social-responsibility" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Social Responsibility</Link></li>
                            <li><Link href="/sales-delivery-terms" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Sales Delivery Terms</Link></li>
                            {/* <li><Link href="/service-maintenance" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Service & Maintenance</Link></li> */}
                            {/* <li><Link href="/sitemap" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Sitemap</Link></li> */}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Product List</h3>
                        <ul className="space-y-2 text-sm text-[#022c75]">
                            <li><Link href="/smt-line" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Production Line</Link></li>
                            <li><Link href="/smt-machines/reflow-ovens" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Reflow Oven</Link></li>
                            <li><Link href="/smt-machines/screen-printers" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Stencil Printer</Link></li>
                            <li><Link href="/smt-machines/pick-and-place-machines" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Pick & Place Machine</Link></li>
                            <li><Link href="/smt-machines/aoi" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Wave Soldering Machine</Link></li>
                            <li><Link href="/smt-machines/pcb-cutting" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">PCB Handling Machine</Link></li>
                            {/* <li><Link href="/video" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Video</Link></li> */}
                            {/* <li><Link href="/view-more" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">View More</Link></li> */}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Get inspired</h3>
                        <p className="text-sm text-[#022c75] mb-4">
                            {status === "success"
                                ? "Thank you for subscribing to our newsletter!"
                                : status === "error"
                                    ? "Something went wrong. Please try again."
                                    : "Subscribe for our newsletter"}
                        </p>
                        <form onSubmit={handleSubmit} className="flex mb-6">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-white text-[#022c75] px-4 py-2 w-full focus:outline-none"
                                disabled={status === "loading" || status === "success"}
                            />
                            <button
                                type="submit"
                                className="bg-[#022c75] px-4 py-2 text-white hover:bg-red-800 transition-colors disabled:bg-gray-400"
                                disabled={status === "loading" || status === "success"}
                            >
                                {status === "loading" ? "..." : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                )}
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-2 mb-6">

                            {/* LinkedIn */}
                            <a href="#linkedin" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            {/* IndiaMART */}
                            <a href="https://www.indiamart.com/tekmartindia/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <div className="text-white font-bold text-[10px] group-hover:text-[#022c75]">im</div>
                            </a>
                            {/* WeChat */}
                            <a href="https://www.wechat.com/" target='_blank' className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-[#022c75]">
                                    <path d="M8.5 15c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm4 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM17.5 10c2.49 0 4.5 1.79 4.5 4s-2.01 4-4.5 4c-.45 0-.87-.06-1.27-.16l-2.23 1.16v-2.15C13.21 16.14 13 15.09 13 14c0-2.21 2.01-4 4.5-4zM9 4C5.13 4 2 6.69 2 10c0 1.71.82 3.25 2.14 4.34L3 18l4.42-2.31c.49.2 1.02.31 1.58.31 3.87 0 7-2.69 7-6s-3.13-6-7-6zm-3.5 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="https://wa.me/919812345678" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-[#022c75]">
                                    <path d="M12.01 2.01C6.48 2.01 2 6.48 2 12.01c0 2.17.7 4.18 1.89 5.81l-1.4 5.14 5.26-1.38c1.55.84 3.33 1.33 5.22 1.33 5.53 0 10.01-4.48 10.01-10.01S17.54 2.01 12.01 2.01zm5.95 13.03c-.27.76-1.34 1.38-1.85 1.48-.37.07-.84.14-2.39-.49-1.99-.81-3.26-2.83-3.36-2.96-.1-.13-.81-.97-.81-1.85 0-.87.46-1.3.62-1.48.16-.18.34-.23.46-.23.11 0 .23 0 .33.01s.23-.04.36.27c.13.31.45 1.09.49 1.18.04.09.07.19.01.31s-.09.21-.18.33-.18.25-.26.34-.17.19-.07.36c.09.17.42.69.9 1.12.63.56 1.15.73 1.32.81.17.08.27.07.37-.04.1-.11.43-.5.54-.67.11-.17.23-.14.38-.09.15.05.97.46 1.14.54.17.08.28.12.32.19.04.07.04.41-.09 1.17z" />
                                </svg>
                            </a>




                        </div>


                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-[#022c75]">Copyright © 2026, tekmartindia. All rights reserved.</p>
                    <p className="text-sm text-[#022c75] mt-2 md:mt-0">
                        Developed By <a href="http://technopediasoft.com/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Technopedia Software</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

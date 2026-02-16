
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../public/TEKMART LOGO.png";

const Footer = () => {
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
                            <Link href="/visit" className="block text-[#022c75] hover:text-[#022c75]/70 flex items-center">
                                <span className="text-[#022c75] mr-2">&gt;</span> Visit Us
                            </Link>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-[#022c75]">
                            <li><Link href="/faq" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">FAQ</Link></li>
                            <li><Link href="/join-us" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Join Us</Link></li>
                            <li><Link href="/training" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Training</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Privacy policy</Link></li>
                            <li><Link href="/smt-dictionary" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Dictionary</Link></li>
                            <li><Link href="/social-responsibility" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Social Responsibility</Link></li>
                            <li><Link href="/sales-delivery-terms" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Sales Delivery Terms</Link></li>
                            <li><Link href="/service-maintenance" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Service & Maintenance</Link></li>
                            <li><Link href="/sitemap" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Sitemap</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Product List</h3>
                        <ul className="space-y-2 text-sm text-[#022c75]">
                            <li><Link href="/products/smt-production-line" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Production Line</Link></li>
                            <li><Link href="/products/reflow-oven" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Reflow Oven</Link></li>
                            <li><Link href="/products/smt-stencil-printer" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">SMT Stencil Printer</Link></li>
                            <li><Link href="/products/pick-place-machine" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Pick & Place Machine</Link></li>
                            <li><Link href="/products/wave-soldering-machine" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Wave Soldering Machine</Link></li>
                            <li><Link href="/products/pcb-handling-machine" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">PCB Handling Machine</Link></li>
                            <li><Link href="/video" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">Video</Link></li>
                            <li><Link href="/view-more" className="hover:text-[#e6e6e6] hover:bg-[#022c75] rounded-12">View More</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-[#022c75] font-bold text-lg mb-4">Get inspired</h3>
                        <p className="text-sm text-[#022c75] mb-4">Subscribe for our newsletter</p>
                        <div className="flex mb-6">
                            <input
                                type="email"
                                placeholder=""
                                className="bg-white text-[#022c75] px-4 py-2 w-full focus:outline-none"
                            />
                            <button className="bg-[#022c75] px-4 py-2 text-white hover:bg-red-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {/* YouTube */}
                            <a href="#youtube" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#linkedin" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            {/* X (Twitter) */}
                            <a href="#x" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white group-hover:text-[#022c75]">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a href="#facebook" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="#instagram" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* Pinterest */}
                            <a href="#pinterest" className="w-8 h-8 rounded bg-[#022c75] flex items-center justify-center hover:bg-[#022c75]/10 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-white group-hover:text-[#022c75]">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.927 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
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

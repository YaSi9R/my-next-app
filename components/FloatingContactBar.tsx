"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa"; import WeChatModal from './WeChatModal';
import linkedinlogo from "../public/linkedin.png";
import indiamartlog from "../public/download.png";
import wechatlogo from "../public/wechat.png";

const FloatingContactBar = () => {
    const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
    const [contactLinks, setContactLinks] = useState({
        whatsapp: "919220246692",
        linkedin: "https://www.linkedin.com/company/tekmart-india/",
        indiamart: "https://www.indiamart.com/tekmartindiaexim/profile.html?srsltid=AfmBOoqE7E12McyVreF6noBX-V2AJUP3CTLXa1hamVfp8_yCfTBGwkV-",
        phone: "+91 9220246692",
    });

    React.useEffect(() => {
        const fetchContactLinks = async () => {
            try {
                const res = await fetch("/api/page-sections?pageSlug=global&sectionId=contact-links");
                const data = await res.json();
                if (data && data.content) {
                    setContactLinks(data.content);
                }
            } catch (error) {
                console.error("Error fetching contact links:", error);
            }
        };
        fetchContactLinks();
    }, []);

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col bg-[#e6e6e6] shadow-lg border border-gray-200" style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>

                {/* Phone */}
                <a href={`tel:${contactLinks.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100">
                    <FaPhoneAlt className="w-7 h-7 text-[#022c75] group-hover:scale-110 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100">
                    <div className="w-10 h-10 relative group-hover:scale-110 transition-transform">
                        <Image src={linkedinlogo} alt="LinkedIn" fill className="object-contain" />
                    </div>
                </a>

                {/* IndiaMART */}
                <a href={contactLinks.indiamart} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100">
                    <div className="w-10 h-10 relative group-hover:scale-110 transition-transform">
                        <Image src={indiamartlog} alt="IndiaMART" fill className="object-contain" />
                    </div>
                </a>

                {/* WeChat */}
                <button
                    onClick={() => setIsWeChatModalOpen(true)}
                    className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100 cursor-pointer"
                >
                    <div className="w-10 h-10 relative group-hover:scale-110 transition-transform">
                        <Image src={wechatlogo} alt="WeChat" fill className="object-contain" />
                    </div>
                </button>

                {/* WhatsApp */}
                <a href={`https://wa.me/${contactLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors">
                    <FaWhatsapp className="w-10 h-10 text-white bg-[#25D366] group-hover:scale-110 transition-transform" />
                </a>

            </div>

            {/* Mobile View */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#e6e6e6] border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,16px)]">
                <div className="grid grid-cols-5 h-14 relative z-[101]">
                    {/* Phone */}
                    <a href={`tel:${contactLinks.phone.replace(/\s+/g, '')}`} className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <FaPhoneAlt className="w-8 h-[30px] text-[#022c75] group-hover:scale-110 transition-transform" />

                    </a>

                    {/* LinkedIn */}
                    <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
                            <Image src={linkedinlogo} alt="LinkedIn" fill className="object-contain" />
                        </div>

                    </a>

                    {/* IndiaMART */}
                    <a href={contactLinks.indiamart} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
                            <Image src={indiamartlog} alt="IndiaMART" fill className="object-contain" />
                        </div>

                    </a>

                    {/* WeChat */}
                    <button
                        onClick={() => setIsWeChatModalOpen(true)}
                        className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                        <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
                            <Image src={wechatlogo} alt="WeChat" fill className="object-contain" />
                        </div>

                    </button>

                    {/* WhatsApp */}
                     <a href={`https://wa.me/${contactLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full hover:bg-[#e6e6e6] group transition-colors">
                        <FaWhatsapp className="w-8 h-8 text-white bg-[#25D366] group-hover:scale-110 transition-transform" />

                    </a>
                </div>
            </div>

            <WeChatModal isOpen={isWeChatModalOpen} onClose={() => setIsWeChatModalOpen(false)} />
        </>
    );
};

export default FloatingContactBar;

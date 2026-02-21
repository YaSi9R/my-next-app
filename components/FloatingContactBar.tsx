"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import whatsappIcon from "../public/whatsapp-real-icon.png";
import { FaPhoneAlt } from "react-icons/fa"; import WeChatModal from './WeChatModal';
import linkedinlogo from "../public/linkedinlogo.png";
import indiamartlog from "../public/indiamartlogo.png";
import wechatlogo from "../public/wechatrealicon.png";

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
                <a href={`tel:${contactLinks.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 group transition-colors border-b border-gray-100">
                    <FaPhoneAlt className="w-8 h-8 text-[#022c75] scale-90 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 group transition-colors border-b border-gray-100">
                    <div className="w-8 h-8 relative hover:scale-110 transition-transform">
                        <Image src={linkedinlogo} alt="LinkedIn" fill />
                    </div>
                </a>

                {/* IndiaMART */}
                <a href={contactLinks.indiamart} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 group transition-colors border-b border-gray-100">
                    <div className="w-8 h-8 relative scale-120 transition-transform">
                        <Image src={indiamartlog} alt="IndiaMART" fill />
                    </div>
                </a>

                {/* WeChat */}
                <button
                    onClick={() => setIsWeChatModalOpen(true)}
                    className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 group transition-colors border-b border-gray-100 cursor-pointer"
                >
                    <div className="w-8 h-8 relative hover:scale-110 transition-transform">
                        <Image src={wechatlogo} alt="WeChat" fill />
                    </div>
                </button>

                {/* WhatsApp */}
                <a href={`https://wa.me/${contactLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 group transition-colors">
                    <div className="w-8 h-8 relative scale-110 transition-transform">
                        <Image src={whatsappIcon} alt="WhatsApp" fill />
                    </div>
                </a>

            </div>

            {/* Mobile View */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#e6e6e6] border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] ">
                <div className="grid grid-cols-5 h-14 relative z-[101]">
                    {/* Phone */}
                    <a href={`tel:${contactLinks.phone.replace(/\s+/g, '')}`} className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <FaPhoneAlt className="w-8 h-8 text-[#022c75] scale-90 transition-transform" />
                    </a>

                    {/* LinkedIn */}
                    <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-white transition-colors group">
                        <div className="w-8 h-8 relative hover:scale-110 transition-transform">
                            <Image src={linkedinlogo} alt="LinkedIn" fill />
                        </div>
                    </a>

                    {/* IndiaMART */}
                    <a href={contactLinks.indiamart} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-white transition-colors group">
                        <div className="w-8 h-8 relative scale-120 transition-transform">
                            <Image src={indiamartlog} alt="IndiaMART" fill />
                        </div>
                    </a>

                    {/* WeChat */}
                    <button
                        onClick={() => setIsWeChatModalOpen(true)}
                        className="flex flex-col items-center justify-center h-full hover:bg-white transition-colors group cursor-pointer"
                    >
                        <div className="w-8 h-8 relative hover:scale-110 transition-transform">
                            <Image src={wechatlogo} alt="WeChat" fill />
                        </div>
                    </button>

                    {/* WhatsApp */}
                    <a href={`https://wa.me/${contactLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full hover:bg-white transition-colors group">
                        <div className="w-8 h-8 relative scale-110 transition-transform">
                            <Image src={whatsappIcon} alt="WhatsApp" fill />
                        </div>
                    </a>
                </div>
            </div>

            <WeChatModal isOpen={isWeChatModalOpen} onClose={() => setIsWeChatModalOpen(false)} />
        </>
    );
};

export default FloatingContactBar;

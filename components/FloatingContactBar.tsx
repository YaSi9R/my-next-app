"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from "react-icons/fa";
import WeChatModal from './WeChatModal';
import linkedinlogo from "../public/linkedin.png";
import indiamartlog from "../public/download.png";
import wechatlogo from "../public/wechat.png";

const FloatingContactBar = () => {
    const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);

    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col bg-[#e6e6e6] shadow-lg border border-gray-200" style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/tekmart-india/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100">
                    <div className="w-10 h-10 relative group-hover:scale-110 transition-transform">
                        <Image src={linkedinlogo} alt="LinkedIn" fill className="object-contain" />
                    </div>
                </a>

                {/* IndiaMART */}
                <a href="https://www.indiamart.com/?srsltid=AfmBOoqLsSIw8IqAjeAy5sBL2LOsSLC4BgHCHZzlhRzg7ZyjdztTgsTF" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors border-b border-gray-100">
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
                <a href="https://wa.me/919812345678" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6] group transition-colors">
                    <FaWhatsapp className="w-10 h-10 text-[#25d366] group-hover:scale-110 transition-transform" />
                </a>

            </div>

            {/* Mobile View */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#e6e6e6] border-t-2 border-[#022c75] h-16 shadow-lg">
                <div className="grid grid-cols-4 h-full">

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/company/tekmart-india/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <div className="w-6 h-6 relative group-hover:scale-110 transition-transform">
                            <Image src={linkedinlogo} alt="LinkedIn" fill className="object-contain" />
                        </div>
                        <span className="text-xs mt-1 font-medium text-gray-700">LinkedIn</span>
                    </a>

                    {/* IndiaMART */}
                    <a href="https://www.indiamart.com/?srsltid=AfmBOoqLsSIw8IqAjeAy5sBL2LOsSLC4BgHCHZzlhRzg7ZyjdztTgsTF" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <div className="w-6 h-6 relative group-hover:scale-110 transition-transform">
                            <Image src={indiamartlog} alt="IndiaMART" fill className="object-contain" />
                        </div>
                        <span className="text-xs mt-1 font-medium text-gray-700">IndiaMART</span>
                    </a>

                    {/* WeChat */}
                    <button
                        onClick={() => setIsWeChatModalOpen(true)}
                        className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                        <div className="w-6 h-6 relative group-hover:scale-110 transition-transform">
                            <Image src={wechatlogo} alt="WeChat" fill className="object-contain" />
                        </div>
                        <span className="text-xs mt-1 font-medium text-gray-700">WeChat</span>
                    </button>

                    {/* WhatsApp */}
                    <a href="https://wa.me/919812345678" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors group">
                        <FaWhatsapp className="w-6 h-6 text-[#25d366] group-hover:scale-110 transition-transform" />
                        <span className="text-xs mt-1 font-medium text-gray-700">WhatsApp</span>
                    </a>

                </div>
            </div>

            <WeChatModal isOpen={isWeChatModalOpen} onClose={() => setIsWeChatModalOpen(false)} />
        </>
    );
};

export default FloatingContactBar;

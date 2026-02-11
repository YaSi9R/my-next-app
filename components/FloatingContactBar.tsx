import React from 'react';
import Link from 'next/link';

const FloatingContactBar = () => {
    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col bg-[#022c75] shadow-lg" style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>

                {/* Phone */}
                <a href="tel:+" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6]/20 group  transition-colors border-b border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white group-hover:text-[#e6e6e6] ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6]/20 group transition-colors border-b border-white/20 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white group-hover:text-[#e6e6e6]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.2 15.2C17 15.6 16.4 16.1 15.6 16.2C14.8 16.3 14.1 16 11.8 15C9.5 14 7.6 12.1 6.6 9.8C6.1 8.8 6.1 7.9 6.5 7.4C6.8 7 7.2 6.8 7.6 6.8C8 6.8 8.1 6.8 8.2 6.8C8.5 6.8 8.7 6.9 8.9 7.3C9.1 7.7 9.5 8.7 9.5 8.8C9.6 8.9 9.6 9.1 9.5 9.2C9.4 9.4 9.3 9.5 9.1 9.7C8.9 9.9 8.8 10 9 10.4C9.2 10.8 9.9 12 10.9 12.9C12.2 14.1 13.3 14.5 13.7 14.7C14.1 14.9 14.5 14.9 14.8 14.6C15.1 14.3 15.5 13.7 15.7 13.4C15.9 13.1 16.1 13.2 16.4 13.3C16.7 13.4 18.3 14.2 18.6 14.4C18.9 14.6 19.1 14.7 19.2 14.9C19.3 15.1 19.3 15.5 17.2 15.2Z" />
                    </svg>
                </a>

                {/* Chat (to chatbot) */}
                <Link href="/chatbot" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6]/20 hover:text-[#e6e6e6] transition-colors border-b border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                </Link>

                {/* Mail */}
                <a href="mailto:info@example.com" className="flex items-center justify-center w-12 h-12 hover:bg-[#e6e6e6]/20 hover:text-[#e6e6e6] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </a>

            </div>

            {/* Mobile View */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#e6e6e6] border-t-2 border-[#022c75] h-16 shadow-lg">
                <div className="grid grid-cols-4 h-full">

                    {/* Phone */}
                    <a href="tel:+" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#022c75]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        <span className="text-xs mt-1 font-medium text-gray-700">Phone</span>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#022c75]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.2 15.2C17 15.6 16.4 16.1 15.6 16.2C14.8 16.3 14.1 16 11.8 15C9.5 14 7.6 12.1 6.6 9.8C6.1 8.8 6.1 7.9 6.5 7.4C6.8 7 7.2 6.8 7.6 6.8C8 6.8 8.1 6.8 8.2 6.8C8.5 6.8 8.7 6.9 8.9 7.3C9.1 7.7 9.5 8.7 9.5 8.8C9.6 8.9 9.6 9.1 9.5 9.2C9.4 9.4 9.3 9.5 9.1 9.7C8.9 9.9 8.8 10 9 10.4C9.2 10.8 9.9 12 10.9 12.9C12.2 14.1 13.3 14.5 13.7 14.7C14.1 14.9 14.5 14.9 14.8 14.6C15.1 14.3 15.5 13.7 15.7 13.4C15.9 13.1 16.1 13.2 16.4 13.3C16.7 13.4 18.3 14.2 18.6 14.4C18.9 14.6 19.1 14.7 19.2 14.9C19.3 15.1 19.3 15.5 17.2 15.2Z" />
                        </svg>
                        <span className="text-xs mt-1 font-medium text-gray-700">WhatsApp</span>
                    </a>

                    {/* Chat */}
                    <Link href="/chatbot" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#022c75]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                        <span className="text-xs mt-1 font-medium text-gray-700">Chat</span>
                    </Link>

                    {/* Mail */}
                    <a href="mailto:info@example.com" className="flex flex-col items-center justify-center h-full hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#022c75]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <span className="text-xs mt-1 font-medium text-gray-700">Mail</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default FloatingContactBar;

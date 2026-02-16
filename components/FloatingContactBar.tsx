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
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white group-hover:text-[#e6e6e6]">
                        <path d="M12.01 2.01C6.48 2.01 2 6.48 2 12.01c0 2.17.7 4.18 1.89 5.81l-1.4 5.14 5.26-1.38c1.55.84 3.33 1.33 5.22 1.33 5.53 0 10.01-4.48 10.01-10.01S17.54 2.01 12.01 2.01zm5.95 13.03c-.27.76-1.34 1.38-1.85 1.48-.37.07-.84.14-2.39-.49-1.99-.81-3.26-2.83-3.36-2.96-.1-.13-.81-.97-.81-1.85 0-.87.46-1.3.62-1.48.16-.18.34-.23.46-.23.11 0 .23 0 .33.01s.23-.04.36.27c.13.31.45 1.09.49 1.18.04.09.07.19.01.31s-.09.21-.18.33-.18.25-.26.34-.17.19-.07.36c.09.17.42.69.9 1.12.63.56 1.15.73 1.32.81.17.08.27.07.37-.04.1-.11.43-.5.54-.67.11-.17.23-.14.38-.09.15.05.97.46 1.14.54.17.08.28.12.32.19.04.07.04.41-.09 1.17z" />
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
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#022c75]">
                            <path d="M12.01 2.01C6.48 2.01 2 6.48 2 12.01c0 2.17.7 4.18 1.89 5.81l-1.4 5.14 5.26-1.38c1.55.84 3.33 1.33 5.22 1.33 5.53 0 10.01-4.48 10.01-10.01S17.54 2.01 12.01 2.01zm5.95 13.03c-.27.76-1.34 1.38-1.85 1.48-.37.07-.84.14-2.39-.49-1.99-.81-3.26-2.83-3.36-2.96-.1-.13-.81-.97-.81-1.85 0-.87.46-1.3.62-1.48.16-.18.34-.23.46-.23.11 0 .23 0 .33.01s.23-.04.36.27c.13.31.45 1.09.49 1.18.04.09.07.19.01.31s-.09.21-.18.33-.18.25-.26.34-.17.19-.07.36c.09.17.42.69.9 1.12.63.56 1.15.73 1.32.81.17.08.27.07.37-.04.1-.11.43-.5.54-.67.11-.17.23-.14.38-.09.15.05.97.46 1.14.54.17.08.28.12.32.19.04.07.04.41-.09 1.17z" />
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

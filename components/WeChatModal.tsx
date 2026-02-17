"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import weChatQr from '../public/image copy 2.png';

interface WeChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WeChatModal: React.FC<WeChatModalProps> = ({ isOpen, onClose }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-2 animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={onClose}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col items-center pt-8 pb-6 px-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Connect on WeChat</h3>
                    <p className="text-sm text-gray-500 mb-6 text-center">Scan the QR code to add us</p>

                    <div className="relative w-64 h-70 border-2 border-gray-100 rounded-xl  ">
                        <Image
                            src={weChatQr}
                            alt="WeChat QR Code"
                            fill
                            className="object-cover    "
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeChatModal;

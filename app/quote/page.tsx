"use client";

import React, { Suspense } from 'react';
import ContactSection from '@/components/homepage/ContactSection';

export default function QuotePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] ">
            <Suspense fallback={<div className="min-h-screen bg-[#e6e6e6] flex items-center justify-center">Loading...</div>}>
                <ContactSection />
            </Suspense>
        </div>
    );
}

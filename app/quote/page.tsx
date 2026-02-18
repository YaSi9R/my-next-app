"use client"
import { Suspense } from "react";

import React from 'react';
import ContactSection from '@/components/homepage/ContactSection';

export default function QuotePage() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] ">
            <Suspense fallback={<div>Loading...</div>}>
                <ContactSection />
            </Suspense>
        </div>
    );
}

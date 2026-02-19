"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Toaster } from "react-hot-toast";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#e6e6e6]">
            {/* Sidebar with state */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-4 md:p-6 flex-1 overflow-x-hidden">
                    {children}
                </main>
                <Toaster position="top-right" />
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}

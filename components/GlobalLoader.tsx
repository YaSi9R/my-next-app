"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GlobalLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // When path changes, we stop loading
    useEffect(() => {
        setLoading(false);
    }, [pathname, searchParams]);

    // Listen for custom start event
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleStop = () => setLoading(false);

        window.addEventListener("route-change-start", handleStart);
        // Optional: listen for stop event if we emit it elsewhere manually
        window.addEventListener("route-change-complete", handleStop);

        return () => {
            window.removeEventListener("route-change-start", handleStart);
            window.removeEventListener("route-change-complete", handleStop);
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[9999]">
            <div className="h-full bg-[#022c75] animate-progress origin-left"></div>
        </div>
    );
}

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalLoader } from '@/components/GlobalLoader'; // Assuming this exists, or just use null

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    // Optional: Return null or a loader while redirecting
    return null;
}

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    // Optional: Return null or a loader while redirecting
    return null;
}

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Tekmart</h1>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <p className="text-gray-600 mb-4">
                        This is a placeholder page. Content will be added by the client.
                    </p>
                    <Link href="/" className="text-[#e6e6e6] hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#e6e6e6] flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-6 max-w-md w-full text-center">
                {/* Logo Spinner Animation */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-[#022c75]/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-[#022c75] rounded-full animate-spin"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#022c75] animate-pulse">
                        Loading Equipment...
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Fetching the latest SMT machines and specifications from Tekmart.
                    </p>
                </div>

                {/* Skeleton Grid (Simplified) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-12 opacity-40 select-none">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 space-y-4 shadow-sm border border-gray-100">
                            <div className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
                            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                            <div className="h-4 bg-gray-100 rounded w-full mt-4 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

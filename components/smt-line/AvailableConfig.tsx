"use client";

import React, { useEffect, useState } from "react";
import { Settings, Loader2 } from "lucide-react";

type ConfigurationOption = {
    title: string;
    description: string;
};

type SMTLineConfig = {
    options: {
        A: ConfigurationOption;
        B: ConfigurationOption;
        C: ConfigurationOption;
    };
};

const DEFAULT_CONFIG: SMTLineConfig = {
    options: {
        A: { title: "Option A – Yamaha Core Configuration", description: "Single PnP optimized for stable 15K–20K CPH output." },
        B: { title: "Option B – Mixed Brand Optimized Configuration", description: "Cost-efficient combination of refurbished core machines." },
        C: { title: "Option C – Hybrid Configuration", description: "Used core machines with select new peripherals such as loaders or AOI systems." },
    },
};

interface AvailableConfigProps {
    pageSlug: string;
}

export default function AvailableConfig({ pageSlug }: AvailableConfigProps) {
    const [config, setConfig] = useState<SMTLineConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch(`/api/page-sections?pageSlug=${pageSlug}&sectionId=available-configs`);
                const data = await res.json();
                if (data.content) {
                    setConfig(data.content);
                }
            } catch (error) {
                console.error("Failed to fetch SMT config:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [pageSlug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#022c75]" />
            </div>
        );
    }

    return (
        <section>
            <h2 className="text-3xl font-bold text-[#022c75] mb-6 flex items-center gap-3">
                <Settings className="w-8 h-8 text-[#022c75]" />
                Available Configurations
            </h2>
            <div className="grid gap-6">
                {(["A", "B", "C"] as const).map((optionKey) => (
                    <div
                        key={optionKey}
                        className="bg-[#e6e6e6] rounded-xl p-6 shadow-sm border border-[2px] border-[#022c75] hover:border-blue-200 transition-colors"
                    >
                        <h3 className="text-xl font-bold text-[#022c75] mb-2">{config.options[optionKey].title}</h3>
                        <p className="text-[#022c75]">{config.options[optionKey].description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

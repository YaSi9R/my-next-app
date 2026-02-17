"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

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
        A: { title: "Option A", description: "" },
        B: { title: "Option B", description: "" },
        C: { title: "Option C", description: "" },
    },
};

const PAGES = [
    { slug: "entry-level", name: "Entry Level Line" },
    { slug: "mid-scale", name: "Mid Scale Line" },
    { slug: "high-speed", name: "High Speed Line" },
];

export default function SMTConfigEditor() {
    const [selectedPage, setSelectedPage] = useState(PAGES[0].slug);
    const [config, setConfig] = useState<SMTLineConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchConfig();
    }, [selectedPage]);

    const fetchConfig = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`/api/page-sections?pageSlug=${selectedPage}&sectionId=available-configs`);
            const data = await res.json();
            if (data.content) {
                setConfig(data.content);
            } else {
                // Reset to default if no custom config exists
                setConfig(DEFAULT_CONFIG);
            }
        } catch (error) {
            console.error("Failed to fetch config:", error);
            setMessage({ type: "error", text: "Failed to load configuration" });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/page-sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pageSlug: selectedPage,
                    sectionId: "available-configs",
                    content: config,
                }),
            });

            if (!res.ok) throw new Error("Failed to save");

            setMessage({ type: "success", text: "Configuration saved successfully!" });
        } catch (error) {
            console.error("Failed to save config:", error);
            setMessage({ type: "error", text: "Failed to save configuration" });
        } finally {
            setSaving(false);
        }
    };

    const handleOptionChange = (optionKey: "A" | "B" | "C", field: "title" | "description", value: string) => {
        setConfig((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                [optionKey]: {
                    ...prev.options[optionKey],
                    [field]: value,
                },
            },
        }));
    };

    return (
        <div className="bg-[#e6e6e6] p-6 rounded-xl shadow-sm border border-[#022c75] border-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-[#022c75]">SMT Line Configuration</h2>
                    <p className="text-[#022c75] text-sm">Manage available configuration options for SMT lines</p>
                </div>

                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm font-medium text-[#022c75] focus:ring-2 focus:ring-[#022c75] focus:border-transparent outline-none"
                >
                    {PAGES.map((page) => (
                        <option key={page.slug} value={page.slug}>
                            {page.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#022c75]" />
                </div>
            ) : (
                <div className="space-y-6">
                    {(["A", "B", "C"] as const).map((optionKey) => (
                        <div key={optionKey} className="bg-[#e6e6e6] p-6 rounded-xl border border-[#022c75] border-2">
                            <h3 className="font-bold text-[#022c75] mb-4">Option {optionKey}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#022c75] uppercase tracking-wider mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={config.options[optionKey].title}
                                        onChange={(e) => handleOptionChange(optionKey, "title", e.target.value)}
                                        className="w-full border border-[#022c75] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#022c75] focus:border-transparent outline-none text-[#022c75]"
                                        placeholder={`e.g. Option ${optionKey} - Configuration Name`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#022c75] uppercase tracking-wider mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={config.options[optionKey].description}
                                        onChange={(e) => handleOptionChange(optionKey, "description", e.target.value)}
                                        className="w-full border border-[#022c75] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#022c75] focus:border-transparent outline-none h-20 resize-none text-[#022c75]"
                                        placeholder="Describe this configuration..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                            {message && (
                                <span className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                    {message.text}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#022c75] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#033a95] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

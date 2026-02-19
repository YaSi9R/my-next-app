"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

export default function SettingsPage() {
    const [links, setLinks] = useState({
        whatsapp: "",
        linkedin: "",
        indiamart: "",
        phone: "",
        phone2: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch("/api/page-sections?pageSlug=global&sectionId=contact-links");
            const data = await res.json();
            if (data && data.content) {
                setLinks(data.content);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
            setMessage({ type: "error", text: "Failed to load settings." });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/page-sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pageSlug: "global",
                    sectionId: "contact-links",
                    content: links
                })
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Settings saved successfully!" });
            } else {
                setMessage({ type: "error", text: "Failed to save settings." });
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            setMessage({ type: "error", text: "An error occurred while saving." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#022c75]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#022c75]">Site Settings</h1>
                    <p className="text-[#022c75] mt-2">Manage global contact links and info</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="text-[#022c75] hover:underline font-medium"
                >
                    Back to Dashboard
                </button>
            </div>

            {message.text && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="bg-[#e6e6e6] p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#022c75] mb-2">WhatsApp Number (e.g., 919220246692)</label>
                        <input
                            type="text"
                            value={links.whatsapp}
                            onChange={(e) => setLinks({ ...links, whatsapp: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#022c75] text-[#022c75] focus:outline-none focus:ring-2 focus:ring-[#022c75]/20 focus:border-[#022c75] transition-all"
                            placeholder="Enter WhatsApp number with country code"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#022c75] mb-2">Primary Phone Number</label>
                        <input
                            type="text"
                            value={links.phone}
                            onChange={(e) => setLinks({ ...links, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#022c75] text-[#022c75] focus:outline-none focus:ring-2 focus:ring-[#022c75]/20 focus:border-[#022c75] transition-all"
                            placeholder="+91 9220246692"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#022c75] mb-2">Secondary Phone Number</label>
                        <input
                            type="text"
                            value={links.phone2}
                            onChange={(e) => setLinks({ ...links, phone2: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#022c75] text-[#022c75] focus:outline-none focus:ring-2 focus:ring-[#022c75]/20 focus:border-[#022c75] transition-all"
                            placeholder="+91 9811613022"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[#022c75] mb-2">LinkedIn Profile URL</label>
                        <input
                            type="text"
                            value={links.linkedin}
                            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#022c75] text-[#022c75] focus:outline-none focus:ring-2 focus:ring-[#022c75]/20 focus:border-[#022c75] transition-all"
                            placeholder="https://linkedin.com/company/..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#022c75] mb-2">IndiaMART Company URL</label>
                        <input
                            type="text"
                            value={links.indiamart}
                            onChange={(e) => setLinks({ ...links, indiamart: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#022c75] text-[#022c75] focus:outline-none focus:ring-2 focus:ring-[#022c75]/20 focus:border-[#022c75] transition-all"
                            placeholder="https://www.indiamart.com/..."
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#022c75] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md disabled:bg-gray-400 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}

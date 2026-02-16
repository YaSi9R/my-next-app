"use client";

import { useEffect, useState } from "react";
import TableShimmer from "@/components/admin/TableShimmer";

interface Subscription {
    id: string;
    email: string;
    createdAt: string;
}

export default function NewsletterPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = async () => {
        try {
            const res = await fetch("/api/newsletter");
            const data = await res.json();
            setSubscriptions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#022c75] mb-6">Newsletter Subscriptions</h1>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow text-[#022c75] overflow-x-auto">
                {loading ? (
                    <TableShimmer />
                ) : (
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-3">Email</th>
                                <th>Subscribed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((s) => (
                                <tr key={s.id} className="border-b">
                                    <td className="py-3">{s.email}</td>
                                    <td>{new Date(s.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                            {subscriptions.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="text-center py-6">
                                        No subscriptions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

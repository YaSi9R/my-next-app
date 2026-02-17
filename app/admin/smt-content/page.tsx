import React from "react";
import SMTConfigEditor from "@/components/admin/SMTConfigEditor";

export default function AdminSMTContentPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-2xl font-bold text-[#022c75] mb-8">SMT Line Content Management</h1>
            <SMTConfigEditor />
        </div>
    );
}

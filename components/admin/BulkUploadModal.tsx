
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface BulkUploadModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function BulkUploadModal({ onClose, onSuccess }: BulkUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/products/bulk", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await res.json();
            setResult(data.summary);
            if (data.success) {
                onSuccess();
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Check console.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 text-[#022c75]">
                <h2 className="text-2xl font-bold mb-4">Bulk Product Upload</h2>

                {!result ? (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Upload an Excel file (.xlsx or .xls) to import multiple products.
                            The sheet should have columns: <b>Name, Condition, Category, Subcategory, Third Level, Availability, Short Description, Long Description, Features, Specifications, Images (comma-separated URLs)</b>.
                        </p>

                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#022c75] transition-colors"
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                disabled={uploading}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="bg-[#022c75] text-white px-6 py-2 rounded-lg hover:bg-[#01306b] disabled:bg-gray-400"
                            >
                                {uploading ? "Processing..." : "Start Upload"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="font-bold text-lg mb-2">Upload Result</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Total Products in file: <b>{result.total}</b></li>
                                <li className="text-green-600">Success: <b>{result.success}</b></li>
                                <li className="text-red-600">Failed: <b>{result.failed}</b></li>
                            </ul>
                        </div>

                        {result.errors.length > 0 && (
                            <div className="max-h-40 overflow-y-auto p-4 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100">
                                <p className="font-bold mb-1">Error Logs:</p>
                                {result.errors.map((err: string, i: number) => (
                                    <p key={i}>{err}</p>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="bg-[#022c75] text-white px-6 py-2 rounded-lg hover:bg-[#01306b]"
                            >
                                Close Summary
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

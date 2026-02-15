"use client";

import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function ImageUploader({ onUpload }: any) {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (files: File[]) => {
    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    onUpload(uploadedUrls);
    setUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 text-center rounded cursor-pointer"
    >
      <input {...getInputProps()} />
      {uploading ? "Uploading..." : "Drag & drop images here"}
    </div>
  );
}
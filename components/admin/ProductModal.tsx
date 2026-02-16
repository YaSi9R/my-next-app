"use client";

import dynamic from "next/dynamic";
import ImageUploader from "./ImageUploader";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function ProductModal({
  isOpen,
  onClose,
  form,
  setForm,
  handleSubmit,
}: any) {
  if (!isOpen) return null;

  const handleImageUpload = (urls: string[]) => {
    setForm({ ...form, images: [...form.images, ...urls] });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-[#e6e6e6] w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-xl space-y-6">

        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-[#022c75]">
            Product
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* NAME */}
        <input
          placeholder="Product Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* SHORT DESC */}
        <textarea
          placeholder="Short Description"
          className="border p-2 w-full rounded"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescription: e.target.value,
            })
          }
        />

        {/* RICH TEXT */}
        <ReactQuill
          value={form.longDescription}
          onChange={(value) =>
            setForm({ ...form, longDescription: value })
          }
        />

        {/* IMAGE UPLOADER */}
        <ImageUploader onUpload={handleImageUpload} />

        {/* IMAGE PREVIEW */}
        <div className="flex gap-3 flex-wrap">
          {form.images.map((img: string, i: number) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    images: form.images.filter(
                      (_: any, index: number) =>
                        index !== i
                    ),
                  })
                }
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-[#022c75] text-white px-6 py-2 rounded"
        >
          Save Product
        </button>
      </div>
    </div>
  );
}
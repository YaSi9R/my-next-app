"use client";

import { useEffect, useState } from "react";
import slugify from "slugify";
import TableShimmer from "@/components/admin/TableShimmer";
import ShimmerSection from "@/components/admin/TableShimmer";

interface Brand {
  id: string;
  name: string;
  slug: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    setLoadingData(true);
    const res = await fetch("/api/brands");
    const data = await res.json();
    setBrands(data);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = slugify(name, { lower: true, strict: true });

    if (editingId) {
      await fetch(`/api/brands/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
    } else {
      await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
    }

    setName("");
    setEditingId(null);
    setLoading(false);
    fetchBrands();
  };

  const handleEdit = (brand: Brand) => {
    setName(brand.name);
    setEditingId(brand.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;

    await fetch(`/api/brands/${id}`, {
      method: "DELETE",
    });

    fetchBrands();
  };

  // if (loadingData) return <TableShimmer/>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75] mb-6">
        Brands
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 text-[#022c75]">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Brand" : "Add New Brand"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            required
            placeholder="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#022c75]"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#022c75] text-white px-6 py-2 rounded-lg hover:bg-[#01306b]"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow text-[#022c75] overflow-x-auto">

        {
          loadingData ? <TableShimmer /> :
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Name</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id} className="border-b">
                    <td className="py-3">{brand.name}</td>
                    <td>{brand.slug}</td>
                    <td className="space-x-3">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="text-[#022c75] cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {brands.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-[#022c75]">
                      No brands found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}
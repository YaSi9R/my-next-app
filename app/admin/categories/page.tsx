"use client";

import ShimmerSection from "@/components/admin/TableShimmer";
import { useEffect, useState } from "react";
import slugify from "slugify";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export default function CategoryManagementPage() {
  const [loadingData, setLoadingData] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [subcategoryName, setSubcategoryName] = useState("");
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const fetchData = async () => {
    setLoadingData(true);
    const [catRes, subRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/subcategories"),
    ]);

    setCategories(await catRes.json());
    setSubcategories(await subRes.json());
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CATEGORY ACTIONS
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingCategoryId ? "PUT" : "POST";
    const url = editingCategoryId ? `/api/categories/${editingCategoryId}` : "/api/categories";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: categoryName,
      }),
    });

    setCategoryName("");
    setEditingCategoryId(null);
    fetchData();
  };

  const handleEditCategory = (cat: Category) => {
    setCategoryName(cat.name);
    setEditingCategoryId(cat.id);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category? This will also delete related subcategories.")) return;

    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (selectedCategoryId === id) setSelectedCategoryId("");
    fetchData();
  };

  // SUBCATEGORY ACTIONS
  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) return;

    const method = editingSubcategoryId ? "PUT" : "POST";
    const url = editingSubcategoryId ? `/api/subcategories/${editingSubcategoryId}` : "/api/subcategories";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subcategoryName,
        categoryId: selectedCategoryId,
      }),
    });

    setSubcategoryName("");
    setEditingSubcategoryId(null);
    fetchData();
  };

  const handleEditSubcategory = (sub: Subcategory) => {
    setSubcategoryName(sub.name);
    setEditingSubcategoryId(sub.id);
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (!confirm("Delete this subcategory?")) return;

    await fetch(`/api/subcategories/${id}`, { method: "DELETE" });
    fetchData();
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === selectedCategoryId,
  );

  if (loadingData) return <ShimmerSection />;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#022c75]">Category Management</h1>

      {/* CATEGORY SECTION */}
      <div className="bg-white p-6 rounded-xl shadow text-[#022c75]">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>

        <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
          <input
            type="text"
            required
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-[#022c75] text-white px-6 py-2 rounded-lg hover:bg-[#01306b]"
          >
            {editingCategoryId ? "Update" : "Add"}
          </button>

          {editingCategoryId && (
            <button
              type="button"
              onClick={() => { setEditingCategoryId(null); setCategoryName(""); }}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${selectedCategoryId === cat.id ? "border-[#022c75] bg-blue-50" : "border-gray-100 hover:border-gray-300"
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-lg">{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditCategory(cat); }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {subcategories.filter(s => s.categoryId === cat.id).length} Subcategories
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SUBCATEGORY SECTION */}
      <div className="bg-white p-6 rounded-xl shadow text-[#022c75]">
        <h2 className="text-xl font-semibold mb-4">
          Subcategories {selectedCategoryId && `for ${categories.find(c => c.id === selectedCategoryId)?.name}`}
        </h2>

        {selectedCategoryId ? (
          <>
            <form onSubmit={handleAddSubcategory} className="flex gap-4 mb-6">
              <input
                type="text"
                required
                placeholder="Subcategory name"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
              />

              <button
                type="submit"
                className="bg-[#022c75] text-white px-6 py-2 rounded-lg hover:bg-[#01306b]"
              >
                {editingSubcategoryId ? "Update" : "Add"}
              </button>

              {editingSubcategoryId && (
                <button
                  type="button"
                  onClick={() => { setEditingSubcategoryId(null); setSubcategoryName(""); }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
              )}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredSubcategories.map((sub) => (
                <div key={sub.id} className="border border-gray-100 p-3 rounded-lg flex justify-between items-center group hover:border-gray-300 transition-colors">
                  <span className="font-medium">{sub.name}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditSubcategory(sub)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubcategory(sub.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filteredSubcategories.length === 0 && (
                <p className="text-gray-500 col-span-full py-4 text-center border-2 border-dashed rounded-xl">
                  No subcategories in this category
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              Select a category above to manage its subcategories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


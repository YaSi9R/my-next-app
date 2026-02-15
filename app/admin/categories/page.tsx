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
  const [subcategoryName, setSubcategoryName] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

    // DELETE CATEGORY
const handleDeleteCategory = async (id: string) => {
  if (!confirm("Delete this category? This may affect subcategories.")) return;

  await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  // Reset selection if deleted
  if (selectedCategoryId === id) {
    setSelectedCategoryId("");
  }

  fetchData();
};

// DELETE SUBCATEGORY
const handleDeleteSubcategory = async (id: string) => {
  if (!confirm("Delete this subcategory?")) return;

  await fetch(`/api/subcategories/${id}`, {
    method: "DELETE",
  });

  fetchData();
};

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

  // CATEGORY CREATE
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: categoryName,
        slug: slugify(categoryName, { lower: true, strict: true }),
      }),
    });

    setCategoryName("");
    fetchData();
  };

  // SUBCATEGORY CREATE
  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId) return;

    await fetch("/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subcategoryName,
        slug: slugify(subcategoryName, { lower: true, strict: true }),
        categoryId: selectedCategoryId,
      }),
    });

    setSubcategoryName("");
    fetchData();
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === selectedCategoryId,
  );
  if (loadingData) {
    return <ShimmerSection />;
  }

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
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`cursor-pointer p-3 rounded-lg border flex justify-between ${
                selectedCategoryId === cat.id ? "bg-[#022c75] text-white" : ""
              }`}
            >
              {cat.name}
               <button
        onClick={() => handleDeleteCategory(cat.id)}
        className="text-red-500 text-sm hover:text-red-700"
      >
        Delete
      </button>
            </li>
            
          ))}
        </ul>
      </div>

      {/* SUBCATEGORY SECTION */}
      <div className="bg-white p-6 rounded-xl shadow text-[#022c75]">
        <h2 className="text-xl font-semibold mb-4">Subcategories</h2>

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
                Add
              </button>
            </form>

            <ul className="space-y-2">
              {filteredSubcategories.map((sub) => (
                <li key={sub.id} className="border p-3 rounded-lg flex justify-between">
                  {sub.name}
                  <button
        onClick={() => handleDeleteSubcategory(sub.id)}
        className="text-red-500 text-sm hover:text-red-700"
      >
        Delete
      </button>
                </li>
              ))}

              {filteredSubcategories.length === 0 && (
                <p className="text-gray-500">No subcategories</p>
              )}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">
            Select a category to manage subcategories
          </p>
        )}
      </div>
    </div>
  );
}

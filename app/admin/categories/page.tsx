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

interface SubSubcategory {
  id: string;
  name: string;
  slug: string;
  subcategoryId: string;
}

export default function CategoryManagementPage() {
  const [loadingData, setLoadingData] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subsubcategories, setSubSubcategories] = useState<SubSubcategory[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [subcategoryName, setSubcategoryName] = useState("");
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);

  const [subsubcategoryName, setSubSubcategoryName] = useState("");
  const [editingSubSubcategoryId, setEditingSubSubcategoryId] = useState<string | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");

  const fetchData = async () => {
    setLoadingData(true);
    const [catRes, subRes, subsubRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/subcategories"),
      fetch("/api/subsubcategories"),
    ]);

    setCategories(await catRes.json());
    setSubcategories(await subRes.json());
    setSubSubcategories(await subsubRes.json());
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

  // SUBSUBCATEGORY ACTIONS
  const handleAddSubSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubcategoryId) return;

    const method = editingSubSubcategoryId ? "PUT" : "POST";
    const url = editingSubSubcategoryId ? `/api/subsubcategories/${editingSubSubcategoryId}` : "/api/subsubcategories";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subsubcategoryName,
        subcategoryId: selectedSubcategoryId,
      }),
    });

    setSubSubcategoryName("");
    setEditingSubSubcategoryId(null);
    fetchData();
  };

  const handleEditSubSubcategory = (subsub: SubSubcategory) => {
    setSubSubcategoryName(subsub.name);
    setEditingSubSubcategoryId(subsub.id);
  };

  const handleDeleteSubSubcategory = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    await fetch(`/api/subsubcategories/${id}`, { method: "DELETE" });
    fetchData();
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === selectedCategoryId,
  );

  const filteredSubSubcategories = subsubcategories.filter(
    (subsub) => subsub.subcategoryId === selectedSubcategoryId,
  );

  // if (loadingData) return <ShimmerSection />;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#022c75]">Category Management</h1>

      {/* CATEGORY SECTION */}
      {
        loadingData ? <ShimmerSection /> : <>

          <div className="bg-[#e6e6e6] p-6 rounded-xl shadow text-[#022c75] border border-2 border-[#022c75]">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>

            <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4 mb-6">
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
              {categories.map((cat) => {
                const isActive = selectedCategoryId === cat.id;

                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between
          ${isActive
                        ? "bg-[#022c75] text-[#e6e6e6] border-[#022c75]"
                        : "bg-[#e6e6e6] text-[#022c75] border-[#022c75]"
                      }
        `}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-lg">
                        {cat.name}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditCategory(cat); }}
                          className={`${isActive ? "text-[#e6e6e6]" : "text-[#022c75]"} text-sm`}
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

                    <span className="text-xs uppercase tracking-wider font-semibold">
                      {subcategories.filter(s => s.categoryId === cat.id).length} Subcategories
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* SUBCATEGORY SECTION */}
          <div className="bg-[#e6e6e6] p-6 rounded-xl shadow text-[#022c75] border border-2 border-[#022c75]">
            <h2 className="text-xl font-semibold mb-4">
              Subcategories {selectedCategoryId && `for ${categories.find(c => c.id === selectedCategoryId)?.name}`}
            </h2>

            {selectedCategoryId ? (
              <>
                <form onSubmit={handleAddSubcategory} className="flex flex-col md:flex-row gap-4 mb-6">
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
                  {filteredSubcategories.map((sub) => {
                    const isActive = selectedSubcategoryId === sub.id;

                    return (
                      <div
                        key={sub.id}
                        onClick={() => setSelectedSubcategoryId(sub.id)}
                        className={`cursor-pointer p-3 rounded-lg flex justify-between items-center transition-all border
          ${isActive
                            ? "bg-[#022c75] text-[#e6e6e6] border-[#022c75]"
                            : "bg-[#e6e6e6] text-[#022c75] border-[#022c75]"
                          }
        `}
                      >
                        <span className="font-medium">
                          {sub.name}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditSubcategory(sub); }}
                            className={`${isActive ? "text-[#e6e6e6]" : "text-[#022c75]"} text-sm`}
                          >
                            Edit
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteSubcategory(sub.id); }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredSubcategories.length === 0 && (
                    <p className="text-[#022c75] col-span-full py-4 text-center border-2 border-dashed border-[#022c75] rounded-xl">
                      No subcategories in this category
                    </p>
                  )}
                </div>

              </>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-[#022c75] font-medium">
                  Select a category above to manage its subcategories
                </p>
              </div>
            )}
          </div>

          {/* SUBSUBCATEGORY SECTION */}
          <div className="bg-[#e6e6e6] p-6 rounded-xl shadow text-[#022c75]">
            <h2 className="text-xl font-semibold mb-4">
              Third Level Items {selectedSubcategoryId && `for ${subcategories.find(s => s.id === selectedSubcategoryId)?.name}`}
            </h2>

            {selectedSubcategoryId ? (
              <>
                <form onSubmit={handleAddSubSubcategory} className="flex flex-col md:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    required
                    placeholder="Item name"
                    value={subsubcategoryName}
                    onChange={(e) => setSubSubcategoryName(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2"
                  />

                  <button
                    type="submit"
                    className="bg-[#022c75] text-white px-6 py-2 rounded-lg"
                  >
                    {editingSubSubcategoryId ? "Update" : "Add"}
                  </button>

                  {editingSubSubcategoryId && (
                    <button
                      type="button"
                      onClick={() => { setEditingSubSubcategoryId(null); setSubSubcategoryName(""); }}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredSubSubcategories.map((subsub) => (
                    <div key={subsub.id} className="border border-gray-100 p-3 rounded-lg flex justify-between items-center group hover:border-[#022c75] hover:text-[#e6e6e6] hover:bg-[#022c75] transition-colors">
                      <span className="font-medium">{subsub.name}</span>
                      <div className="flex gap-2 ">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditSubSubcategory(subsub); }}
                          className="text-[#022c75] text-sm group-hover:text-[#e6e6e6]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteSubSubcategory(subsub.id); }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredSubSubcategories.length === 0 && (
                    <p className="text-[#022c75] col-span-full py-4 text-center border-2 border-dashed rounded-xl">
                      No items in this subcategory
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-[#022c75] font-medium">
                  Select a subcategory above to manage its items
                </p>
              </div>
            )}
          </div>
        </>
      }
    </div>
  );
}


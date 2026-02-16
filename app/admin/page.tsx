"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75] mb-6">
        Admin Dashboard
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PRODUCTS CARD */}
        <div
          onClick={() => router.push("/admin/products")}
          className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer 
                     hover:shadow-2xl hover:-translate-y-1 
                     transition-all duration-300 border text-[#022c75] "
        >
          {/* <div className="text-5xl mb-4">📦</div> */}
          <h2 className="text-2xl font-semibold text-[#022c75] mb-2">
            Manage Products
          </h2>
          <p className="">
            Add, update, delete and manage all products from here.
          </p>
        </div>

        {/* CATEGORIES CARD */}
        <div
          onClick={() => router.push("/admin/categories")}
          className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer 
                     hover:shadow-2xl hover:-translate-y-1 
                     transition-all duration-300 border text-[#022c75]"
        >
          {/* <div className="text-5xl mb-4">⚙️</div> */}
          <h2 className="text-2xl font-semibold text-[#022c75] mb-2">
            Manage Categories
          </h2>
          <p className="">
            Create and organize product categories and subcategories.
          </p>
        </div>

      </div>
    </div>
  );
}
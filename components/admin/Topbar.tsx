"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-[#022c75]">
        Admin Panel
      </h1>
      <button
        onClick={logout}
        className="bg-[#022c75] text-white px-4 py-2 rounded hover:bg-[#01306b] cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
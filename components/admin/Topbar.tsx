"use client";

import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="bg-[#e6e6e6] shadow px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-[#022c75]"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-[#022c75]">
          Admin Panel
        </h1>
      </div>
      <button
        onClick={logout}
        className="bg-[#022c75] text-white px-4 py-2 rounded hover:bg-[#01306b] cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
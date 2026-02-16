"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/TEKMART LOGO.png";
import Image from "next/image";
import { CircleGauge, ListChevronsDownUp, PackageSearch, Send, ShieldCheckIcon } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin", icon: CircleGauge },
  { name: "Products", path: "/admin/products", icon: PackageSearch },
  { name: "Brands", path: "/admin/brands", icon: ShieldCheckIcon },
  { name: "Categories", path: "/admin/categories", icon: ListChevronsDownUp },
  // { name: "Subcategories", path: "/admin/subcategories" },
  { name: "Queries", path: "/admin/queries", icon: Send },
  { name: "Newsletters", path: "/admin/newsletters", icon: Send },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 transition-transform duration-300 md:relative md:translate-x-0 border-r-4 border-[#022c75]
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <Link href="/admin" className="flex items-center justify-center py-4">
        <div className="h-20 md:h-20 flex items-center pb-2 bg-white ">
          <Image
            src={logo}
            alt="Tekmart Logo"
            className=" h-full w-auto scale-170"
            unoptimized
          />
        </div>
      </Link>

      <nav className="space-y-4">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => onClose?.()}
              className={`px-3 py-2 rounded font-bold flex gap-2 ${isActive
                ? "bg-[#022c75] text-white"
                : "bg-white text-[#022c75]"
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
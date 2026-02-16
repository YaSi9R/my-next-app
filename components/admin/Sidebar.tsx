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

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-64 text-[#022c75] bg-white p-4 sticky top-0 bottom-0 max-h-screen border-r-4 border-[#022c75] ">
      <Link href="/" className="flex items-center justify-center py-4">
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
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/TEKMART LOGO.png";
import Image from "next/image";

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Brands", path: "/admin/brands" },
  { name: "Categories", path: "/admin/categories" },
  // { name: "Subcategories", path: "/admin/subcategories" },
  { name: "Queries", path: "/admin/queries" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#022c75] text-white">
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
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-3 py-2 rounded ${
              pathname === item.path
                ? "bg-white text-[#022c75]"
                : "hover:bg-[#01306b]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
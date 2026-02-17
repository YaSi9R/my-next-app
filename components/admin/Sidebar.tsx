"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/TEKMART LOGO.png";
import Image from "next/image";
import { CircleGauge, ListChevronsDownUp, PackageSearch, Send, ShieldCheckIcon, Settings } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin", icon: CircleGauge },
  { name: "Products", path: "/admin/products", icon: PackageSearch },

  { name: "Categories", path: "/admin/categories", icon: ListChevronsDownUp },
  // { name: "Subcategories", path: "/admin/subcategories" },
  { name: "Queries", path: "/admin/queries", icon: Send },
  { name: "Newsletters", path: "/admin/newsletters", icon: Send },
  { name: "SMT Content", path: "/admin/smt-content", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-[#e6e6e6] p-4 
  transition-transform duration-300 
  md:relative md:translate-x-0 
  border-r-4 border-[#022c75]
  flex flex-col items-center
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
`}>

      <Link href="/admin" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
        <div className="h-20 md:h-20 flex items-center pb-2 ">
          <Image src={logo} alt="Tekmart Logo" className=" h-full w-auto scale-170" priority />
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
              className={`px-14 mt-4 py-2 rounded font-bold flex gap-2 ${isActive
                ? "bg-[#022c75] text-white"
                : "bg-[#e6e6e6] text-[#022c75]"
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
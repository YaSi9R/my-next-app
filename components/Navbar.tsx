"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/TEKMARTTRANSPARENT.png";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubMenuItem {
    name: string;
    href: string;
    children?: SubMenuItem[];
}

interface NavItem {
    name: string;
    href: string;
    children?: SubMenuItem[];
}

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([]);

    const navItems: NavItem[] = [
        {
            name: "About Us",
            href: "/about",
            children: [
                { name: "Company Overview", href: "/about/company" },
                { name: "Why Tekmart", href: "/about/why-tekmart" },
            ],
        },
        {
            name: "SMT Machines",
            href: "/smt-machines",
            children: [
                {
                    name: "Pick & Place Machines",
                    href: "/smt-machines/pick-and-place",
                    children: [
                        { name: "Yamaha", href: "/smt-machines/pick-and-place/yamaha" },
                        { name: "Fuji", href: "/smt-machines/pick-and-place/fuji" },
                        { name: "Panasonic", href: "/smt-machines/pick-and-place/panasonic" },
                        { name: "Other Brands", href: "/smt-machines/pick-and-place/other" },
                    ],
                },
                { name: "Reflow Ovens", href: "/smt-machines/reflow-ovens" },
                { name: "Screen Printers", href: "/smt-machines/screen-printers" },
                { name: "SPI / AOI", href: "/smt-machines/spi-aoi" },
            ],
        },
        {
            name: "SMT Line",
            href: "/smt-line",
            children: [
                {
                    name: "Entry Level SMT Line",
                    href: "/smt-line/entry-level",
                    children: [
                        { name: "Line Flow Diagram", href: "/smt-line/entry-level#diagram" },
                        { name: "Fixed Machine Combination", href: "/smt-line/entry-level#machines" },
                        { name: "Suitable For", href: "/smt-line/entry-level#suitable" },
                        { name: "Short Description", href: "/smt-line/entry-level#description" },
                        { name: "Enquiry / WhatsApp CTA", href: "/smt-line/entry-level#enquiry" },
                    ],
                },
                {
                    name: "Mid-Scale SMT Line",
                    href: "/smt-line/mid-scale",
                    children: [
                        { name: "Line Flow Diagram", href: "/smt-line/mid-scale#diagram" },
                        { name: "Fixed Machine Combination", href: "/smt-line/mid-scale#machines" },
                        { name: "Suitable For", href: "/smt-line/mid-scale#suitable" },
                        { name: "Short Description", href: "/smt-line/mid-scale#description" },
                        { name: "Enquiry / WhatsApp CTA", href: "/smt-line/mid-scale#enquiry" },
                    ],
                },
                {
                    name: "High-Speed SMT Line",
                    href: "/smt-line/high-speed",
                    children: [
                        { name: "Line Flow Diagram", href: "/smt-line/high-speed#diagram" },
                        { name: "Fixed Machine Combination", href: "/smt-line/high-speed#machines" },
                        { name: "Suitable For", href: "/smt-line/high-speed#suitable" },
                        { name: "Short Description", href: "/smt-line/high-speed#description" },
                        { name: "Enquiry / WhatsApp CTA", href: "/smt-line/high-speed#enquiry" },
                    ],
                },
            ],
        },
        {
            name: "SMT Parts",
            href: "/smt-parts",
            children: [
                {
                    name: "Yamaha Parts",
                    href: "/smt-parts/yamaha",
                    children: [
                        { name: "Feeders & Feeder Parts", href: "/smt-parts/yamaha/feeders" },
                        { name: "Nozzles", href: "/smt-parts/yamaha/nozzles" },
                        { name: "Motors / Belts", href: "/smt-parts/yamaha/motors-belts" },
                        { name: "Sensors / Valves", href: "/smt-parts/yamaha/sensors-valves" },
                        {
                            name: "Consumables",
                            href: "/smt-parts/yamaha/consumables",
                            children: [
                                { name: "Solder Paste", href: "/smt-parts/yamaha/consumables/solder-paste" },
                                { name: "Cleaning Solutions", href: "/smt-parts/yamaha/consumables/cleaning" },
                                { name: "Adhesives", href: "/smt-parts/yamaha/consumables/adhesives" },
                            ],
                        },
                    ],
                },
                { name: "Fuji Parts", href: "/smt-parts/fuji" },
                { name: "Panasonic Parts", href: "/smt-parts/panasonic" },
                { name: "Other Brands", href: "/smt-parts/other" },
            ],
        },
        {
            name: "Service & Support",
            href: "/service",
            children: [
                { name: "Installation & Commissioning", href: "/service/installation" },
                { name: "SMT Line Setup & Integration", href: "/service/setup" },
                { name: "Operator & Maintenance Training", href: "/service/training" },
                { name: "Preventive Maintenance", href: "/service/preventive" },
                { name: "Breakdown & Technical Support", href: "/service/technical" },
                { name: "SMT Spare Parts Support", href: "/service/spare-parts" },
            ],
        },
        {
            name: "Our Clients",
            href: "/clients",
            children: [
                { name: "EMS Manufacturers", href: "/clients#ems" },
                { name: "OEM Manufacturers", href: "/clients#oem" },
                { name: "Client Logos Grid", href: "/clients#logos" },
            ],
        },
        {
            name: "Contact Us",
            href: "/contact",
            children: [
                { name: "Phone", href: "/contact#phone" },
                { name: "Email", href: "/contact#email" },
                { name: "Website", href: "/contact#website" },
                { name: "Location", href: "/contact#location" },
                { name: "WhatsApp", href: "/contact#whatsapp" },
                { name: "WeChat", href: "/contact#wechat" },
            ],
        },
    ];

    const toggleMobileSubmenu = (itemName: string) => {
        setOpenMobileMenus((prev) =>
            prev.includes(itemName)
                ? prev.filter((name) => name !== itemName)
                : [...prev, itemName]
        );
    };

    return (
        <nav className="bg-[#022c75] text-[#e6e6e6] sticky top-0 z-50 shadow-lg">
            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div className="h-24 md:h-24 flex items-center">
                        <Image
                            src={logo}
                            alt="Tekmart Logo"
                            className="invert brightness-0 h-full w-auto scale-150"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-1 text-sm">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                className="flex items-center gap-1 px-3 py-2 hover:text-white hover:bg-[#033a95] rounded transition-colors"
                            >
                                {item.name}
                                {item.children && <ChevronDown className="h-4 w-4" />}
                            </Link>

                            {/* First Level Dropdown */}
                            {item.children && (
                                <div className="absolute left-0 top-full mt-1 w-64 bg-white text-[#022c75] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                                    {item.children.map((subItem) => (
                                        <div key={subItem.name} className="relative group/sub">
                                            <Link
                                                href={subItem.href}
                                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                            >
                                                <span>{subItem.name}</span>
                                                {subItem.children && <ChevronRight className="h-4 w-4" />}
                                            </Link>

                                            {/* Second Level Dropdown */}
                                            {subItem.children && (
                                                <div className="absolute left-full top-0 ml-1 w-64 bg-white text-[#022c75] rounded-lg shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 border border-gray-200">
                                                    {subItem.children.map((nestedItem) => (
                                                        <Link
                                                            key={nestedItem.name}
                                                            href={nestedItem.href}
                                                            className="block px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                                        >
                                                            {nestedItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* CTA */}
                    <Link
                        href="/quote"
                        className="bg-white text-[#022c75] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition ml-4"
                    >
                        Get A Quote
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden"
                >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-[#022c75] border-t border-blue-800 overflow-y-auto transition-all duration-300 ${isMobileMenuOpen ? "max-h-[80vh] py-4" : "max-h-0"
                    }`}
            >
                <div className="px-4 space-y-2">
                    {navItems.map((item) => (
                        <div key={item.name}>
                            <div className="flex items-center justify-between">
                                <Link
                                    href={item.href}
                                    className="flex-1 font-medium py-2"
                                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                {item.children && (
                                    <button
                                        onClick={() => toggleMobileSubmenu(item.name)}
                                        className="p-2"
                                    >
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${openMobileMenus.includes(item.name) ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Submenu */}
                            {item.children && openMobileMenus.includes(item.name) && (
                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-700 pl-4">
                                    {item.children.map((subItem) => (
                                        <div key={subItem.name}>
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={subItem.href}
                                                    className="flex-1 text-sm opacity-90 py-2"
                                                    onClick={() => !subItem.children && setIsMobileMenuOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                                {subItem.children && (
                                                    <button
                                                        onClick={() => toggleMobileSubmenu(subItem.name)}
                                                        className="p-2"
                                                    >
                                                        <ChevronDown
                                                            className={`h-3 w-3 transition-transform ${openMobileMenus.includes(subItem.name) ? "rotate-180" : ""
                                                                }`}
                                                        />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Nested Mobile Submenu */}
                                            {subItem.children && openMobileMenus.includes(subItem.name) && (
                                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-600 pl-4">
                                                    {subItem.children.map((nestedItem) => (
                                                        <Link
                                                            key={nestedItem.name}
                                                            href={nestedItem.href}
                                                            className="block text-xs opacity-80 py-2"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {nestedItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <Link
                        href="/quote"
                        className="block bg-white text-[#022c75] text-center py-3 rounded-full font-bold mt-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get A Quote
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

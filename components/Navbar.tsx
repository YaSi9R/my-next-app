"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/TEKMART LOGO.png";
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

const initialNavItems: NavItem[] = [
    {
        name: "About Us",
        href: "/about/company",
        children: [
            { name: "Company Overview", href: "/about/company" },
            { name: "Why Tekmart", href: "/about/why-tekmart" },
        ],
    },
    {
        name: "SMT Machines",
        href: "/smt-machines",
        children: [],
    },
    {
        name: "SMT Line",
        href: "/smt-line",
        children: [
            {
                name: "Entry Level SMT Line",
                href: "/smt-line/entry-level",
                
            },
            {
                name: "Mid-Scale SMT Line",
                href: "/smt-line/mid-scale",
                
            },
            {
                name: "High-Speed SMT Line",
                href: "/smt-line/high-speed",
                
            },
        ],
    },
    {
        name: "SMT Parts",
        href: "/smt-parts",
        children: [],
    },
    {
        name: "Board Handling",
        href: "/board-handling",
        children: [],
    },
    {
        name: "Services",
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
            { name: "Client List", href: "/clients#list" },
            { name: "Case Studies", href: "/clients#case" },
            { name: "What Our Clients Say", href: "/clients#say" },
        ],
    },
];

const GlobalLink = ({ href, children, className, onClick, ...props }: any) => {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) onClick(e);

        // Dispatch event for GlobalLoader
        window.dispatchEvent(new Event("route-change-start"));

        window.scrollTo(0, 0);

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    return (
        <Link href={href} className={className} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([]);
    const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                const response = await fetch('/api/navigation');
                if (!response.ok) return;
                const data = await response.json();
                const { subcategories, brands } = data;

                const dynamicNav = initialNavItems.map(item => {
                    // SMT Machines Logic
                    if (item.name === "SMT Machines") {
                        const smtMachineSubcats = subcategories
                            .filter((s: any) => s.category.slug === 'smt-machines')
                            .sort((a: any, b: any) => {
                                if (a.slug === 'pick-and-place-machines') return -1;
                                if (b.slug === 'pick-and-place-machines') return 1;
                                return 0;
                            });
                        return {
                            ...item,
                            children: smtMachineSubcats.map((s: any) => ({
                                name: s.name,
                                href: `/smt-machines/${s.slug}`,
                                children: s.slug === 'pick-and-place-machines' ? brands.map((b: any) => ({
                                    name: b.name.charAt(0).toUpperCase() + b.name.slice(1),
                                    href: `/smt-machines/pick-and-place-machines/${b.slug}`
                                })) : undefined
                            }))
                        };
                    }

                    // SMT Parts Logic
                    if (item.name === "SMT Parts") {
                        const smtPartsSubcats = subcategories.filter((s: any) => s.category.slug === 'smt-parts');
                        return {
                            ...item,
                            children: brands.map((b: any) => ({
                                name: `${b.name.charAt(0).toUpperCase() + b.name.slice(1)} Parts`,
                                href: `/smt-parts/${b.slug}`,
                                children: smtPartsSubcats.map((s: any) => ({
                                    name: s.name,
                                    href: `/smt-parts/${s.slug}/${b.slug}`
                                }))
                            }))
                        };
                    }

                    // Board Handling Logic
                    if (item.name === "Board Handling") {
                        const boardHandlingSubcats = subcategories.filter((s: any) =>
                            s.category.slug === 'board-handling'
                        );
                        return {
                            ...item,
                            children: boardHandlingSubcats.map((s: any) => ({
                                name: s.name,
                                href: `/board-handling/${s.slug}`,
                                // Map subsubcategories (third level)
                                children: s.subsubcategories?.map((subsub: any) => ({
                                    name: subsub.name,
                                    href: `/board-handling/${s.slug}/${subsub.slug}`
                                }))
                            }))
                        };
                    }

                    return item;
                });

                setNavItems(dynamicNav);
            } catch (error) {
                console.error("Failed to fetch navigation:", error);
            }
        };

        fetchNavigation();
    }, []);

    const toggleMobileSubmenu = (itemName: string) => {
        setOpenMobileMenus((prev) =>
            prev.includes(itemName)
                ? prev.filter((name) => name !== itemName)
                : [...prev, itemName]
        );
    };

    return (
        <nav className="bg-[#e6e6e6] backdrop-blur-md text-[#022c75] sticky top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
                    <div className="h-20 md:h-20 flex items-center pb-2 ">
                        <Image src={logo} alt="Tekmart Logo" className=" h-full w-auto scale-170" priority />
                    </div>
                </Link>

                <div className="hidden xl:flex items-center space-x-0.5 text-[13px] 2xl:text-[14px]">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            <GlobalLink
                                href={item.href}
                                className="flex items-center gap-1 px-2.5 py-1.5 hover:text-white hover:bg-[#022c75] rounded-md transition-all duration-300 font-bold text-[#022c75] whitespace-nowrap group-hover:bg-[#022c75] group-hover:text-white"
                            >
                                {item.name}
                                {item.children && <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />}
                            </GlobalLink>

                            {item.children && (
                                <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-[60]">
                                    <div className="bg-[#e6e6e6] backdrop-blur-sm text-[#022c75] rounded-xl shadow-2xl border border-gray-100 py-2 font-semibold">
                                        {item.children.map((subItem) => (
                                            <div key={subItem.name} className="relative group/sub px-1 hover:z-50 font-semibold">
                                                <GlobalLink
                                                    href={subItem.href}
                                                    className="flex items-center justify-between px-2 font-semibold py-2.5 hover:bg-[#022c75] hover:text-[#e6e6e6] rounded-lg transition-colors group-hover/sub:text-[#022c75]"
                                                >
                                                    <span className="font-semibold text-[13px]">{subItem.name}</span>
                                                    {subItem.children && <ChevronRight className="h-4 w-4 opacity-50 font-semibold" />}
                                                </GlobalLink>

                                                {subItem.children && (
                                                    <div className="absolute left-full ml-2 top-0 w-64 bg-[#e6e6e6] text-[#022c75] rounded-lg shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 border border-gray-200 z-50">
                                                        {subItem.children.map((nestedItem) => (
                                                            <div key={nestedItem.name} className="px-2">
                                                                <GlobalLink
                                                                    href={nestedItem.href}
                                                                    className="block px-3 py-2.5 hover:bg-[#022c75] hover:text-[#e6e6e6] rounded-lg transition-colors text-[12.5px] font-semibold"
                                                                >
                                                                    {nestedItem.name}
                                                                </GlobalLink>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="hidden xl:flex items-center">
                    <GlobalLink
                        href="/quote"
                        className="bg-[#022c75] text-white px-6 py-2 rounded-full font-bold hover:bg-[#033a95] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 ml-6"
                    >
                        Contact Us
                    </GlobalLink>
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="xl:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <svg className="h-8 w-8 text-[#022c75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            <div className={`xl:hidden bg-[#e6e6e6] border-t border-gray-200 overflow-y-auto transition-all duration-300 ${isMobileMenuOpen ? "max-h-[80vh] py-6 shadow-2xl" : "max-h-0"}`}>
                <div className="px-4 space-y-2">
                    {navItems.map((item) => (
                        <div key={item.name}>
                            <div className="flex items-center justify-between">
                                <GlobalLink
                                    href={item.href}
                                    className="flex-1 font-medium py-2"
                                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </GlobalLink>
                                {item.children && (
                                    <button onClick={() => toggleMobileSubmenu(item.name)} className="p-2">
                                        <ChevronDown className={`h-4 w-4 transition-transform ${openMobileMenus.includes(item.name) ? "rotate-180" : ""}`} />
                                    </button>
                                )}
                            </div>

                            {item.children && openMobileMenus.includes(item.name) && (
                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-700 pl-4">
                                    {item.children.map((subItem) => (
                                        <div key={subItem.name}>
                                            <div className="flex items-center justify-between">
                                                <GlobalLink
                                                    href={subItem.href}
                                                    className="flex-1 text-sm opacity-90 py-2"
                                                    onClick={() => !subItem.children && setIsMobileMenuOpen(false)}
                                                >
                                                    {subItem.name}
                                                </GlobalLink>
                                                {subItem.children && (
                                                    <button onClick={() => toggleMobileSubmenu(subItem.name)} className="p-2">
                                                        <ChevronDown className={`h-3 w-3 transition-transform ${openMobileMenus.includes(subItem.name) ? "rotate-180" : ""}`} />
                                                    </button>
                                                )}
                                            </div>

                                            {subItem.children && openMobileMenus.includes(subItem.name) && (
                                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-600 pl-4">
                                                    {subItem.children.map((nestedItem) => (
                                                        <GlobalLink
                                                            key={nestedItem.name}
                                                            href={nestedItem.href}
                                                            className="block text-xs opacity-80 py-2"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {nestedItem.name}
                                                        </GlobalLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <GlobalLink
                        href="/quote"
                        className="block bg-[#022c75] text-[#e6e6e6] text-center py-3 rounded-xl font-bold mt-4 shadow-md active:scale-95 transition-transform"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get A Quote
                    </GlobalLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

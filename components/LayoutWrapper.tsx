"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingContactBar from "@/components/FloatingContactBar";

import GlobalLoader from "@/components/GlobalLoader";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login");

  return (
    <>
      <GlobalLoader />
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
      {!isAdminRoute && <FloatingContactBar />}
    </>
  );
}
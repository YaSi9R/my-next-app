"use client";

import { Suspense } from "react";
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
      <Suspense fallback={null}>
        <GlobalLoader />
      </Suspense>
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "pb-32 md:pb-0" : ""}>
        {children}
        {!isAdminRoute && <Footer />}
      </main>
      {!isAdminRoute && <BackToTop />}
      {!isAdminRoute && <FloatingContactBar />}
    </>
  );
}
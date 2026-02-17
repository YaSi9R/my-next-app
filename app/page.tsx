"use client"
import { HeroSlider } from "@/components/homepage/HeroSlider";
import CategoryGrid from "@/components/homepage/CategoryGrid";
import ProductsSection from "@/components/homepage/ProductsSection";

import BrandSlider from "@/components/homepage/BrandSlider";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import AboutSection from "@/components/homepage/AboutSection";
import ContactSection from "@/components/homepage/ContactSection";
import heroBanner from "../public/heroBanner.jpg";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const getData = async () => {
    try {
      const data = await fetch("/api/products");
      const dds = await data.json();
      console.log("response", dds);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <HeroSlider />
      <CategoryGrid />




      <FeaturesSection />

      <ProductsSection />
      <AboutSection />

      <BrandSlider />
      <ServicesSection />
      {/* CTA Banner */}
    
      <div className="h-[80px] bg-[#022c75]"></div>


      <ContactSection />


      <main className="container mx-auto py-16 px-4">

      </main>
    </div>
  );
}

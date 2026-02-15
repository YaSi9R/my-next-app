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
  const fetch=async()=>{
    const data=await fetch("/api/products");
    const dds=await data.json();
    console.log("rspose",dds)
  }
  useEffect(()=>{
    fetch();
  },[])
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
            <section className="bg-[#e6e6e6] py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="text-[#022c75] text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Boost Your Business with TekMart?
                            </h2>
                            <p className="text-[#022c75]/80 text-lg">
                                Let TekMart's expertise and experience propel your brand to greater heights. Book a consultation today to find out how.
                            </p>
                        </div>
                    </div>

                </div>

            </section>
            <div className="h-[80px] bg-[#022c75]"></div>


      <ContactSection />

     
      <main className="container mx-auto py-16 px-4">

      </main>
    </div>
  );
}

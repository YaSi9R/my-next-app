import { HeroSlider } from "@/components/homepage/HeroSlider";
import CategoryGrid from "@/components/homepage/CategoryGrid";
import ProductsSection from "@/components/homepage/ProductsSection";
import MachineSlider from "@/components/homepage/MachineSlider";
import BrandSlider from "@/components/homepage/BrandSlider";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import AboutSection from "@/components/homepage/AboutSection";
import ContactSection from "@/components/homepage/ContactSection";
import heroBanner from "../public/heroBanner.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <HeroSlider />
      <CategoryGrid />




      <FeaturesSection />
      {/* <MachineSlider /> */}
      <ProductsSection />
      <AboutSection />
      {/* <div className="relative w-full h-[80vh]">
        <Image
          src={heroBanner}
          alt="Contact"
          fill
          priority
          className="object-cover"
        />
      </div> */}
      <BrandSlider />
      <ServicesSection />

      <ContactSection />

      {/* Rest of the page content can go here */}
      <main className="container mx-auto py-16 px-4">

      </main>
    </div>
  );
}

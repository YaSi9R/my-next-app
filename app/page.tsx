import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import MachineSlider from "@/components/MachineSlider";
import BrandSlider from "@/components/BrandSlider";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import heroBanner from "../public/heroBanner.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <HeroSlider />
      <ProductsSection />
      <MachineSlider />
      <BrandSlider />
      <FeaturesSection />
      <AboutSection />
      <div className="relative w-full h-[80vh]">
        <Image
          src={heroBanner}
          alt="Contact"
          fill
          priority
          className="object-cover"
        />
      </div>
      <ServicesSection />

      <ContactSection />

      {/* Rest of the page content can go here */}
      <main className="container mx-auto py-16 px-4">

      </main>
    </div>
  );
}

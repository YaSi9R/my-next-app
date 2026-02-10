import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import MachineSlider from "@/components/MachineSlider";
import BrandSlider from "@/components/BrandSlider";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <HeroSlider />
      <ProductsSection />
      <MachineSlider />
      <BrandSlider />
      <FeaturesSection />
      <ServicesSection />

      {/* Rest of the page content can go here */}
      <main className="container mx-auto py-16 px-4">

      </main>
    </div>
  );
}

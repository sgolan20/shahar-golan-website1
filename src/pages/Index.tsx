
import HeroSection from "@/components/home/HeroSection";
import VideoSection from "@/components/home/VideoSection";
import GallerySection from "@/components/home/GallerySection";
import OrganizationsSection from "@/components/home/OrganizationsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ValueSection from "@/components/home/ValueSection";
import CtaSection from "@/components/home/CtaSection";
import StructuredData from "@/components/home/StructuredData";

const Index = () => {
  return (
    <div>
      <StructuredData />
      <HeroSection />
      <ServicesSection />
      <VideoSection />
      <GallerySection />
      <OrganizationsSection />
      <ValueSection />
      <CtaSection />
    </div>
  );
};

export default Index;

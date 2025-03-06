
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import VideoSection from "@/components/home/VideoSection";
import YoutubeSection from "@/components/home/YoutubeSection";
import GallerySection from "@/components/home/GallerySection";
import OrganizationsSection from "@/components/home/OrganizationsSection";
import ServicesSection from "@/components/home/ServicesSection";
import BlogSection from "@/components/home/BlogSection";
import ValueSection from "@/components/home/ValueSection";
import CtaSection from "@/components/home/CtaSection";
import StructuredData from "@/components/home/StructuredData";

const Index = () => {
  return (
    <div>
      <StructuredData />
      <HeroSection />
      <StatsSection />
      <VideoSection />
      <YoutubeSection />
      <GallerySection />
      <OrganizationsSection />
      <ServicesSection />
      <BlogSection />
      <ValueSection />
      <CtaSection />
    </div>
  );
};

export default Index;

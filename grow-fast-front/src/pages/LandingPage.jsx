import Footer from "../components/layout/Footer";
import CTASection from "../components/ui/Ctasection";
import { FAQSection } from "../components/ui/Faqsection";
import FeaturesSection from "../components/ui/Featuressection";
import GallerySection from "../components/ui/Gallerysection";
import HeroSection from "../components/ui/HeroSection";
import Navbar from "../components/ui/LandingNavbar";
import PricingSection from "../components/ui/Pricingsection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

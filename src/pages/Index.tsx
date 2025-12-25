import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AlertsCarousel from "@/components/home/AlertsCarousel";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import LiveThreatsMap from "@/components/home/LiveThreatsMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AlertsCarousel />
        <FeaturesGrid />
        <LiveThreatsMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

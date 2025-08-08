import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import WesternGhatsXIntro from "@/components/WesternGhatsXIntro";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <HeroSlider />
        <WesternGhatsXIntro />
      </div>
    </div>
  );
};

export default Index;

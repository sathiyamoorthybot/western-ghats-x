import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import WesternGhatsXIntro from "@/components/WesternGhatsXIntro";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-5 md:pt-8">

        <HeroSlider className="pb-10" />
        <WesternGhatsXIntro />
      </div>
    </div>
  );
};

export default Index;

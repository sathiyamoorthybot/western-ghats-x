

import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import WesternGhatsXIntro from "@/components/WesternGhatsXIntro";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <HeroSlider />
        <WesternGhatsXIntro />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

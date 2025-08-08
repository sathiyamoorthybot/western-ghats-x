import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import WesternGhatsXIntro from "@/components/WesternGhatsXIntro";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 space-y-16">
        <HeroSlider />
        <WesternGhatsXIntro />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

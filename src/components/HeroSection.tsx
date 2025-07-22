import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mountain.jpg";
import { MapPin, Calendar, Users } from "lucide-react";
const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex justify-center mb-4">
          
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Kattanji Hills
          <span className="block text-mountain-orange">Marathon 2025</span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-4 font-light opacity-90">
          Presented by Western Ghats X
        </p>
        
        <p className="text-base sm:text-lg lg:text-xl mb-8 font-light opacity-80">
          Run Through the Heart of Coimbatore's Majestic Kattanji Hills
        </p>

        {/* Event Details */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm sm:text-base">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="w-5 h-5 text-mountain-orange" />
            <span>Coming Soon - 2025 Edition</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <MapPin className="w-5 h-5 text-mountain-orange" />
            <span>Kattanji Hills, Kerala</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="w-5 h-5 text-mountain-orange" />
            <span>All Skill Levels Welcome</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/registration">
            <Button size="lg" className="bg-gradient-to-r from-mountain-green to-primary-hover text-white px-8 py-4 text-lg font-semibold rounded-full shadow-button hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Register Now
            </Button>
          </Link>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("race-categories")} className="bg-white/10 backdrop-blur-sm border-white/30 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
            View Race Categories
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>;
};
export default HeroSection;
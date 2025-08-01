import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Calendar, MapPin, Trophy, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-mountain.jpg";

const heroData = [
  {
    id: "sbl",
    category: "Cricket Tournament",
    title: "Saravanampatti Blasters League",
    tagline: "Where Champions Rise",
    description: "Experience the thrill of competitive cricket in our high-energy 6-over tournament format.",
    backgroundImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3",
    stats: [
      { label: "Teams", value: "16", icon: Users },
      { label: "Prize Pool", value: "₹9K", icon: Trophy },
      { label: "Overs", value: "6", icon: Star },
    ],
    date: "August 31, 2025",
    venue: "Ten Sports Turf, Saravanampatti",
    primaryAction: { text: "Register Now", link: "/cricket-tournament" },
    secondaryAction: { text: "Learn More", link: "/sbl" }
  },
  {
    id: "marathon",
    category: "Marathon Event",
    title: "Kattanji Hills Marathon",
    tagline: "Conquer the Hills",
    description: "Challenge yourself through the majestic trails of Kattanji Hills with breathtaking views.",
    backgroundImage: heroImage,
    stats: [
      { label: "Distance", value: "21K", icon: MapPin },
      { label: "Elevation", value: "850m", icon: Star },
      { label: "Difficulty", value: "Moderate", icon: Trophy },
    ],
    date: "Coming Soon - 2025",
    venue: "Kattanji Hills, Coimbatore",
    primaryAction: null,
    secondaryAction: { text: "Explore Routes", link: "/kattanji-marathon" }
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroData.length);
      setIsAnimating(false);
    }, 600);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + heroData.length) % heroData.length);
      setIsAnimating(false);
    }, 600);
  };

  const currentHero = heroData[activeIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        {heroData.map((hero, index) => (
          <div
            key={hero.id}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
              index === activeIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{ 
              backgroundImage: `url(${hero.backgroundImage})`,
              filter: index === activeIndex ? 'brightness(0.6)' : 'brightness(0.4)'
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left content */}
          <div className={`space-y-8 transition-all duration-700 ease-out ${
            isAnimating ? 'opacity-0 translate-x-[-50px]' : 'opacity-100 translate-x-0'
          }`}>
            
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 bg-mountain-orange/20 border border-mountain-orange/30 rounded-full px-4 py-2 text-mountain-orange text-sm font-medium backdrop-blur-sm">
              <Play className="w-4 h-4 fill-current" />
              {currentHero.category}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {currentHero.title.split(' ').map((word, i) => (
                  <span key={i} className={i === currentHero.title.split(' ').length - 1 ? 'text-mountain-orange' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl sm:text-2xl text-mountain-orange font-light">
                {currentHero.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 leading-relaxed max-w-lg">
              {currentHero.description}
            </p>

            {/* Event info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white">
                <Calendar className="w-5 h-5 text-mountain-orange" />
                <span className="text-lg">{currentHero.date}</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="w-5 h-5 text-mountain-orange" />
                <span className="text-lg">{currentHero.venue}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {currentHero.primaryAction && (
                <Link to={currentHero.primaryAction.link}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-mountain-orange to-mountain-green text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                  >
                    {currentHero.primaryAction.text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              <Link to={currentHero.secondaryAction.link}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  {currentHero.secondaryAction.text}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ease-out ${
            isAnimating ? 'opacity-0 translate-x-[50px]' : 'opacity-100 translate-x-0'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {currentHero.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 group"
                >
                  <stat.icon className="w-8 h-8 text-mountain-orange mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== activeIndex && !isAnimating) {
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveIndex(index);
                  setIsAnimating(false);
                }, 600);
              }
            }}
            className={`w-12 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-mountain-orange shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Side navigation arrows */}
      <button
        onClick={handlePrevious}
        disabled={isAnimating}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 disabled:opacity-50"
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </button>
      
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 disabled:opacity-50"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSlider;
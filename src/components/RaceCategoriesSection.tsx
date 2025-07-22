import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { MapPin, Clock, Medal, Coffee } from "lucide-react";

const raceCategories = [
  {
    id: "5k",
    name: "5K Fun Run",
    distance: "5 Kilometers",
    price: 699,
    description: "Perfect for beginners and families. Scenic foothills road and terrain loop around the beautiful Kattanji Hills.",
    route: "Foothills Loop",
    duration: "30-45 mins",
    highlights: ["Family Friendly", "Scenic Views", "Beginner Level"],
    mapImage: "/lovable-uploads/458a1e96-7612-418d-aaa3-7b27080522c8.png"
  },
  {
    id: "10k",
    name: "10K Challenge",
    distance: "10 Kilometers", 
    price: 1299,
    description: "Intermediate challenge through foothills road and terrain loop with extended mountain views around Kattanji Hills.",
    route: "Extended Foothills Circuit",
    duration: "45-75 mins",
    highlights: ["Moderate Challenge", "Mountain Views", "Trail Experience"],
    mapImage: "/lovable-uploads/b58b10f1-deff-4e95-b1db-7a23eedc91a7.png"
  },
  {
    id: "half-marathon",
    name: "Half Marathon",
    distance: "21.1 Kilometers",
    price: 1999,
    description: "The ultimate challenge! Route from UIT College → Kanuvaipalayam Mountain Pass → Jothipuram → Bujanganur → Bilichigowdanur → Swarnamalai Foothill → return via Kanuvaipalayam.",
    route: "UIT College to Swarnamalai Circuit",
    duration: "1.5-3 hours",
    highlights: ["Epic Challenge", "Mountain Pass", "Village Trail", "Swarnamalai Foothill"],
    mapImage: "/lovable-uploads/67641b8e-6bc7-4a05-8ea5-71ef09aea029.png"
  }
];

const RaceCategoriesSection = () => {

  const calculateTotal = (price: number) => {
    const gst = Math.round(price * 0.18);
    const serviceFee = Math.round(price * 0.0236);
    return price + gst + serviceFee;
  };

  return (
    <section id="race-categories" className="py-16 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-mountain-green">Challenge</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From scenic family runs to epic mountain challenges, find the perfect race for your fitness level and adventure spirit.
          </p>
        </div>

        {/* Race Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {raceCategories.map((race, index) => (
            <Card 
              key={race.id} 
              className="relative overflow-hidden shadow-card hover:shadow-mountain transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardHeader className="bg-gradient-to-br from-mountain-green to-mountain-blue text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{race.name}</CardTitle>
                    <p className="text-lg opacity-90">{race.distance}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    ₹{race.price.toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Route Map Image */}
                <div className="mb-4">
                  <AspectRatio ratio={1} className="rounded-lg overflow-hidden">
                    <img 
                      src={race.mapImage} 
                      alt={`${race.name} route map`}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </AspectRatio>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {race.description}
                </p>

                {/* Race Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-mountain-green" />
                    <span className="font-medium">{race.route}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-mountain-blue" />
                    <span>Expected Duration: {race.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {race.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-accent/50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Medal className="w-3 h-3" />
                      <span>Finisher Medal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-3 h-3" />
                      <span>Post-race Breakfast</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className="w-3 h-3" />
                      <span>Certificate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-mountain-green rounded-full flex-shrink-0" />
                      <span>Race T-shirt</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="text-xs text-muted-foreground mb-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{race.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{Math.round(race.price * 0.18)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee (2.36%):</span>
                    <span>₹{Math.round(race.price * 0.0236)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total:</span>
                    <span>₹{calculateTotal(race.price)}</span>
                  </div>
                </div>

                <Link to="/registration" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-mountain-green to-primary-hover text-white hover:shadow-button transition-all duration-300">
                    Register for {race.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center bg-mountain-gray/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Limited Slots Available!</h3>
          <p className="text-muted-foreground">
            Early bird registration is now open. Secure your spot in this scenic mountain marathon experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RaceCategoriesSection;

import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Clock, Coffee, Medal, Heart, Users } from "lucide-react";

const benefits = [
  {
    icon: Mountain,
    title: "Scenic Mountain & Village Trails",
    description: "Experience breathtaking views of Kattanji Hills while running through traditional villages and mountain passes."
  },
  {
    icon: Clock,
    title: "Professionally Timed Event",
    description: "Accurate chip timing with live tracking and instant results to monitor your performance throughout the race."
  },
  {
    icon: Coffee,
    title: "Post-Race Breakfast",
    description: "Enjoy a nutritious and delicious breakfast featuring local Coimbatore specialties after your run."
  },
  {
    icon: Medal,
    title: "Finisher Medal & Certificate",
    description: "Take home a beautifully designed medal and personalized certificate to commemorate your achievement."
  },
  {
    icon: Heart,
    title: "Local Cultural Experience",
    description: "Immerse yourself in the rich culture of rural Coimbatore with local music, food, and warm hospitality."
  },
  {
    icon: Users,
    title: "Community of Runners",
    description: "Join a vibrant community of fitness enthusiasts and make lasting connections with fellow runners."
  }
];

const WhyJoinSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Join the <span className="text-mountain-green">Adventure</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just a race - it's an unforgettable journey through one of South India's most beautiful landscapes
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-mountain transition-all duration-300 transform hover:-translate-y-1 border-border/50 hover:border-mountain-green/30"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-mountain-green/20 to-mountain-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-mountain-green" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-mountain-green/10 to-mountain-blue/10 border-mountain-green/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for the Challenge?
              </h3>
              <p className="text-muted-foreground mb-6">
                Whether you're a seasoned marathoner or a weekend warrior, the Kattanji Hills Marathon 
                offers an experience that will challenge your limits and reward your spirit.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-mountain-green rounded-full"></div>
                  <span>All fitness levels welcome</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-mountain-blue rounded-full"></div>
                  <span>Medical support available</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-mountain-brown rounded-full"></div>
                  <span>Hydration stations every 2km</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
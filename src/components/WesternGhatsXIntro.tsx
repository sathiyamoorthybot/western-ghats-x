import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Users, Calendar, Trophy } from "lucide-react";
const WesternGhatsXIntro = () => {
  return <section className="py-16 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="text-mountain-green">Western Ghats X</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Fueling the next-gen sporting movement across Coimbatore. We organize premium outdoor adventures, marathons, cricket tournaments, and diverse sporting events that bring communities together and celebrate the spirit of competition.</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Western Ghats X */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Mountain className="w-8 h-8 text-mountain-green" />
              <h3 className="text-2xl font-bold text-foreground">Who We Are</h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Western Ghats X is more than just an event organizer – we're adventure enthusiasts, 
              community builders, and champions of outdoor sports. Based in the heart of Coimbatore, 
              we leverage the natural beauty of the Western Ghats to create unforgettable sporting experiences.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              From trail running through scenic mountain paths to high-energy cricket tournaments, 
              we believe in bringing people together through the universal language of sports and adventure.
            </p>

          </div>

          {/* Our Events */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Upcoming Events</h3>
            
            {/* Saravanampatti Blasters League */}
            <Card className="hover:shadow-mountain transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-foreground">Saravanampatti Blasters League - Season 1</h4>
                  <Badge variant="secondary" className="bg-mountain-blue/20 text-mountain-blue">
                    Cricket
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  High-energy 6-over cricket tournament featuring 16 teams in a knockout format. 
                  Professional turf venue with umpired matches and exciting prize pool.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>August 31, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>₹8,000 Prize</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kattanji Hills Marathon */}
            <Card className="hover:shadow-mountain transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-foreground">Kattanji Hills Marathon</h4>
                  <Badge variant="secondary" className="bg-mountain-green/20 text-mountain-green">
                    Trail Running
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Run for Nature at Kattanji Hills, Coimbatore.
Discover the scenic trails of Kattanji Hills near Periyanaickenpalayam — known for its natural beauty, Thandi Perumal Kovil, and eco-friendly initiatives.

🏃 Choose your distance: 5K | 10K | Half Marathon
Perfect for all fitness levels.

Join us where spirituality meets sustainability, and every step supports a cleaner, greener future.


                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>2025 Edition</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mountain className="w-4 h-4" />
                    <span>Scenic Trail</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-mountain-gray/10 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Our Mission</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            To create world-class sporting events that celebrate the natural beauty of the Western Ghats 
            while fostering community spirit, promoting fitness, and providing unforgettable experiences 
            for athletes of all levels.
          </p>
        </div>
      </div>
    </section>;
};
export default WesternGhatsXIntro;

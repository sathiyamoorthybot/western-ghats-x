import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mountain, TreePine, Home, Clock } from "lucide-react";

const routeDetails = [
  {
    id: "5k",
    name: "5K Fun Run",
    description: "Scenic loop around the foothills",
    waypoints: [
      { name: "Start/Finish", icon: Home, description: "Event Base Camp" },
      { name: "Foothill Trail", icon: TreePine, description: "Gentle slope through forest" },
      { name: "Scenic Viewpoint", icon: Mountain, description: "Mountain vista" },
      { name: "Return Loop", icon: MapPin, description: "Back to base" }
    ],
    difficulty: "Easy",
    elevation: "Minimal",
    surface: "Road & Light Trail"
  },
  {
    id: "10k",
    name: "10K Challenge", 
    description: "Extended circuit with more challenging terrain",
    waypoints: [
      { name: "Start/Finish", icon: Home, description: "Event Base Camp" },
      { name: "Foothill Extension", icon: TreePine, description: "Deeper into the hills" },
      { name: "Hill Climb", icon: Mountain, description: "Moderate ascent" },
      { name: "Ridge Trail", icon: MapPin, description: "Panoramic views" },
      { name: "Valley Return", icon: TreePine, description: "Descent through valley" }
    ],
    difficulty: "Moderate",
    elevation: "Rolling Hills",
    surface: "Mixed Road & Trail"
  },
  {
    id: "half-marathon",
    name: "Half Marathon",
    description: "Epic journey through villages and mountain passes",
    waypoints: [
      { name: "UIT College", icon: Home, description: "Start Point" },
      { name: "Kanuvaipalayam Pass", icon: Mountain, description: "Mountain Pass Challenge" },
      { name: "Jothipuram Village", icon: MapPin, description: "Traditional village" },
      { name: "Bujanganur", icon: TreePine, description: "Rural landscape" },
      { name: "Bilichigowdanur", icon: MapPin, description: "Heritage site" },
      { name: "Swarnamalai Foothill", icon: Mountain, description: "Sacred hill base" },
      { name: "Return via Kanuvaipalayam", icon: Home, description: "Finish at UIT College" }
    ],
    difficulty: "Challenging",
    elevation: "Significant Climbs",
    surface: "Road, Trail & Village Paths"
  }
];

const RouteMapSection = () => {
  return (
    <section id="route-map" className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Discover the <span className="text-mountain-blue">Routes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each route offers unique challenges and breathtaking views of the Kattanji Hills landscape
          </p>
        </div>

        {/* Route Cards */}
        <div className="space-y-8">
          {routeDetails.map((route, index) => (
            <Card key={route.id} className="shadow-card hover:shadow-mountain transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{route.name}</CardTitle>
                    <p className="text-lg opacity-90">{route.description}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {route.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Route Details */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-lg mb-4 text-foreground">Route Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mountain className="w-4 h-4 text-mountain-green" />
                        <span className="text-sm">
                          <strong>Difficulty:</strong> {route.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-mountain-blue" />
                        <span className="text-sm">
                          <strong>Elevation:</strong> {route.elevation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-mountain-brown" />
                        <span className="text-sm">
                          <strong>Surface:</strong> {route.surface}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Waypoints */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-lg mb-4 text-foreground">Key Waypoints</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {route.waypoints.map((waypoint, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-mountain-green/20 rounded-full flex items-center justify-center">
                            <waypoint.icon className="w-4 h-4 text-mountain-green" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">{waypoint.name}</h5>
                            <p className="text-xs text-muted-foreground">{waypoint.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Route Visualization */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <MapPin className="w-12 h-12 text-mountain-blue mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Detailed route maps and GPX files will be shared with registered participants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-mountain-green/10 to-mountain-blue/10 border-mountain-green/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Interactive Route Maps Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                We're preparing detailed interactive maps with elevation profiles, water stations, 
                and medical support points. All registered participants will receive complete route guides.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RouteMapSection;
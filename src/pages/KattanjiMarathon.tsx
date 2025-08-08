import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import kattanjiTrail from "@/assets/kattanji-trail.jpg";
import marathonRunners from "@/assets/marathon-runners.jpg";
import marathonFinish from "@/assets/marathon-finish.jpg";

const KattanjiMarathon = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-r from-mountain-green to-primary-hover text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Kattanji Hills Marathon 2025
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Experience the breathtaking trails of Kattanji Hills while
            challenging your endurance in our annual marathon event.
          </p>
          <Button
            className="bg-white text-mountain-green font-semibold hover:bg-white/90"
          >
            Registrations Opening Soon
          </Button>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden border-0 shadow-lg">
            <img
              src={kattanjiTrail}
              alt="Scenic Kattanji Trail"
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Scenic Trail
              </h3>
              <p className="text-muted-foreground">
                Enjoy breathtaking landscapes, lush greenery, and peaceful
                trails as you run.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg">
            <img
              src={marathonRunners}
              alt="Marathon Runners"
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Community Spirit
              </h3>
              <p className="text-muted-foreground">
                Join hundreds of runners from across the country for this
                exciting challenge.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg sm:col-span-2 lg:col-span-1">
            <img
              src={marathonFinish}
              alt="Finish Line"
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Celebration at the Finish
              </h3>
              <p className="text-muted-foreground">
                Cross the finish line to cheers, music, and a festive
                celebration.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default KattanjiMarathon;

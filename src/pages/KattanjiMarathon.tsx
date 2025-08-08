import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import kattanjiTrail from "@/assets/kattanji-trail.jpg";
import marathonRunners from "@/assets/marathon-runners.jpg";
import marathonFinish from "@/assets/marathon-finish.jpg";

export default function KattanjiMarathon() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                Kattanji Hills Marathon <span className="text-mountain-green">2025</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                December 2025 | Eco-Conscious Trail Run
              </p>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-center">
              <img
                src={kattanjiTrail}
                alt="Kattanji Trail"
                className="rounded-lg shadow-md h-80 w-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-mountain-green">
                  Run Through the Majestic Kattanji Hills
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Conquer the hills, connect with nature, and be part of an eco-conscious running revolution.
                </p>
                <p className="mb-4 text-muted-foreground">
                  Located near Periyanaickenpalayam, this trail winds through sacred temples, pristine forests, and conservation zones.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-mountain-green to-primary-hover hover:from-mountain-green hover:to-primary"
                >
                  <Link to="#" className="text-white">
                    Registrations Opening Soon!
                  </Link>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  Early bird coupons and route reveals coming your way. Stay tuned!
                </p>
              </div>
            </div>

            <Separator className="my-12 border-muted-foreground" />

            {/* Choose Your Challenge */}
            <Card className="mb-8 border-mountain-green bg-background">
              <CardHeader>
                <CardTitle className="text-foreground">Choose Your Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "5K", desc: "Great for families & first-timers" },
                    { title: "10K", desc: "Push your pace on scenic trails" },
                    { title: "Half Marathon", desc: "Endurance with elevation" },
                  ].map((cat, idx) => (
                    <div key={idx} className="bg-mountain-green/10 p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-mountain-green mb-2">{cat.title}</h3>
                      <p className="text-muted-foreground">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                <img
                  src={marathonRunners}
                  alt="Marathon Runners"
                  className="w-full h-72 object-cover mt-6 rounded-2xl shadow-lg"
                />
              </CardContent>
            </Card>

            {/* More Than Just a Race */}
            <Card className="mb-8 border-mountain-green bg-background">
              <CardHeader>
                <CardTitle className="text-foreground">More Than Just a Race</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-muted-foreground">
                  Your steps support environmental awareness and conservation in the region.
                </p>
                <p className="text-muted-foreground">
                  Join us in promoting sustainability and protecting our trails.
                </p>
              </CardContent>
            </Card>

            {/* Why Run at Kattanji Hills? */}
            <Card className="mb-8 border-mountain-green bg-background">
              <CardHeader>
                <CardTitle className="text-foreground">Why Run at Kattanji Hills?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-muted-foreground">
                  <p>
                    Explore breathtaking natural trails and ancient temple paths that weave through the heart of the Western Ghats — a journey as spiritual as it is scenic.
                  </p>
                  <p>
                    Run with purpose in an event driven by an eco-conscious mission, rooted in collaboration with the local community and care for the environment.
                  </p>
                  <p>
                    Celebrate spirit, stamina, and sustainability in a single run — where every step honors nature, culture, and personal grit.
                  </p>
                </div>
                <img
                  src={marathonFinish}
                  alt="Finish Line"
                  className="w-full h-72 object-cover mt-6 rounded-2xl shadow-lg"
                />
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="mb-12 border-mountain-green bg-background">
              <CardHeader>
                <CardTitle className="text-foreground">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="q1">
                    <AccordionTrigger className="text-mountain-green bg-mountain-green/10 rounded-md">
                      When will registrations open?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Registrations will open in October 2025 with early bird offers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger className="text-mountain-green bg-mountain-green/10 rounded-md">
                      Where exactly is the starting point?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      The starting point is at Kattanji Hills base camp, near Periyanaickenpalayam.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger className="text-mountain-green bg-mountain-green/10 rounded-md">
                      Are there participation limits?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, slots are limited for each category to ensure safety and environmental care.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      <Footer />
    </div>
  );
}

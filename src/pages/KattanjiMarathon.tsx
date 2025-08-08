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

      {/* Breadcrumb header with dark background */}
      <div className="relative bg-gray-900 text-white rounded-xl overflow-hidden mb-8 shadow-md">
        <div
          className="relative z-10 text-center px-6 py-20"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <nav className="text-sm mb-2 flex justify-center text-muted-foreground">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:underline text-mountain-green">Home</Link>
              </li>
              <li>/</li>
              <li className="text-mountain-green font-semibold">Kattanji Marathon</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-foreground">Kattanji Hills Marathon 2025</h1>
          <p className="text-lg mt-1 text-muted-foreground">December 2025 | Eco-Conscious Trail Run</p>
        </div>
      </div>

      {/* Page content with padding */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <img
            src={kattanjiTrail}
            alt="Kattanji Trail"
            className="rounded-lg shadow-md h-80 object-cover w-full"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-mountain-green">Run Through the Majestic Kattanji Hills</h2>
            <p className="mb-4 text-muted-foreground">
              Conquer the hills, connect with nature, and be part of an eco-conscious running revolution.
            </p>
            <p className="mb-2 text-muted-foreground"><strong>Location:</strong> Near Periyanaickenpalayam, winding through sacred temples, pristine forests, and conservation zones.</p>
            <p className="mb-4 text-muted-foreground"><strong>Event Month:</strong> December 2025</p>
            <Button asChild className="bg-gradient-to-r from-mountain-green to-primary-hover hover:from-mountain-green hover:to-primary">
              <Link to="#" className="text-white">Registrations Opening Soon</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8 border-muted-foreground" />

        {/* Categories */}
        <Card className="mb-8 border-mountain-green bg-background">
          <CardHeader>
            <CardTitle className="text-foreground">Choose Your Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
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

        {/* Conservation Message */}
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

        {/* Why Kattanji? */}
        <Card className="mb-8 border-mountain-green bg-background">
          <CardHeader>
            <CardTitle className="text-foreground">Why Run at Kattanji Hills?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center text-muted-foreground">
              <p>Explore breathtaking natural trails and ancient temple paths that weave through the heart of the Western Ghats — a journey as spiritual as it is scenic.</p>
              <p>Run with purpose in an event driven by an eco-conscious mission, rooted in collaboration with the local community and care for the environment.</p>
              <p>Celebrate spirit, stamina, and sustainability in a single run — where every step honors nature, culture, and personal grit.</p>
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

      <Footer />
    </div>
  );
}

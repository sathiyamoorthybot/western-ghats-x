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
    <div className="bg-white text-gray-900">
      <Header />

      {/* Green breadcrumb header */}
      <div className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white text-white rounded-xl overflow-hidden mb-8 shadow-md">
        <div
          className="relative z-10 text-center"
          style={{
            paddingTop: "100px",
            paddingBottom: "40px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <nav className="text-sm mb-2 flex justify-center">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>/</li>
              <li className="text-gray-200">Kattanji Marathon</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold">Kattanji Hills Marathon 2025</h1>
          <p className="text-lg mt-1">December 2025 | Eco-Conscious Trail Run</p>
        </div>
      </div>

      {/* Page content with margins */}
      <div className="px-4 md:px-32 lg:px-64">
        
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <img
            src={kattanjiTrail}
            alt="Kattanji Trail"
            className="rounded-lg shadow-md h-80 object-cover w-full"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">Run Through the Majestic Kattanji Hills</h2>
            <p className="mb-4">
              Conquer the hills, connect with nature, and be part of an eco-conscious running revolution.
            </p>
            <p className="mb-2"><strong>Location:</strong> Near Periyanaickenpalayam, winding through sacred temples, pristine forests, and conservation zones.</p>
            <p className="mb-4"><strong>Event Month:</strong> December 2025</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="#">Registrations Opening Soon</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Categories */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Choose Your Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "5K", desc: "Great for families & first-timers" },
                { title: "10K", desc: "Push your pace on scenic trails" },
                { title: "Half Marathon", desc: "Endurance with elevation" },
              ].map((cat, idx) => (
                <div key={idx} className="bg-green-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">{cat.title}</h3>
                  <p className="text-gray-700">{cat.desc}</p>
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
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>More Than Just a Race</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Your steps support environmental awareness and conservation in the region.
            </p>
            <p>
              Join us in promoting sustainability and protecting our trails.
            </p>
          </CardContent>
        </Card>

        {/* Why Kattanji? */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Why Run at Kattanji Hills?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
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
        <Card className="mb-12 border-green-500">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>When will registrations open?</AccordionTrigger>
                <AccordionContent>Registrations will open in October 2025 with early bird offers.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Where exactly is the starting point?</AccordionTrigger>
                <AccordionContent>The starting point is at Kattanji Hills base camp, near Periyanaickenpalayam.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Are there participation limits?</AccordionTrigger>
                <AccordionContent>Yes, slots are limited for each category to ensure safety and environmental care.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

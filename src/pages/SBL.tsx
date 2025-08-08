import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, ChevronRight } from "lucide-react";

const fixtures = [
  {
    group: "Group A",
    matches: [
      { team1: "Team A1", team2: "Team A2", date: "2025-08-20", time: "9:00 AM" },
      { team1: "Team A2", team2: "Team A3", date: "2025-08-20", time: "11:00 AM" },
      { team1: "Team A3", team2: "Team A1", date: "2025-08-20", time: "1:00 PM" },
    ],
  },
  {
    group: "Group B",
    matches: [
      { team1: "Team B1", team2: "Team B2", date: "2025-08-20", time: "9:00 AM" },
      { team1: "Team B2", team2: "Team B3", date: "2025-08-20", time: "11:00 AM" },
      { team1: "Team B3", team2: "Team B1", date: "2025-08-20", time: "1:00 PM" },
    ],
  },
  // Add Groups C–F the same way
];

const faqs = [
  {
    question: "How many overs are played in each match?",
    answer: "Each match will be played for 5 overs per innings.",
  },
  {
    question: "How many players are allowed per team?",
    answer: "Each team can have 7 playing members and 2 substitute players.",
  },
  {
    question: "What is the entry fee?",
    answer: "The entry fee for each team is ₹2,299.",
  },
  {
    question: "What is the tournament format?",
    answer: "18 teams are divided into 6 groups of 3. Each team plays 2 matches in the league stage.",
  },
];

export default function SBL() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
        <Link to="/" className="flex items-center gap-1 hover:text-primary">
          <Home className="w-4 h-4" /> Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary font-medium">SBL Tournament</span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">SBL Cricket League 2025</h1>
        <p className="text-lg mb-2">📅 August 20, 2025</p>
        <p className="text-lg mb-2">📍 Chennai, Tamil Nadu</p>
        <p className="text-lg mb-6">💰 Entry Fee: ₹2,299</p>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/cricket-tournament">Register Your Team</Link>
        </Button>
      </section>

      {/* Competition Details */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Tournament Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Format</CardTitle>
            </CardHeader>
            <CardContent>
              <p>18 Teams → 6 Groups of 3 Teams</p>
              <p>League Stage Only</p>
              <p>Each team plays 2 matches in the group stage</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Match Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p>5 Overs per innings</p>
              <p>7 Players + 2 Substitutes</p>
              <p>League Stage Points System applies</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Fixtures Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Fixtures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {fixtures.map((group) => (
            <Card key={group.group}>
              <CardHeader>
                <CardTitle>{group.group}</CardTitle>
              </CardHeader>
              <CardContent>
                {group.matches.map((match, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-medium">
                      {match.team1} vs {match.team2}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {match.date} • {match.time}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* FAQ Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Example fixture data (can be fetched from backend later)
const groups = [
  {
    name: "Group A",
    matches: [
      { match: "Team A vs Team B", date: "Aug 15, 10:00 AM" },
      { match: "Team B vs Team C", date: "Aug 15, 12:00 PM" },
      { match: "Team C vs Team A", date: "Aug 15, 2:00 PM" },
    ],
  },
  {
    name: "Group B",
    matches: [
      { match: "Team D vs Team E", date: "Aug 15, 10:00 AM" },
      { match: "Team E vs Team F", date: "Aug 15, 12:00 PM" },
      { match: "Team F vs Team D", date: "Aug 15, 2:00 PM" },
    ],
  },
  {
    name: "Group C",
    matches: [
      { match: "Team G vs Team H", date: "Aug 16, 10:00 AM" },
      { match: "Team H vs Team I", date: "Aug 16, 12:00 PM" },
      { match: "Team I vs Team G", date: "Aug 16, 2:00 PM" },
    ],
  },
  {
    name: "Group D",
    matches: [
      { match: "Team J vs Team K", date: "Aug 16, 10:00 AM" },
      { match: "Team K vs Team L", date: "Aug 16, 12:00 PM" },
      { match: "Team L vs Team J", date: "Aug 16, 2:00 PM" },
    ],
  },
  {
    name: "Group E",
    matches: [
      { match: "Team M vs Team N", date: "Aug 17, 10:00 AM" },
      { match: "Team N vs Team O", date: "Aug 17, 12:00 PM" },
      { match: "Team O vs Team M", date: "Aug 17, 2:00 PM" },
    ],
  },
  {
    name: "Group F",
    matches: [
      { match: "Team P vs Team Q", date: "Aug 17, 10:00 AM" },
      { match: "Team Q vs Team R", date: "Aug 17, 12:00 PM" },
      { match: "Team R vs Team P", date: "Aug 17, 2:00 PM" },
    ],
  },
];

export default function SBLPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="container mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tournaments">Tournaments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>SBL</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">SBL - Street Battle League</h1>
          <p className="text-lg">August 15 - 17, 2025 | Chennai</p>
          <p className="mt-2">Entry Fee: ₹2,299 | 18 Teams | 5 Overs | League Format</p>
          <Button size="lg" asChild className="mt-4">
            <Link to="/register">Register Your Team</Link>
          </Button>
        </div>
      </section>

      {/* Competition Details */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Competition Details</h2>
        <Card>
          <CardHeader>
            <CardTitle>Format</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>18 Teams divided into 6 groups (A–F), 3 teams per group.</li>
              <li>Each group plays a round-robin (3 matches per group).</li>
              <li>Top 2 teams from each group advance to the next stage.</li>
              <li>Match format: 5 overs per innings.</li>
              <li>Squad: 7 players + 2 substitutes.</li>
              <li>Entry Fee: ₹2,299 per team.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Fixtures */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Fixtures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {group.matches.map((match, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{match.match}</span>
                      <span className="text-muted-foreground text-sm">{match.date}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>How many players are allowed in a squad?</AccordionTrigger>
            <AccordionContent>
              Each squad can have 7 main players and 2 substitutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>What is the entry fee?</AccordionTrigger>
            <AccordionContent>
              The entry fee is ₹2,299 per team.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>How are teams grouped?</AccordionTrigger>
            <AccordionContent>
              18 teams are divided into 6 groups (A–F) with 3 teams each, playing a round-robin format.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>What is the match format?</AccordionTrigger>
            <AccordionContent>
              Each match consists of 5 overs per innings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

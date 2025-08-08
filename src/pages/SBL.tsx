import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Trophy, Calendar, MapPin, IndianRupee } from "lucide-react";

export default function SBL() {
  const fixtures = [
    { date: "Sep 7, 2025", time: "8:00 AM", match: "Team A vs Team B" },
    { date: "Sep 7, 2025", time: "9:30 AM", match: "Team C vs Team D" },
    { date: "Sep 7, 2025", time: "11:00 AM", match: "Team E vs Team F" },
    { date: "Sep 7, 2025", time: "12:30 PM", match: "Team G vs Team H" },
    { date: "Sep 7, 2025", time: "2:00 PM", match: "Semi Final 1" },
    { date: "Sep 7, 2025", time: "3:30 PM", match: "Semi Final 2" },
    { date: "Sep 7, 2025", time: "5:00 PM", match: "Final" },
  ];

  const faqs = [
    { q: "How many players are allowed per team?", a: "Each team can have 7 players and 2 substitutes." },
    { q: "What is the format of the tournament?", a: "The tournament will follow a league format." },
    { q: "What is included in the entry fee?", a: "Ground booking, umpiring, balls, and trophies." },
    { q: "Where can I register?", a: "You can register online by clicking the 'Register Now' button." },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Modern Breadcrumb */}
      <Breadcrumb className="bg-white shadow-sm rounded-lg p-3 mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/"><Home className="w-4 h-4 mr-1 inline" /> Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/cricket">Cricket</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/sbl">SBL</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">SBL Cricket League 2025</h1>
        <p className="text-lg text-gray-600">League format | Exciting prizes | Competitive matches</p>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Sep 7, 2025 - Sunday</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Ten Sports Turf, Saravanampatti</div>
          <div className="flex items-center gap-2"><IndianRupee className="w-5 h-5 text-primary" /> Entry Fee: ₹2,299</div>
          <div className="flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Prize Pool: ₹9,000 + Trophies</div>
        </div>
        <Button asChild className="mt-6">
          <Link to="/cricket-tournament">Register Now</Link>
        </Button>
      </section>

      {/* Entry Fee Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Entry Fee</CardTitle>
          </CardHeader>
          <CardContent>
            ₹2,299 per team – covers ground booking, umpiring, match balls, and trophies.
          </CardContent>
        </Card>
      </section>

      {/* Important Dates */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-semibold">Mark your calendar for these key dates:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Registration Deadline:</strong> Sep 3, 2025</li>
              <li><strong>Tournament Day:</strong> Sep 7, 2025 - Sunday</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Competition Details */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Competition Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>League format – every team gets to play multiple matches.</li>
              <li>7 players + 2 substitutes per team.</li>
              <li>6 overs per innings.</li>
              <li>All matches on the same day.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Fixtures */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Fixtures</CardTitle>
          </CardHeader>
          <CardContent>
            {fixtures.map((f, i) => (
              <div key={i} className="flex justify-between border-b py-2 text-sm">
                <span>{f.date} | {f.time}</span>
                <span>{f.match}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            {faqs.map((faq, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">{faq.q}</p>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

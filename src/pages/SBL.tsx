import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SBL() {
  return (
    <div className="bg-white text-gray-900">
      {/* Breadcrumb without background image */}
      <div className="relative bg-green-700 text-white rounded-xl overflow-hidden mb-8 shadow-md">
        {/* Breadcrumb content */}
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
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-200">SBL Cricket League</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold">SBL Cricket League 2025</h1>
          <p className="text-lg mt-1">League Format | 22 Matches | ₹2,299 Entry</p>
        </div>
      </div>

      {/* Page content with margin on left/right */}
      <div className="px-4 md:px-32 lg:px-64">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqOfLK66cm0r0BWguKcTfAPRFToooevRnyQ8PWzTcBuDrR1ZHqCdQMiaNSEHjY8L6zubHHxlTgbUdMolF1QE7Ikvp_KIeSJsELjZoQ4BO1rl1AMt_uWgwSfMMZgPbaxzQmYZNEAMA=s680-w680-h510-rw"
            alt="Cricket Match"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Join the Ultimate Cricket Challenge
            </h2>
            <p className="mb-4">
              Get ready for an action-packed cricket league featuring 22 exciting
              matches across 6 groups. Compete for glory, trophies, and a ₹9,000
              prize pool.
            </p>
            <p className="mb-2">
              <strong>Venue:</strong> Ten Sports Turf, Saravanampatti
            </p>
            <p className="mb-4">
              <strong>Entry Fee:</strong> ₹2,299 per team
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/cricket-tournament">Register Now</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Important Dates */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Registration Deadline:</strong> Sep 3, 2025
              </li>
              <li>
                <strong>Tournament Day:</strong> Sep 7, 2025 (Sunday)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Prize Details */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Prize Pool</CardTitle>
          </CardHeader>
          <CardContent>₹9,000 + Trophies</CardContent>
        </Card>

        {/* Fixtures */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Complete Tournament Fixtures (22 Matches)</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <h3 className="font-bold mt-4 mb-2">League Matches (18 Matches)</h3>

            {[
              { name: "Group A", matches: [["1", "Team A1", "Team A2"], ["2", "Team A2", "Team A3"], ["3", "Team A3", "Team A1"]] },
              { name: "Group B", matches: [["4", "Team B1", "Team B2"], ["5", "Team B2", "Team B3"], ["6", "Team B3", "Team B1"]] },
              { name: "Group C", matches: [["7", "Team C1", "Team C2"], ["8", "Team C2", "Team C3"], ["9", "Team C3", "Team C1"]] },
              { name: "Group D", matches: [["10", "Team D1", "Team D2"], ["11", "Team D2", "Team D3"], ["12", "Team D3", "Team D1"]] },
              { name: "Group E", matches: [["13", "Team E1", "Team E2"], ["14", "Team E2", "Team E3"], ["15", "Team E3", "Team E1"]] },
              { name: "Group F", matches: [["16", "Team F1", "Team F2"], ["17", "Team F2", "Team F3"], ["18", "Team F3", "Team F1"]] },
            ].map((group, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-semibold">{group.name}</h4>
                <table className="border border-gray-300 text-sm w-full mb-2">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border px-2 py-1">Match</th>
                      <th className="border px-2 py-1">Team 1</th>
                      <th className="border px-2 py-1">Team 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.matches.map((m, idx) => (
                      <tr key={idx}>
                        <td className="border px-2 py-1">{m[0]}</td>
                        <td className="border px-2 py-1">{m[1]}</td>
                        <td className="border px-2 py-1">{m[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <h3 className="font-bold mt-4 mb-2">Qualifier Matches (3 Matches)</h3>
            <table className="border border-gray-300 text-sm w-full mb-4">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">Match</th>
                  <th className="border px-2 py-1">Team 1</th>
                  <th className="border px-2 py-1">Team 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">19</td>
                  <td className="border px-2 py-1">Winner Group A</td>
                  <td className="border px-2 py-1">Winner Group D</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">20</td>
                  <td className="border px-2 py-1">Winner Group B</td>
                  <td className="border px-2 py-1">Winner Group E</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">21</td>
                  <td className="border px-2 py-1">Winner Group C</td>
                  <td className="border px-2 py-1">Winner Group F</td>
                </tr>
              </tbody>
            </table>

            <h3 className="font-bold mt-4 mb-2">Final (1 Match)</h3>
            <table className="border border-gray-300 text-sm w-full">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">Match</th>
                  <th className="border px-2 py-1">Team 1</th>
                  <th className="border px-2 py-1">Team 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">22</td>
                  <td className="border px-2 py-1">First Place Qualifier</td>
                  <td className="border px-2 py-1">Second Place Qualifier</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>How do I register my team?</AccordionTrigger>
                <AccordionContent>
                  Click the "Register Now" button above and fill in the registration form.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>What is the format of the league?</AccordionTrigger>
                <AccordionContent>
                  Teams are divided into 6 groups, each playing 3 matches in the league stage. Group winners advance to qualifiers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Where is the venue located?</AccordionTrigger>
                <AccordionContent>Ten Sports Turf, Saravanampatti.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

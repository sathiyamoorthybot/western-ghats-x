import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SBL = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb with Cricket Image */}
      <section
        className="relative py-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 flex items-center space-x-2 text-white">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 opacity-70" />
          <Link to="/events" className="hover:text-primary transition-colors">
            Events
          </Link>
          <ChevronRight className="w-4 h-4 opacity-70" />
          <span className="text-primary font-semibold">SBL Cricket League</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-card py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-primary mb-4">
            SBL Cricket League 2025
          </h1>
          <p className="text-lg text-muted-foreground">
            League Series - 22 Matches - Hosted at Ten Sports Turf
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-card p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">Entry Fee</h3>
            <p className="text-muted-foreground">₹1,500 per team</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">Prize Pool</h3>
            <p className="text-muted-foreground">₹9,000 + Trophies</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">Venue</h3>
            <p className="text-muted-foreground">Ten Sports Turf, Saravanampatti</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary mb-2">Format</h3>
            <p className="text-muted-foreground">League Series</p>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Important Dates
          </h2>
          <p className="text-lg text-muted-foreground">
            Mark your calendar for these key dates:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="bg-secondary/10 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Registration Deadline
              </h3>
              <p className="text-muted-foreground">Sep 3, 2025</p>
            </div>
            <div className="bg-secondary/10 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Tournament Day
              </h3>
              <p className="text-muted-foreground">Sep 7, 2025 - Sunday</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixtures */}
      <section className="bg-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Complete Tournament Fixtures (22 Matches)
          </h2>

          {/* League Matches */}
          <h3 className="text-xl font-semibold text-primary mb-4">League Matches (18 Matches)</h3>

          {[
            { name: "Group A", matches: [["1", "Team A1", "Team A2"], ["2", "Team A2", "Team A3"], ["3", "Team A3", "Team A1"]] },
            { name: "Group B", matches: [["4", "Team B1", "Team B2"], ["5", "Team B2", "Team B3"], ["6", "Team B3", "Team B1"]] },
            { name: "Group C", matches: [["7", "Team C1", "Team C2"], ["8", "Team C2", "Team C3"], ["9", "Team C3", "Team C1"]] },
            { name: "Group D", matches: [["10", "Team D1", "Team D2"], ["11", "Team D2", "Team D3"], ["12", "Team D3", "Team D1"]] },
            { name: "Group E", matches: [["13", "Team E1", "Team E2"], ["14", "Team E2", "Team E3"], ["15", "Team E3", "Team E1"]] },
            { name: "Group F", matches: [["16", "Team F1", "Team F2"], ["17", "Team F2", "Team F3"], ["18", "Team F3", "Team F1"]] },
          ].map((group, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-2">{group.name}</h4>
              <table className="w-full border border-border text-left text-muted-foreground">
                <thead className="bg-secondary/20 text-foreground">
                  <tr>
                    <th className="p-2 border">Match</th>
                    <th className="p-2 border">Team 1</th>
                    <th className="p-2 border">Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  {group.matches.map((m, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{m[0]}</td>
                      <td className="p-2 border">{m[1]}</td>
                      <td className="p-2 border">{m[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <p className="text-muted-foreground mb-8">
            The winner of each group advances to the next round.
          </p>

          {/* Qualifiers */}
          <h3 className="text-xl font-semibold text-primary mb-4">Qualifier Matches (3 Matches)</h3>
          <table className="w-full border border-border text-left text-muted-foreground mb-4">
            <thead className="bg-secondary/20 text-foreground">
              <tr>
                <th className="p-2 border">Match</th>
                <th className="p-2 border">Team 1</th>
                <th className="p-2 border">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">19</td>
                <td className="p-2 border">Winner Group A</td>
                <td className="p-2 border">Winner Group D</td>
              </tr>
              <tr>
                <td className="p-2 border">20</td>
                <td className="p-2 border">Winner Group B</td>
                <td className="p-2 border">Winner Group E</td>
              </tr>
              <tr>
                <td className="p-2 border">21</td>
                <td className="p-2 border">Winner Group C</td>
                <td className="p-2 border">Winner Group F</td>
              </tr>
            </tbody>
          </table>
          <p className="text-muted-foreground mb-8">
            The three winners from these matches will be ranked in a points table.  
            The top two teams will play in the final, and the third-placed team will be awarded third place.
          </p>

          {/* Final */}
          <h3 className="text-xl font-semibold text-primary mb-4">Final (1 Match)</h3>
          <table className="w-full border border-border text-left text-muted-foreground">
            <thead className="bg-secondary/20 text-foreground">
              <tr>
                <th className="p-2 border">Match</th>
                <th className="p-2 border">Team 1</th>
                <th className="p-2 border">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">22</td>
                <td className="p-2 border">First Place Qualifier</td>
                <td className="p-2 border">Second Place Qualifier</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Who can participate?</h3>
              <p className="text-muted-foreground">
                Open to all amateur cricket teams. Minimum age: 16 years.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">What is the match format?</h3>
              <p className="text-muted-foreground">
                League matches followed by qualifiers and a final, 6 overs per side.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">How do I register?</h3>
              <p className="text-muted-foreground">
                Click the register button below and complete the form before the deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Compete?
          </h2>
          <p className="text-muted-foreground mb-6">
            Gather your team and join the action in the SBL Cricket League 2025.
          </p>
          <Link
            to="/cricket-tournament"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
          >
            Register Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SBL;

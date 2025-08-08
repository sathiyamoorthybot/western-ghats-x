import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SBL() {
  return (
    <div className="bg-white text-gray-900">
      {/* Breadcrumb / Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/images/cricket-abstract.jpg')",
          paddingTop: "100px", // prevents overlap with fixed header
          paddingBottom: "40px",
          paddingLeft: "30px",
          paddingRight: "30px",
          backgroundColor: "rgba(0,0,0,0.4)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>/</li>
              <li className="text-green-300 font-semibold">SBL Tournament</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold">SBL Tournament 2025</h1>
          <p className="mt-2 text-lg">Ten Sports Turf, Saravanampatti</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-[30px] py-10 space-y-12">
        
        {/* Tournament Info */}
        <section className="grid md:grid-cols-4 gap-6">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Entry Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-800">₹2,299</p>
              <p className="text-sm text-green-600">per team</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Important Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Registration Deadline:</strong> Sep 3, 2025</p>
              <p><strong>Tournament Day:</strong> Sep 7, 2025 (Sunday)</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Venue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ten Sports Turf</p>
              <p>Saravanampatti</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Prize Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-800">₹9,000</p>
              <p className="text-sm text-green-600">+ Trophies</p>
            </CardContent>
          </Card>
        </section>

        {/* Sample Images */}
        <section className="grid md:grid-cols-3 gap-4">
          <img src="/images/cricket-action1.jpg" alt="Cricket action" className="rounded-lg shadow" />
          <img src="/images/cricket-team.jpg" alt="Team huddle" className="rounded-lg shadow" />
          <img src="/images/cricket-trophy.jpg" alt="Trophy" className="rounded-lg shadow" />
        </section>

        {/* Fixtures */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Fixtures</h2>
          <p className="mb-6">The tournament will follow a league series format. The winner of each group advances to the qualifiers.</p>

          {/* Group Fixtures */}
          {["A","B","C","D","E","F"].map(group => (
            <div key={group} className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Group {group}</h3>
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-2 border">Match</th>
                    <th className="p-2 border">Team 1</th>
                    <th className="p-2 border">Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">1</td>
                    <td className="p-2 border">Team X</td>
                    <td className="p-2 border">Team Y</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">2</td>
                    <td className="p-2 border">Team Z</td>
                    <td className="p-2 border">Team W</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {/* Qualifiers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Qualifiers</h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-2 border">Match</th>
                  <th className="p-2 border">Team 1</th>
                  <th className="p-2 border">Team 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Q1</td>
                  <td className="p-2 border">Group A Winner</td>
                  <td className="p-2 border">Group B Winner</td>
                </tr>
                <tr>
                  <td className="p-2 border">Q2</td>
                  <td className="p-2 border">Group C Winner</td>
                  <td className="p-2 border">Group D Winner</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Final */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Final</h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-2 border">Match</th>
                  <th className="p-2 border">Team 1</th>
                  <th className="p-2 border">Team 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">F</td>
                  <td className="p-2 border">Qualifier 1 Winner</td>
                  <td className="p-2 border">Qualifier 2 Winner</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-700">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">How many players per team?</h4>
              <p>Each team can have 7 players + 2 substitutes.</p>
            </div>
            <div>
              <h4 className="font-semibold">What is the format?</h4>
              <p>League series format — winners advance to qualifiers.</p>
            </div>
            <div>
              <h4 className="font-semibold">What is included in the entry fee?</h4>
              <p>Ground booking, umpires, balls, and basic refreshments.</p>
            </div>
          </div>
        </section>

        {/* Register Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => (window.location.href = "/cricket-tournament")}
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}

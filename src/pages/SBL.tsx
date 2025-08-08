import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SBL() {
  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb with Abstract Cricket Background */}
      <div
        className="relative text-white py-8 px-4"
        style={{
          backgroundImage: "url('/images/abstract-cricket-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-green-900/60"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <nav className="text-sm text-green-100 mb-2">
            <span className="hover:underline cursor-pointer">Home</span> /{" "}
            <span className="hover:underline cursor-pointer">Tournaments</span> /{" "}
            <span className="font-semibold">SBL 2025</span>
          </nav>
          <h1 className="text-2xl font-bold">SBL 2025</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Entry Fee */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Entry Fee</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">₹2,000 per team</CardContent>
        </Card>

        {/* Venue */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Venue</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ten Sports Turf</p>
            <p className="text-sm text-gray-500">Saravanampatti</p>
          </CardContent>
        </Card>

        {/* Prize Pool */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Prize Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <p>₹9,000 + Trophies</p>
          </CardContent>
        </Card>

        {/* Fixtures */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Complete Tournament Fixtures (22 Matches)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* League Matches */}
            <section>
              <h2 className="text-lg font-bold text-green-700 mb-2">League Matches (18 Matches)</h2>

              {/* Groups */}
              {[
                { name: "Group A", matches: [["Team A1", "Team A2"], ["Team A2", "Team A3"], ["Team A3", "Team A1"]] },
                { name: "Group B", matches: [["Team B1", "Team B2"], ["Team B2", "Team B3"], ["Team B3", "Team B1"]] },
                { name: "Group C", matches: [["Team C1", "Team C2"], ["Team C2", "Team C3"], ["Team C3", "Team C1"]] },
                { name: "Group D", matches: [["Team D1", "Team D2"], ["Team D2", "Team D3"], ["Team D3", "Team D1"]] },
                { name: "Group E", matches: [["Team E1", "Team E2"], ["Team E2", "Team E3"], ["Team E3", "Team E1"]] },
                { name: "Group F", matches: [["Team F1", "Team F2"], ["Team F2", "Team F3"], ["Team F3", "Team F1"]] },
              ].map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4">
                  <h3 className="font-semibold text-green-600">{group.name}</h3>
                  <table className="w-full border border-green-200 mt-2 text-sm">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="border p-2">Match</th>
                        <th className="border p-2">Team 1</th>
                        <th className="border p-2">Team 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.matches.map((match, i) => (
                        <tr key={i} className="hover:bg-green-50">
                          <td className="border p-2 text-center">{groupIndex * 3 + i + 1}</td>
                          <td className="border p-2">{match[0]}</td>
                          <td className="border p-2">{match[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </section>

            {/* Qualifier Matches */}
            <section>
              <h2 className="text-lg font-bold text-green-700 mb-2">Qualifier Matches (3 Matches)</h2>
              <table className="w-full border border-green-200 text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="border p-2">Match</th>
                    <th className="border p-2">Team 1</th>
                    <th className="border p-2">Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border p-2 text-center">19</td>
                    <td className="border p-2">Winner Group A</td>
                    <td className="border p-2">Winner Group D</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-2 text-center">20</td>
                    <td className="border p-2">Winner Group B</td>
                    <td className="border p-2">Winner Group E</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border p-2 text-center">21</td>
                    <td className="border p-2">Winner Group C</td>
                    <td className="border p-2">Winner Group F</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-2">
                The three winners will be ranked. Top two play in the final, third gets third place.
              </p>
            </section>

            {/* Final */}
            <section>
              <h2 className="text-lg font-bold text-green-700 mb-2">Final (1 Match)</h2>
              <table className="w-full border border-green-200 text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="border p-2">Match</th>
                    <th className="border p-2">Team 1</th>
                    <th className="border p-2">Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border p-2 text-center">22</td>
                    <td className="border p-2">First Place Qualifier</td>
                    <td className="border p-2">Second Place Qualifier</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

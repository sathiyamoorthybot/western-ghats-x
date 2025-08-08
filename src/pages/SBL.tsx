import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SBL() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-green-50 py-3 border-b border-green-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-2 text-sm">
          <Link to="/" className="text-green-600 hover:underline font-medium">
            Home
          </Link>
          <span className="text-green-400">/</span>
          <span className="text-gray-700">SBL Tournament</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title & Register */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-green-700">
            SBL Cricket League 2025
          </h1>
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            <Link to="/cricket-tournament">Register Now</Link>
          </Button>
        </div>

        {/* Tournament Details */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <h2 className="font-semibold text-green-700">Entry Fee</h2>
            <p className="text-gray-700">₹2,000 per team</p>
          </div>
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <h2 className="font-semibold text-green-700">Prize Pool</h2>
            <p className="text-gray-700">₹9,000 + Trophies</p>
          </div>
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <h2 className="font-semibold text-green-700">Venue</h2>
            <p className="text-gray-700">Ten Sports Turf, Saravanampatti</p>
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Important Dates
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Registration Deadline:</strong> Sep 3, 2025
            </li>
            <li>
              <strong>Tournament Day:</strong> Sep 7, 2025 (Sunday)
            </li>
          </ul>
        </div>

        {/* Fixtures */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Complete Tournament Fixtures (22 Matches)
          </h2>

          {/* League Matches */}
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            League Matches (18 Matches)
          </h3>

          {[
            {
              group: "Group A",
              matches: [
                ["1", "Team A1", "Team A2"],
                ["2", "Team A2", "Team A3"],
                ["3", "Team A3", "Team A1"],
              ],
            },
            {
              group: "Group B",
              matches: [
                ["4", "Team B1", "Team B2"],
                ["5", "Team B2", "Team B3"],
                ["6", "Team B3", "Team B1"],
              ],
            },
            {
              group: "Group C",
              matches: [
                ["7", "Team C1", "Team C2"],
                ["8", "Team C2", "Team C3"],
                ["9", "Team C3", "Team C1"],
              ],
            },
            {
              group: "Group D",
              matches: [
                ["10", "Team D1", "Team D2"],
                ["11", "Team D2", "Team D3"],
                ["12", "Team D3", "Team D1"],
              ],
            },
            {
              group: "Group E",
              matches: [
                ["13", "Team E1", "Team E2"],
                ["14", "Team E2", "Team E3"],
                ["15", "Team E3", "Team E1"],
              ],
            },
            {
              group: "Group F",
              matches: [
                ["16", "Team F1", "Team F2"],
                ["17", "Team F2", "Team F3"],
                ["18", "Team F3", "Team F1"],
              ],
            },
          ].map((g) => (
            <div key={g.group} className="mb-6">
              <h4 className="font-semibold text-green-600 mb-2">{g.group}</h4>
              <table className="w-full border border-green-200 text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border border-green-200 px-3 py-2">Match</th>
                    <th className="border border-green-200 px-3 py-2">Team 1</th>
                    <th className="border border-green-200 px-3 py-2">Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  {g.matches.map(([m, t1, t2]) => (
                    <tr key={m}>
                      <td className="border border-green-200 px-3 py-1 text-center">
                        {m}
                      </td>
                      <td className="border border-green-200 px-3 py-1">
                        {t1}
                      </td>
                      <td className="border border-green-200 px-3 py-1">
                        {t2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Qualifiers */}
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Qualifier Matches (3 Matches)
          </h3>
          <table className="w-full border border-green-200 text-sm mb-6">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-green-200 px-3 py-2">Match</th>
                <th className="border border-green-200 px-3 py-2">Team 1</th>
                <th className="border border-green-200 px-3 py-2">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-green-200 px-3 py-1 text-center">19</td>
                <td className="border border-green-200 px-3 py-1">Winner Group A</td>
                <td className="border border-green-200 px-3 py-1">Winner Group D</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-3 py-1 text-center">20</td>
                <td className="border border-green-200 px-3 py-1">Winner Group B</td>
                <td className="border border-green-200 px-3 py-1">Winner Group E</td>
              </tr>
              <tr>
                <td className="border border-green-200 px-3 py-1 text-center">21</td>
                <td className="border border-green-200 px-3 py-1">Winner Group C</td>
                <td className="border border-green-200 px-3 py-1">Winner Group F</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 mb-6">
            The three winners from these matches will be ranked in a point table.
            The top two teams will play in the final, and the third-placed team will be awarded third place.
          </p>

          {/* Final */}
          <h3 className="text-xl font-semibold text-green-600 mb-2">Final (1 Match)</h3>
          <table className="w-full border border-green-200 text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-green-200 px-3 py-2">Match</th>
                <th className="border border-green-200 px-3 py-2">Team 1</th>
                <th className="border border-green-200 px-3 py-2">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50">
                <td className="border border-green-200 px-3 py-1 text-center">22</td>
                <td className="border border-green-200 px-3 py-1">First Place Qualifier</td>
                <td className="border border-green-200 px-3 py-1">Second Place Qualifier</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600">
                How many players can register in a team?
              </h3>
              <p className="text-gray-700">7 main players + 2 substitutes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">
                What is the format of the tournament?
              </h3>
              <p className="text-gray-700">
                League stage with 6 groups, winners advance to qualifiers, top 2 from qualifier ranking play the final.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">
                Can I register after the deadline?
              </h3>
              <p className="text-gray-700">
                No, all registrations must be completed before Sep 3, 2025.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">
                Will refreshments be provided?
              </h3>
              <p className="text-gray-700">
                Yes, basic refreshments will be available for all players.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

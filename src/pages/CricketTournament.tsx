import React, { useState } from "react";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";

const CricketTournament: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [phone, setPhone] = useState("");
  const [players, setPlayers] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  const teamData = {
    teamName,
    captainName,
    captainPhone: phone,
    captainEmail: `${captainName.toLowerCase().replace(/\s+/g, '')}@example.com`,
    teamSize: players.split(',').filter(p => p.trim()).length,
    players: players.split(',').map(p => ({ name: p.trim(), role: 'Player' })),
    jerseyColor: "Blue"
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-4 md:p-10 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">
          🏏 Cricket Tournament 2025
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Register your team now and compete for glory! <br />
          <strong className="text-black">Entry Fee: ₹2000 per team</strong>
        </p>

        {registered ? (
          <div className="text-center">
            <p className="text-green-600 text-lg font-semibold mb-4">
              ✅ Registration Successful! Proceed to Payment.
            </p>
            <RazorpayCheckoutButton amount={2000} teamData={teamData} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Team Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Captain's Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Players (Comma-separated)</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={3}
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
              >
                Register Team
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CricketTournament;

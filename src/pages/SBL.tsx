import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Calendar, MapPin, Award, Target } from "lucide-react";
import FAQComponent from "@/components/FAQComponent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
const SBL = () => {
  // Point Table Data - 12 teams
  const pointsTable = [{
    pos: 1,
    team: "Saravanampatti Strikers",
    p: 6,
    w: 5,
    l: 1,
    nr: 0,
    nrr: "+1.45",
    for: "789/45",
    against: "678/48",
    pts: 10,
    form: ["W", "W", "W", "L", "W"]
  }, {
    pos: 2,
    team: "Coimbatore Kings",
    p: 6,
    w: 4,
    l: 2,
    nr: 0,
    nrr: "+0.89",
    for: "723/47",
    against: "698/46",
    pts: 8,
    form: ["W", "L", "W", "W", "W"]
  }, {
    pos: 3,
    team: "Kattanji Warriors",
    p: 6,
    w: 4,
    l: 2,
    nr: 0,
    nrr: "+0.67",
    for: "756/48",
    against: "734/47",
    pts: 8,
    form: ["W", "W", "L", "W", "L"]
  }, {
    pos: 4,
    team: "Western Blasters",
    p: 6,
    w: 3,
    l: 3,
    nr: 0,
    nrr: "-0.23",
    for: "689/47",
    against: "702/46",
    pts: 6,
    form: ["L", "W", "L", "W", "W"]
  }, {
    pos: 5,
    team: "Ghats Gladiators",
    p: 6,
    w: 2,
    l: 4,
    nr: 0,
    nrr: "-0.78",
    for: "645/48",
    against: "701/45",
    pts: 4,
    form: ["L", "L", "W", "L", "W"]
  }, {
    pos: 6,
    team: "Thunder Bolts",
    p: 6,
    w: 2,
    l: 4,
    nr: 0,
    nrr: "-0.89",
    for: "634/48",
    against: "723/42",
    pts: 4,
    form: ["L", "L", "W", "L", "W"]
  }, {
    pos: 7,
    team: "Fire Phoenix",
    p: 6,
    w: 2,
    l: 4,
    nr: 0,
    nrr: "-1.12",
    for: "598/48",
    against: "678/45",
    pts: 4,
    form: ["W", "L", "L", "L", "W"]
  }, {
    pos: 8,
    team: "Royal Rangers",
    p: 6,
    w: 2,
    l: 4,
    nr: 0,
    nrr: "-1.23",
    for: "587/48",
    against: "689/44",
    pts: 4,
    form: ["L", "W", "L", "L", "W"]
  }, {
    pos: 9,
    team: "Storm Riders",
    p: 6,
    w: 1,
    l: 5,
    nr: 0,
    nrr: "-1.45",
    for: "534/48",
    against: "702/43",
    pts: 2,
    form: ["L", "L", "L", "W", "L"]
  }, {
    pos: 10,
    team: "Power Panthers",
    p: 6,
    w: 1,
    l: 5,
    nr: 0,
    nrr: "-1.67",
    for: "512/48",
    against: "721/42",
    pts: 2,
    form: ["L", "L", "L", "L", "W"]
  }, {
    pos: 11,
    team: "Victory Vipers",
    p: 6,
    w: 1,
    l: 5,
    nr: 0,
    nrr: "-1.89",
    for: "489/48",
    against: "734/41",
    pts: 2,
    form: ["L", "W", "L", "L", "L"]
  }, {
    pos: 12,
    team: "Lightning Lions",
    p: 6,
    w: 0,
    l: 6,
    nr: 0,
    nrr: "-2.34",
    for: "445/48",
    against: "756/40",
    pts: 0,
    form: ["L", "L", "L", "L", "L"]
  }];

  // Fixtures
  const fixtures = [{
    match: "Pre-QF 1",
    team1: "Team 1",
    team2: "Team 2",
    time: "08:00 – 08:45 AM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 2",
    team1: "Team 3",
    team2: "Team 4",
    time: "08:45 – 09:30 AM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 3",
    team1: "Team 5",
    team2: "Team 6",
    time: "09:30 – 10:15 AM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 4",
    team1: "Team 7",
    team2: "Team 8",
    time: "10:15 – 11:00 AM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 5",
    team1: "Team 9",
    team2: "Team 10",
    time: "11:00 – 11:45 AM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 6",
    team1: "Team 11",
    team2: "Team 12",
    time: "11:45 – 12:30 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 7",
    team1: "Team 13",
    team2: "Team 14",
    time: "12:30 – 01:15 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Pre-QF 8",
    team1: "Team 15",
    team2: "Team 16",
    time: "01:15 – 02:00 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Quarterfinal 1",
    team1: "Winner PQF1",
    team2: "Winner PQF2",
    time: "02:00 – 02:45 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Quarterfinal 2",
    team1: "Winner PQF3",
    team2: "Winner PQF4",
    time: "02:45 – 03:30 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Quarterfinal 3",
    team1: "Winner PQF5",
    team2: "Winner PQF6",
    time: "03:30 – 04:15 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Quarterfinal 4",
    team1: "Winner PQF7",
    team2: "Winner PQF8",
    time: "04:15 – 05:00 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Semifinal 1",
    team1: "Winner QF1",
    team2: "Winner QF2",
    time: "05:00 – 05:45 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Semifinal 2",
    team1: "Winner QF3",
    team2: "Winner QF4",
    time: "05:45 – 06:30 PM",
    status: "Upcoming",
    result: "-"
  }, {
    match: "Final",
    team1: "Winner SF1",
    team2: "Winner SF2",
    time: "06:30 – 07:15 PM",
    status: "Upcoming",
    result: "-"
  }];

  // Top Performers
  const orangeCap = [{
    rank: 1,
    player: "Rahul Krishnan",
    team: "Saravanampatti Strikers",
    runs: 234,
    avg: 46.8,
    sr: 156.7
  }, {
    rank: 2,
    player: "Arjun Menon",
    team: "Coimbatore Kings",
    runs: 198,
    avg: 39.6,
    sr: 145.6
  }, {
    rank: 3,
    player: "Vikram Shah",
    team: "Kattanji Warriors",
    runs: 187,
    avg: 37.4,
    sr: 140.2
  }, {
    rank: 4,
    player: "Suresh Kumar",
    team: "Western Blasters",
    runs: 176,
    avg: 35.2,
    sr: 138.9
  }, {
    rank: 5,
    player: "Naveen Raj",
    team: "Ghats Gladiators",
    runs: 165,
    avg: 33.0,
    sr: 142.1
  }];
  const purpleCap = [{
    rank: 1,
    player: "Suresh Kumar",
    team: "Western Blasters",
    wickets: 12,
    avg: 8.5,
    eco: 6.2
  }, {
    rank: 2,
    player: "Naveen Raj",
    team: "Saravanampatti Strikers",
    wickets: 11,
    avg: 9.1,
    eco: 6.8
  }, {
    rank: 3,
    player: "Karthik Dev",
    team: "Ghats Gladiators",
    wickets: 10,
    avg: 10.3,
    eco: 7.1
  }, {
    rank: 4,
    player: "Prashanth",
    team: "Coimbatore Kings",
    wickets: 9,
    avg: 11.2,
    eco: 7.4
  }, {
    rank: 5,
    player: "Deepak",
    team: "Kattanji Warriors",
    wickets: 8,
    avg: 12.1,
    eco: 7.8
  }];
  const getFormBadge = (result: string) => {
    return result === "W" ? <Badge className="bg-green-500 text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">W</Badge> : <Badge className="bg-red-500 text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">L</Badge>;
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              🏏 Saravanampatti Blasters League
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              ⚡ A One-Day Turf Cricket Showdown
            </p>
            <p className="text-lg text-muted-foreground mb-8">6 overs per innings cricket tournament - August 31, 2025 (Sunday)</p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>August 31, 2025 - Sunday</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Ten Sports Turf, Saravanampatti</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span>16 Teams | Knockout Format</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cricket-tournament">
                <Button size="lg" className="bg-gradient-to-r from-mountain-green to-primary-hover text-white px-8 py-4 text-lg font-semibold rounded-full">
                  Register Team - Pay ₹2,000
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tournament Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="fixtures" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="fixtures">One Day. One Trophy. One Champion.</TabsTrigger>
              </TabsList>


              <TabsContent value="fixtures" className="mt-6">
                <div className="grid gap-6">
                  {/* Tournament Format and Prize Pool */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-primary" />
                        Road to Victory
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Tournament Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg mb-3">Tournament Format</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Teams:</span>
                              <span className="font-semibold">16 Teams</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Entry Fee:</span>
                              <span className="font-semibold">₹2,000 per team</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Format:</span>
                              <span className="font-semibold">Knockout</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Overs:</span>
                              <span className="font-semibold">6 overs per innings</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-semibold">Full-day event</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span className="font-semibold">8:00 AM - 6:15 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Matches:</span>
                              <span className="font-semibold">11 Total</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Players:</span>
                              <span className="font-semibold">7 + 2 Subs</span>
                            </div>
                          </div>
                        </div>

                        {/* Registration */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg mb-3">Registration Dates</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Last Date for registration:</span>
                              <span className="font-semibold text-red-600">August 24, 2025 - Sunday</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Date for Cancellation:</span>
                              <span className="font-semibold text-red-600">August 20, 2025 - Monday</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Registration */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg mb-3">Prizes</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Winnner:</span>
                              <span className="font-semibold text-red-600">₹6,000 + Trophy</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Runner-up:</span>
                              <span className="font-semibold text-red-600">₹3,000 + Trophy</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                   {/* Recognition */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-primary" />
                        Recognition
                      </CardTitle>
                      <CardDescription>
                        Individual awards for outstanding performances
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Individual Recognition</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-700">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span>Best Batsman Award</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span>Best Bowler Award</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Match Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-primary" />
                        Match Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Time</TableHead>
                              <TableHead>Match</TableHead>
                              <TableHead>Teams</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fixtures.map((fixture, index) => <TableRow key={index}>
                                <TableCell>{fixture.time}</TableCell>
                                <TableCell className="font-medium">{fixture.match}</TableCell>
                                <TableCell>{fixture.team1} vs {fixture.team2}</TableCell>
                              </TableRow>)}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </section>


        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Join the Action?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Limited slots available for teams. Register now!
            </p>
            <Link to="/cricket-tournament">
              <Button size="lg" className="bg-gradient-to-r from-mountain-green to-primary-hover text-white px-8 py-4 text-lg font-semibold rounded-full">
                Register Your Team Now - Pay ₹2,000
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQs Section */}
        <FAQComponent title="SBL Tournament FAQs" faqs={[{
        question: "What is the format of the SBL tournament?",
        answer: "SBL is a one-day knockout tournament with 16 teams participating. Each match consists of 6 overs per innings, making it fast-paced and exciting."
      }, {
        question: "How much is the entry fee?",
        answer: "The entry fee is ₹2,000 per team. This covers tournament organization, venue, umpiring, and prize distribution."
      }, {
        question: "What are the prizes?",
        answer: "Winner gets ₹6,000 cash prize and trophy. Runner-up receives ₹3,000 cash prize and trophy. Additional individual awards for best batsman and best bowler."
      }, {
        question: "How many players can be in a team?",
        answer: "Each team can have 7 playing members and 2 substitutes, making it a total of 9 players per team."
      }, {
        question: "What are the venue details?",
        answer: "The tournament will be held at Ten Sports Turf (SMS Mahal), Kalapatti Rd, Ramanandha Nagar, Saravanampatti, Coimbatore – 641035."
      }, {
        question: "What time does the tournament start?",
        answer: "The tournament starts at 8:00 AM and runs until 6:15 PM. Teams must report 30 minutes before their scheduled match time."
      }, {
        question: "Is team jersey mandatory?",
        answer: "Yes, all players must wear their team jersey. Team jersey design must be uploaded during registration."
      }, {
        question: "When will the team list and fixtures be shared?",
        answer: "Team list and match fixtures will be shared 1 day before the tournament date via email and WhatsApp."
      }]} />
      </div>
      <Footer />
    </div>;
};
export default SBL;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Calendar, MapPin, Award, Target, Clock, Users, Star } from "lucide-react";
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
    return result === "W" ? (
      <Badge className="bg-green-500 text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">W</Badge>
    ) : (
      <Badge className="bg-red-500 text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">L</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section - Redesigned */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60"></div>
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-8">
                <Badge className="bg-white/20 text-white border-white/30 mb-4 px-4 py-2 text-sm font-medium">
                  🏏 One Day Cricket Championship
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  Saravanampatti
                  <span className="block text-4xl md:text-6xl bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Blasters League
                  </span>
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8 font-medium">
                  ⚡ 6 Overs • 16 Teams • One Champion
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Calendar className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Tournament Date</h3>
                  <p className="text-sm opacity-90">August 31, 2025</p>
                  <p className="text-xs opacity-75">Sunday</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <MapPin className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Venue</h3>
                  <p className="text-sm opacity-90">Ten Sports Turf</p>
                  <p className="text-xs opacity-75">Saravanampatti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Trophy className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Prize Pool</h3>
                  <p className="text-sm opacity-90">₹9,000</p>
                  <p className="text-xs opacity-75">+ Trophies</p>
                </div>
              </div>

              <Link to="/cricket-tournament">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Register Team - ₹2,000
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tournament Overview - New Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Tournament Highlights
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the thrill of fast-paced cricket in our premier one-day knockout championship
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">16</h3>
                  <p className="text-muted-foreground">Teams Competing</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">6</h3>
                  <p className="text-muted-foreground">Overs Per Innings</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">10+</h3>
                  <p className="text-muted-foreground">Hours of Action</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">4</h3>
                  <p className="text-muted-foreground">Awards Available</p>
                </CardContent>
              </Card>
            </div>

            {/* Prize & Recognition Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-yellow-800">
                    <Trophy className="h-8 w-8" />
                    Prize Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-yellow-100 rounded-lg">
                      <div>
                        <h4 className="font-bold text-yellow-900">Champion</h4>
                        <p className="text-sm text-yellow-700">Tournament Winner</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-900">₹6,000</p>
                        <p className="text-sm text-yellow-700">+ Trophy</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-100 rounded-lg">
                      <div>
                        <h4 className="font-bold text-orange-900">Runner-up</h4>
                        <p className="text-sm text-orange-700">Second Place</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-900">₹3,000</p>
                        <p className="text-sm text-orange-700">+ Trophy</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-800">
                    <Award className="h-8 w-8" />
                    Individual Awards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-100 rounded-lg">
                      <Award className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-blue-900">Best Batsman</h4>
                        <p className="text-sm text-blue-700">Highest run scorer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-indigo-100 rounded-lg">
                      <Award className="w-6 h-6 text-indigo-600" />
                      <div>
                        <h4 className="font-bold text-indigo-900">Best Bowler</h4>
                        <p className="text-sm text-indigo-700">Most wicket taker</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tournament Details & Schedule */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="format" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="format" className="text-lg py-3">Tournament Format</TabsTrigger>
                <TabsTrigger value="schedule" className="text-lg py-3">Match Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="format" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Format Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-primary" />
                        Competition Format
                      </CardTitle>
                      <CardDescription>Single elimination knockout tournament</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Total Teams</p>
                            <p className="text-xl font-bold">16 Teams</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Entry Fee</p>
                            <p className="text-xl font-bold">₹2,000</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Overs</p>
                            <p className="text-xl font-bold">6 per innings</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Players</p>
                            <p className="text-xl font-bold">7 + 2 Subs</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="text-xl font-bold">Full Day</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4">
                            <p className="text-sm text-muted-foreground">Total Matches</p>
                            <p className="text-xl font-bold">15 Matches</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Dates */}

<Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
  <CardHeader>
    <CardTitle className="flex items-center gap-3 text-green-800">
      <Calendar className="h-6 w-6" />
      Important Dates
    </CardTitle>
    <CardDescription className="text-green-600">
      Mark your calendar for these key dates
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-6">
      <div className="bg-green-100 p-4 rounded-lg">
        <h4 className="font-bold text-green-900 mb-2">Registration Deadline</h4>
        <p className="text-green-800 text-lg font-semibold">August 24, 2025</p>
        <p className="text-sm text-green-600">Sunday - No extensions!</p>
      </div>
      <div className="bg-green-200 p-4 rounded-lg">
        <h4 className="font-bold text-green-900 mb-2">Cancellation Deadline</h4>
        <p className="text-green-800 text-lg font-semibold">August 20, 2025</p>
        <p className="text-sm text-green-700">Monday - For refund eligibility</p>
      </div>
      <div className="bg-green-300 p-4 rounded-lg">
        <h4 className="font-bold text-green-900 mb-2">Tournament Day</h4>
        <p className="text-green-800 text-lg font-semibold">August 31, 2025</p>
        <p className="text-sm text-green-700">Sunday - 8:00 AM to 6:15 PM</p>
      </div>
    </div>
  </CardContent>
</Card>

                </div>
              </TabsContent>



              <TabsContent value="schedule" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-primary" />
                      Complete Match Schedule
                    </CardTitle>
                    <CardDescription>
                      15 action-packed matches throughout the day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px]">Time Slot</TableHead>
                            <TableHead>Match Type</TableHead>
                            <TableHead>Teams</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fixtures.map((fixture, index) => (
                            <TableRow key={index} className="hover:bg-muted/50">
                              <TableCell className="font-mono text-sm">{fixture.time}</TableCell>
                              <TableCell>
                                <Badge variant={fixture.match.includes('Final') ? 'default' : 'secondary'}>
                                  {fixture.match}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{fixture.team1} vs {fixture.team2}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action - Repositioned */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Secure Your Spot Today!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Limited to 16 teams only. Don't miss the chance to be part of Saravanampatti's biggest cricket tournament.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 inline-block">
                <p className="text-3xl font-bold text-primary mb-2">₹2,000</p>
                <p className="text-muted-foreground">per team registration</p>
              </div>
              <div className="space-y-4">
                <Link to="/cricket-tournament">
                  <Button size="lg" className="bg-gradient-to-r from-mountain-green to-primary-hover text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Register Your Team Now
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Quick registration • Secure payment • Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <FAQComponent 
          title="SBL Tournament FAQs" 
          faqs={[{
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
          }]} 
        />
      </div>
    </div>
  );
};

export default SBL;

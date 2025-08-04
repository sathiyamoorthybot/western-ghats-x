import Header from "@/components/Header";
import Footer from "@/components/Footer";
import kattanjiTrail from "@/assets/kattanji-trail.jpg";
import marathonRunners from "@/assets/marathon-runners.jpg";
import marathonFinish from "@/assets/marathon-finish.jpg";

const KattanjiMarathon = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-card py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Kattanji Hills Marathon 2025
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            Coming this December
          </p>
          <p className="text-lg font-medium text-secondary">
            Presented by Western Ghats X
          </p>
        </div>
      </section>

      {/* Trail Intro with Image */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Run Through the Majestic Kattanji Hills
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Conquer the hills, connect with nature, and be part of an eco-conscious running revolution.
            </p>
            <p className="text-muted-foreground">
              Located near Periyanaickenpalayam, this trail winds through sacred temples, pristine forests,
              and conservation zones.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={kattanjiTrail}
              alt="Kattanji Trail"
              className="rounded-2xl shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-10">
            Choose Your Challenge
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "5K", desc: "Great for families & first-timers" },
              { title: "10K", desc: "Push your pace on scenic trails" },
              { title: "Half Marathon", desc: "Endurance with elevation" },
            ].map((cat, idx) => (
              <div key={idx} className="bg-secondary/10 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-semibold text-primary mb-2">{cat.title}</h3>
                <p className="text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
          <img
            src={marathonRunners}
            alt="Marathon Runners"
            className="w-full h-72 object-cover mt-12 rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Conservation Message */}
      <section className="bg-secondary/5 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            More Than Just a Race
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Your steps support environmental awareness and conservation in the region.
          </p>
          <p className="text-muted-foreground">
            Join us in promoting sustainability and protecting our trails.
          </p>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Registrations Opening Soon!
          </h2>
          <p className="text-muted-foreground mb-6">
            Early bird coupons and route reveals coming your way. Stay tuned!
          </p>
    
        </div>
      </section>

      {/* Why Kattanji? */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Why Run at Kattanji Hills?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <p className="text-muted-foreground">Breathtaking natural trails & temple paths</p>
            <p className="text-muted-foreground">Eco-conscious mission with local community</p>
            <p className="text-muted-foreground">Spirit, stamina, and sustainability in one run</p>
          </div>
          <img
            src={marathonFinish}
            alt="Finish Line"
            className="w-full h-72 object-cover mt-12 rounded-2xl shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default KattanjiMarathon;

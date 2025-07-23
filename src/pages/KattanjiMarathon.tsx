import Header from "@/components/Header";
import Footer from "@/components/Footer";
import kattanjiTrail from "@/assets/kattanji-trail.jpg";
import marathonRunners from "@/assets/marathon-runners.jpg";
import marathonFinish from "@/assets/marathon-finish.jpg";
const KattanjiMarathon = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Kattanji Hills Marathon 2025</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Coming This December
            </p>
            <p className="text-lg md:text-xl text-primary font-semibold">
              Presented by Western Ghats X
            </p>
          </div>
        </section>

        {/* Get Ready Section with Image */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get Ready for Coimbatore's Most Thrilling Marathon
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Conquer the Hills. Experience the Trail. Run for Nature.
              </p>
              <p className="text-lg text-muted-foreground">
                An unforgettable journey through the majestic Kattanji Hills is on the horizon.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <img src={kattanjiTrail} alt="Kattanji Hills Marathon Trail" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Marathon Categories */}
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Marathon Categories
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-4">5K</h3>
                <p className="text-lg text-muted-foreground">
                  Perfect for beginners and families
                </p>
              </div>
              <div className="text-center bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-4">10K</h3>
                <p className="text-lg text-muted-foreground">
                  Challenge yourself with scenic trails
                </p>
              </div>
              <div className="text-center bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-4">Half Marathon</h3>
                <p className="text-lg text-muted-foreground">
                  The ultimate hill running experience
                </p>
              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <img src={marathonRunners} alt="Marathon Runners on Trail" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Registrations Open Soon */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Registrations Open Soon!
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Be part of one of Coimbatore's most memorable and historical marathon events.
            </p>
            <p className="text-lg text-muted-foreground">
              Stay tuned as we unveil a thrilling route and an experience like no other.
            </p>
          </div>
        </section>

        {/* More Than Just a Run */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              More Than Just a Run
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Join hands to raise awareness for nature among local communities.
            </p>
            <p className="text-lg text-muted-foreground">
              Let every step you take echo the message of conservation.
            </p>
          </div>
        </section>

        {/* Why Kattanji Hills */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Why Kattanji Hills?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  Scenic trails and challenging terrain
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  A true test for your spirit and stamina
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  Blend of adventure, culture, and cause
                </p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <img src={marathonFinish} alt="Marathon Finish Line" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>;
};
export default KattanjiMarathon;
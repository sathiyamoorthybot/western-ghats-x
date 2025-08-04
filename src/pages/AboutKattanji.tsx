
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutKattanji = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              About Kattanji Hills
            </h1>
            
            <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-8">
              <img 
                src="https://source.unsplash.com/random/1200x600/?mountains,hills,india" 
                alt="Kattanji Hills" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>The Majestic Kattanji Hills</h2>
              <p>
                Nestled in the Western Ghats of South India, the Kattanji Hills are a breathtaking range of mountains known for their lush green forests, cascading waterfalls, and rich biodiversity. Located near Coimbatore in Tamil Nadu, these hills rise to an elevation of approximately 1,800 meters above sea level, offering spectacular panoramic views of the surrounding landscapes.
              </p>
              
              <h2>Natural Beauty and Biodiversity</h2>
              <p>
                The Kattanji Hills are home to a diverse ecosystem that includes rare medicinal plants, exotic wildlife, and numerous bird species. The hills are covered in shola forests and grasslands, creating a unique microclimate that supports this rich biodiversity. Several streams originate from these hills, eventually forming tributaries to major rivers in the region.
              </p>
              
              <h2>Perfect for Adventure Enthusiasts</h2>
              <p>
                With its varied terrain and natural beauty, Kattanji Hills has become a popular destination for trekkers, trail runners, and nature enthusiasts. The hills offer various levels of trekking trails, from beginner-friendly paths to challenging routes for experienced hikers. The moderate climate throughout the year makes it an ideal location for outdoor activities.
              </p>
              
              <h2>Cultural Significance</h2>
              <p>
                The hills hold cultural significance for local communities, with several ancient temples and tribal settlements dotting the landscape. These communities have preserved their traditional way of life and maintain a harmonious relationship with nature, offering visitors insights into sustainable living practices that have been followed for generations.
              </p>
              
              <h2>The Marathon Experience</h2>
              <p>
                The Kattanji Hills Marathon takes advantage of the natural beauty and varying elevations of the region, offering participants a challenging yet rewarding course. Runners navigate through scenic trails, experiencing the diverse landscapes and breathtaking vistas that make these hills special. The marathon has gained popularity for being not just a test of endurance but also an opportunity to connect with nature in its purest form.
              </p>
              
              <h2>Conservation Efforts</h2>
              <p>
                In recent years, there have been significant efforts to preserve the ecological balance of the Kattanji Hills. Conservation organizations work closely with local communities to protect the biodiversity and natural resources of the region. A portion of the proceeds from the Kattanji Hills Marathon goes toward supporting these conservation initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutKattanji;

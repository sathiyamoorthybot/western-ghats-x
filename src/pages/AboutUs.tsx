import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Droplets, Mountain, TreePine, Heart } from "lucide-react";
const AboutUs = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <img src="/lovable-uploads/3097ee06-2a27-4e5e-b4ec-54d46b0b1c71.png" alt="Western Ghats X" className="h-28 w-auto" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                About Western Ghats X
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">  Creating awareness about the mountain, its water streams, and nature to the locals</p>
            </div>

            {/* Mission Section */}
            <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-mountain-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-8 h-8 text-mountain-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Mountain Conservation</h3>
                  <p className="text-sm text-muted-foreground">Protecting the natural beauty and ecosystem of the Kattanji Hills</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-mountain-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-mountain-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Water Stream Restoration</h3>
                  <p className="text-sm text-muted-foreground">Working to restore year-round water flow in mountain streams</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <TreePine className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Forest Restoration</h3>
                  <p className="text-sm text-muted-foreground">Planting trees and restoring natural habitats for wildlife</p>
                </div>
              </div>
              
              <div className="bg-destructive/5 border-l-4 border-destructive p-6 rounded-r-lg">
                <h3 className="font-semibold text-lg mb-3 text-destructive">
                  <Heart className="w-5 h-5 inline mr-2" />
                  Our Environmental Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The streams in our beloved Kattanji Hills are not flowing water for even 3 months a year 
                  due to the lack of trees and plant habitats in the mountain. This alarming situation has 
                  prompted our mission to create awareness and take action to restore the natural balance.
                </p>
              </div>
            </div>

            {/* Founder Section */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white p-6">
                <h2 className="text-3xl font-bold text-center">Meet Our Founder</h2>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-mountain-green to-mountain-blue rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    SM
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Sathiya Moorthy</h3>
                    <p className="text-lg text-mountain-green font-semibold mb-4">Founder & Environmental Advocate</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Sathiya Moorthy founded Western Ghats X with a vision to create awareness about the 
                      mountain ecosystem, its water streams, and the nature around us to the local communities. 
                      His passion for environmental conservation and community engagement drives our mission 
                      to restore the natural beauty and ecological balance of the Western Ghats.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-card rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Get In Touch</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Website</h3>
                  <p className="text-mountain-green">www.westernghatsx.in</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-mountain-green">info@westernghatsx.in</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Join us in our mission to protect and preserve the Western Ghats for future generations. 
                Together, we can make a difference.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};
export default AboutUs;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MessageCircle } from "lucide-react";

const SponsorContact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Sponsor the Kattanji Marathon
            </h1>
            <p className="text-lg text-muted-foreground">
              Partner with us and be a part of this iconic eco-conscious event.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sponsor Info */}
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Sponsorship Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">events@westernghatsx.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-muted" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Typically within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sponsor Contact Form */}
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Become a Sponsor</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Organization / Name</Label>
                    <Input id="name" placeholder="Your organization or full name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 12345 67890" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message / Proposal</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how you'd like to collaborate..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                    Submit Sponsorship Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorContact;

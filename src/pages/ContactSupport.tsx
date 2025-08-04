
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Globe, MessageCircle } from "lucide-react";

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Contact Support
            </h1>
            <p className="text-lg text-muted-foreground">
              We're here to help with any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="shadow-mountain">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-mountain-blue" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-muted-foreground">info@westernghatsx.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-mountain-green" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-muted-foreground">www.westernghatsx.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-mountain-brown" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Support Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                    Saturday - Sunday: 10:00 AM - 4:00 PM IST
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="shadow-mountain">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your question or concern..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-mountain-green to-mountain-blue">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-mountain-green/10 to-mountain-blue/10 border-mountain-green/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Need Quick Answers?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Check our FAQ section for common questions about registration, race day, and more.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactSupport;

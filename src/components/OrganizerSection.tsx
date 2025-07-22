import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mountain, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const OrganizerSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="text-mountain-green">Organizers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about bringing together the running community and showcasing the natural beauty of Kattanji Hills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Organizer Info */}
          <Card className="shadow-mountain">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-mountain-green to-mountain-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Kattanji Hills</h3>
                <p className="text-muted-foreground">Event Organizer</p>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground leading-relaxed text-center">
                  We are dedicated to promoting health, fitness, and community engagement through 
                  world-class running events in the stunning landscape of Coimbatore's Kattanji Hills.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-foreground mb-3">Get in Touch</h4>
                
                <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                  <Mail className="w-5 h-5 text-mountain-green flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@kattanjihills.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                  <Phone className="w-5 h-5 text-mountain-blue flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 6374521141</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-mountain-brown flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">2/34, Kanuvaipalayam, Marudhur-Vil, Mettupalayam-Tk, Coimbatore District, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-mountain">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Your name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" value={formData.subject} onChange={e => handleInputChange("subject", e.target.value)} placeholder="What's this about?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" value={formData.message} onChange={e => handleInputChange("message", e.target.value)} placeholder="Tell us what you'd like to know..." rows={5} required />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-mountain-green to-primary-hover text-white hover:shadow-button transition-all duration-300 disabled:opacity-50" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-mountain-green/10 to-mountain-blue/10 border-mountain-green/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Partnership Opportunities</h3>
              <p className="text-muted-foreground text-sm">
                Interested in sponsoring or partnering with us? We offer various partnership packages 
                for businesses and organizations looking to support community health and fitness initiatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default OrganizerSection;
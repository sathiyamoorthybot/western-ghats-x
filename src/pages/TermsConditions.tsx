
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardHeader>
              <CardTitle>Event Participation Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">Registration and Payment</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Registration is confirmed only upon successful payment</li>
                  <li>All fees are non-refundable except in case of event cancellation</li>
                  <li>Participants must be 16 years or older on race day</li>
                  <li>Minors require parental consent</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Health and Safety</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Participants must be medically fit to participate</li>
                  <li>Medical clearance may be required for certain categories</li>
                  <li>Emergency contact information is mandatory</li>
                  <li>Follow all safety instructions from race officials</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Liability</h3>
                <p className="text-muted-foreground">
                  Participants acknowledge that running involves inherent risks and participate at their own risk. 
                  Western Ghats X and its organizers shall not be liable for any injury, loss, or damage.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Event Changes</h3>
                <p className="text-muted-foreground">
                  Western Ghats X reserves the right to modify event details, cancel, or postpone the event 
                  due to circumstances beyond our control, including weather conditions.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;

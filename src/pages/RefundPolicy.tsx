
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Refund Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding our refund terms
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-mountain-blue" />
                Refund Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">General Policy</h3>
                <p className="text-muted-foreground">
                  All registration fees are generally non-refundable. This policy helps us plan and 
                  organize the event effectively, ensuring all participants receive quality services.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Event Cancellation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Full refund if event is cancelled by organizers</li>
                  <li>Alternative race date will be offered when possible</li>
                  <li>Weather-related cancellations may result in partial refunds</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Medical Emergency</h3>
                <p className="text-muted-foreground">
                  Partial refunds may be considered for documented medical emergencies that prevent 
                  participation. Medical documentation must be provided within 48 hours of the event.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Transfer Policy</h3>
                <p className="text-muted-foreground">
                  Registration transfers to another person are allowed up to 48 hours before the event 
                  with a processing fee. Contact our support team for assistance.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Contact for Refund Requests</h3>
                <p className="text-muted-foreground">
                  For any refund-related queries, please contact us at info@westernghatsx.in with 
                  your registration details and reason for the request.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;

import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              🔁 Cancellation & Refund Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Western Ghats X
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardContent className="space-y-8 pt-6">
              <div>
                <p className="text-muted-foreground mb-6">
                  At Western Ghats X, we understand that plans may change. We strive to provide a flexible cancellation process while ensuring fairness and transparency for both participants and organizers.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🕒 Cancellation Rules
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>Cancellations must be requested via email at events@westernghatsx.in or by calling +91 63745 21141.</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full refund is available if cancellation is made 7 days or more before the event date.</li>
                    <li>50% refund if cancelled between 3–6 days before the event.</li>
                    <li>No refund for cancellations made within 48 hours of the event or for no-shows.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  ⚠️ Non-Refundable Situations
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Failure to attend due to personal reasons, travel issues, or late arrival.</li>
                  <li>Misconduct, disqualification, or removal from the event due to violation of rules.</li>
                  <li>Force Majeure: Events canceled due to weather, natural disasters, strikes, or government restrictions will not be refunded. However, we will attempt to reschedule or provide credit for future events.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  💸 Refund Process
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Refunds will be processed within 7–10 business days to the original mode of payment.</li>
                  <li>Applicable gateway charges or administrative fees may be deducted.</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CancellationRefundPolicy;
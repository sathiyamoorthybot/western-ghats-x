import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              🚚 Shipping Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Western Ghats X
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardContent className="space-y-8 pt-6">
              <div>
                <p className="text-muted-foreground mb-6">
                  As an event organizing company, Western Ghats X does not ship physical products as a regular practice. However, for specific events that include participant kits or merchandise, here's our delivery policy:
                </p>
              </div>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📩 Digital Confirmation
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Once your registration and payment are successful, a confirmation email or WhatsApp message will be sent within 24 hours.</li>
                  <li>This confirmation will contain your entry pass, QR code, or unique registration ID for event check-in.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🎽 Merchandise or Kits
                </h3>
                <p className="text-muted-foreground mb-3">
                  For events offering t-shirts, badges, wristbands, or participation kits, these items will be:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Distributed at the event venue on the day of the event, OR</li>
                  <li>Delivered in advance (only for select events with pre-shipping options).</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📦 Delivery (If Applicable)
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>If courier delivery is selected (extra cost may apply), shipping will take 3–7 working days within India.</li>
                  <li>Tracking information will be shared via email/SMS if applicable.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🚫 Failed Deliveries
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>If delivery fails due to incorrect address or unavailability, re-shipping charges may be collected.</li>
                  <li>We are not responsible for delays caused by third-party courier partners.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">📞 Contact Information</h3>
                <p className="text-muted-foreground mb-3">
                  For any help with registration, payments, or kit delivery, please contact us at:
                </p>
                <div className="space-y-2 text-muted-foreground ml-4">
                  <p>✉️ events@westernghatsx.in</p>
                  <p>📞 +91 63745 21141</p>
                  <p>🌐 www.westernghats.in</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ShippingPolicy;
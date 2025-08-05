import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              🔒 Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Western Ghats X
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardContent className="space-y-8 pt-6">
              <div>
                <p className="text-muted-foreground mb-6">
                  Your privacy is important to us. This policy explains how Western Ghats X collects, uses, and protects your personal information.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📥 Information We Collect
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Name, contact number, email ID during registration.</li>
                  <li>Event preferences and feedback.</li>
                  <li>Payment details (processed securely via third-party gateways – we do not store card information).</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🛡️ How We Use Your Data
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>To confirm registrations and communicate event details.</li>
                  <li>To provide support or send updates, offers, and promotional content.</li>
                  <li>To improve our events and customer experience.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🔐 Data Protection
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>We do not sell, rent, or share your personal data with third parties without consent.</li>
                  <li>All transactions are secured using industry-standard encryption.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  📤 Email & SMS Communication
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>By registering, you agree to receive event updates and promotional messages from Western Ghats X.</li>
                  <li>You can unsubscribe at any time by contacting us.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  ⚖️ Legal Compliance
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>We comply with all applicable data protection laws in India.</li>
                  <li>For any privacy-related concerns, contact events@westernghatsx.in.</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              📃 Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground">
              Western Ghats X
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardContent className="space-y-8 pt-6">
              <div>
                <p className="text-muted-foreground mb-6">
                  By registering or participating in events organized by Western Ghats X, you agree to the following terms and conditions:
                </p>
              </div>

              <section>
                <h3 className="text-xl font-semibold mb-4">1. Registration</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>All participants must register through official channels only.</li>
                  <li>Entries are confirmed only after full payment is received.</li>
                  <li>We reserve the right to reject or cancel registrations without notice in case of misconduct or policy violations.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">2. Event Participation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Participants must adhere to the rules and instructions provided for each event.</li>
                  <li>We are not liable for injuries, losses, or damages during participation. Attend at your own risk.</li>
                  <li>Participants must carry valid ID proof and confirmation for entry.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">3. Code of Conduct</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Respect fellow participants, volunteers, and staff.</li>
                  <li>Any offensive, illegal, or disruptive behavior will lead to immediate disqualification and removal from the venue without refund.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">4. Photography & Media</h3>
                <p className="text-muted-foreground">
                  By attending our events, you consent to the use of your photos/videos for promotional purposes on our website and social media platforms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">5. Changes & Cancellation</h3>
                <p className="text-muted-foreground">
                  Western Ghats X reserves the right to postpone or cancel any event due to unforeseen circumstances. In such cases, alternative dates or credit may be offered.
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
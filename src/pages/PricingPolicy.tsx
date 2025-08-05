import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              📌 Pricing Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Western Ghats X
            </p>
          </div>

          <Card className="shadow-mountain">
            <CardContent className="space-y-8 pt-6">
              <div>
                <p className="text-muted-foreground mb-6">
                  At Western Ghats X, we aim to deliver high-value experiences across every event — whether it's a sports tournament, competition, cultural celebration, or food festival. Our pricing is always fair, transparent, and clearly communicated.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  💵 Transparent & Inclusive
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>All event prices listed on our website or promotional materials are final and inclusive of taxes, unless specifically mentioned.</li>
                  <li>Prices include all services mentioned in the event description — such as entry fees, participation kits, accommodation, meals, or event access, depending on the nature of the event.</li>
                  <li>There are no hidden charges. Optional items like merchandise or VIP passes will be listed separately.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🎉 Offers & Group Discounts
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>We provide early bird discounts, group booking offers, and special rates for school or college registrations (based on the event).</li>
                  <li>Discount coupons, promo codes, or time-limited offers are regularly shared on our website and official social pages.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  🔁 Cancellations & Refunds
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Cancellations made within the allowable window (as mentioned on individual event pages) may be eligible for partial or full refunds.</li>
                  <li>Any applicable payment gateway or processing fees will be deducted.</li>
                  <li>No-shows or last-minute cancellations are not eligible for a refund.</li>
                  <li>All refund requests must be made through events@westernghatsx.in or by calling +91 63745 21141.</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PricingPolicy;
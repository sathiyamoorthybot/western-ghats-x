import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [{
  question: "What's included in the registration?",
  answer: "Your registration includes a race bib with chip timing, official race t-shirt, finisher medal, certificate, post-race breakfast featuring local specialties, hydration stations throughout the route, and access to medical support."
}, {
  question: "Are there cutoff timings for the races?",
  answer: "Yes, for safety reasons we have cutoff times: 5K - 45 minutes, 10K - 1.5 hours, Half Marathon - 3 hours. This ensures all participants can complete the race safely with full support."
}, {
  question: "Is medical support available during the race?",
  answer: "Absolutely! We have qualified medical personnel stationed at key points along all routes, mobile medical units, and first aid stations. Emergency contact information will be provided to all participants."
}, {
  question: "Can I transfer my bib to another person?",
  answer: "Bib transfers are allowed up to 48 hours before the event with a small processing fee. The new participant must complete a registration form and meet age requirements. Contact our support team for assistance."
}, {
  question: "What should I bring on race day?",
  answer: "Bring your photo ID, confirmation email, comfortable running gear, and personal water bottle if desired. We recommend bringing sunscreen, a cap, and any personal nutrition you prefer for longer distances."
}, {
  question: "Is there bag storage available?",
  answer: "Yes, secure bag storage will be available at the start/finish area. We recommend bringing only essential items as space may be limited."
}, {
  question: "What are the age requirements?",
  answer: "Minimum age is 16 years for all races. Participants under 18 need parental consent. For the Half Marathon, we recommend participants be 18+ due to the challenging terrain."
}, {
  question: "How do I get to the race location?",
  answer: "Detailed directions and parking information will be sent to all registered participants. We're also arranging shuttle services from major locations in Coimbatore city center."
}, {
  question: "What if it rains on race day?",
  answer: "The race will proceed unless there are severe weather conditions that pose safety risks. In case of cancellation, we'll provide options for rescheduling or partial refunds."
}, {
  question: "Can I run with my pet or stroller?",
  answer: "For safety reasons, pets and strollers are not permitted on the race routes. However, we're planning a special fun walk where these may be allowed - stay tuned for updates!"
}];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-mountain-blue">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers to help you prepare for your mountain adventure
          </p>
        </div>

        <Card className="shadow-mountain">
          <CardHeader className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Common Questions
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-4 hover:border-mountain-green/30 transition-colors">
                  <AccordionTrigger className="text-left font-medium hover:text-mountain-green hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

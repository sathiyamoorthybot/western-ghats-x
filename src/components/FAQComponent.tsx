import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQComponentProps {
  title: string;
  faqs: FAQ[];
}

const FAQComponent = ({ title, faqs }: FAQComponentProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
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
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-border/50 rounded-lg px-4 hover:border-mountain-green/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-mountain-green hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQComponent;
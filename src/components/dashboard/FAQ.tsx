
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I track my delivery?</AccordionTrigger>
            <AccordionContent>
              You can track your delivery by clicking on the order in your dashboard and viewing the real-time location of your courier on the map.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How can I become a courier partner?</AccordionTrigger>
            <AccordionContent>
              To become a courier partner, visit the Partners section and click on "Join as Courier". Complete the registration form and submit your documents for verification.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
            <AccordionContent>
              We accept various payment methods including credit/debit cards, bank transfers, and digital wallets for maximum convenience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How are delivery fees calculated?</AccordionTrigger>
            <AccordionContent>
              Delivery fees are calculated based on distance, package weight, and delivery priority. You can get an instant quote before confirming your order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      question: "Are the medicines sold here authentic?",
      answer: "Yes, 100%. We only partner with licensed pharmacies and verified manufacturers. Every product goes through a strict quality and authenticity check before being listed on our platform."
    },
    {
      question: "Do I need a prescription for all medicines?",
      answer: "No. You can purchase Over-The-Counter (OTC) medicines without a prescription. However, for items marked as 'Prescription Only', you must provide a valid medical prescription which our team will verify."
    },
    {
      question: "How long does delivery take in Dhaka?",
      answer: "For Dhaka city, we offer Express Delivery within 2-4 hours. Standard delivery typically takes 24 hours. Outside Dhaka, it may take 1-2 days depending on the location."
    },
    {
      question: "Can I return medicine after opening the pack?",
      answer: "Due to health and safety regulations, we cannot accept returns for medicines once the seal is broken or the package is opened, unless the product is damaged or defective upon arrival."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive a tracking link via SMS and Email. You can also view real-time updates in the 'My Orders' section of your account dashboard."
    },
    {
      question: "Is there a minimum order value for free shipping?",
      answer: "Yes, we offer free standard shipping on orders over $50 (approx. 5,500 BDT). For orders below this amount, a small delivery fee applies based on your location."
    }
  ];

  return (
    <div className="container px-4 py-16 md:px-8 max-w-4xl">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-wider">
          Support Center
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 font-heading">Frequently Asked <span className="text-teal-600">Questions.</span></h1>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          Everything you need to know about MediStore. Can't find what you're looking for? Reach out to our team.
        </p>
      </div>

      <div className="bg-white rounded-[40px] border border-zinc-100 p-6 md:p-10 shadow-sm mb-16">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-zinc-100 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-teal-600 hover:no-underline transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 text-base leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600">
              <Mail className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-zinc-900">Email Us</p>
              <p className="text-sm text-zinc-500">medi@habibullah.dev</p>
           </div>
        </div>
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600">
              <Phone className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-zinc-900">Call Us</p>
              <p className="text-sm text-zinc-500">+880 1712-345678</p>
           </div>
        </div>
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600">
              <MessageCircle className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-zinc-900">Live Chat</p>
              <p className="text-sm text-zinc-500">Available 24/7</p>
           </div>
        </div>
      </div>
    </div>
  );
}

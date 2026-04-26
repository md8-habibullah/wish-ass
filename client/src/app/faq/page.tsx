"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Mail, MessageCircle, Phone } from "lucide-react";

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          Support Center
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-heading">Frequently Asked <span className="text-primary">Questions.</span></h1>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          Everything you need to know about Wish Ass. Can&apos;t find what you&apos;re looking for? Reach out to our team.
        </p>
      </div>

      <div className="bg-card rounded-[40px] border border-white/5 p-6 md:p-10 shadow-sm mb-16">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/5 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary hover:no-underline transition-colors">
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
        <div className="p-8 rounded-3xl bg-background border border-white/5 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-card shadow-sm flex items-center justify-center text-primary">
              <Mail className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-white">Email Us</p>
              <p className="text-sm text-zinc-500">medi@habibullah.dev</p>
           </div>
        </div>
        <div className="p-8 rounded-3xl bg-background border border-white/5 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-card shadow-sm flex items-center justify-center text-primary">
              <Phone className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-white">Call Us</p>
              <p className="text-sm text-zinc-500">+880 1700 000000</p>
           </div>
        </div>
        <div className="p-8 rounded-3xl bg-background border border-white/5 flex flex-col items-center text-center space-y-4">
           <div className="h-12 w-12 rounded-2xl bg-card shadow-sm flex items-center justify-center text-primary">
              <MessageCircle className="h-6 w-6" />
           </div>
           <div>
              <p className="font-bold text-white">Live Chat</p>
              <p className="text-sm text-zinc-500">Available 24/7</p>
           </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ShieldCheck, Truck, ShoppingBag, HeartPulse, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed Products",
    desc: "Every product is sourced from certified manufacturers and strictly verified for quality.",
    color: "bg-teal-50 text-teal-600"
  },
  {
    icon: Truck,
    title: "Express Delivery",
    desc: "Discreet and temperature-controlled shipping within 24 hours of order placement.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: ShoppingBag,
    title: "Secure Payments",
    desc: "Multiple payment gateways including end-to-end encrypted transactions and COD.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: HeartPulse,
    title: "Expert Support",
    desc: "Our medical desk is available 24/7 to help you find the right medication.",
    color: "bg-red-50 text-red-600"
  }
];

export function TrustSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-8 space-y-16">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-teal-50 text-teal-700 border-teal-100 font-bold">Why Choose Us</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 font-heading leading-tight">
            Setting the Standard in <br /> Modern Healthcare.
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed">
            We bridge the gap between local pharmacies and your doorstep, ensuring you never run out of essential healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, i) => (
            <div key={i} className="group relative flex flex-col p-10 rounded-[40px] bg-zinc-50 border border-zinc-100 transition-all hover:bg-white hover:shadow-2xl hover:border-teal-100 hover:-translate-y-2">
              <div className={`p-4 rounded-2xl w-fit mb-6 ${feature.color} group-hover:scale-110 transition-transform shadow-sm`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 font-heading">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
              
              {/* Animation decoration */}
              <div className="mt-8 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="h-1 w-8 bg-teal-500 rounded-full animate-pulse" />
                 <div className="h-1 w-2 bg-teal-500/50 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

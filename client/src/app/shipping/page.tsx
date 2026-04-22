"use client";

import { Truck, Clock, ShieldCheck, Globe, MapPin, ChevronRight } from "lucide-react";

export default function ShippingPage() {
  const deliveryOptions = [
    {
      title: "Express Delivery",
      time: "2-4 Hours",
      cost: "$5.00",
      description: "Available in major city areas for urgent medications.",
      icon: Clock,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Standard Shipping",
      time: "1-2 Days",
      cost: "Free over $50",
      description: "Our most popular choice for regular prescriptions.",
      icon: Truck,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Next Day Priority",
      time: "24 Hours",
      cost: "$12.00",
      description: "Guaranteed delivery by next day for all regions.",
      icon: ShieldCheck,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="container px-4 py-16 md:px-8 max-w-5xl">
      <div className="space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-heading">Shipping Information</h1>
        <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed">
          We pride ourselves on fast, secure, and temperature-controlled medical delivery to ensure your health never waits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {deliveryOptions.map((option, i) => {
          const Icon = option.icon;
          return (
            <div key={i} className="p-8 rounded-[40px] bg-card border border-white/5 shadow-sm space-y-6">
              <div className={`p-4 rounded-2xl w-fit ${option.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{option.title}</h3>
                <p className="text-primary font-bold">{option.time} • {option.cost}</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{option.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white font-heading tracking-tight">Delivery Zones</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-6 rounded-3xl bg-background border border-white/5">
               <MapPin className="h-6 w-6 text-primary shrink-0" />
               <div className="space-y-1">
                 <p className="font-bold text-white">Tier 1 Cities (Metros)</p>
                 <p className="text-sm text-zinc-500">Full access to Express and Standard delivery. Available 7 days a week.</p>
               </div>
            </div>
            <div className="flex gap-4 p-6 rounded-3xl bg-background border border-white/5">
               <Globe className="h-6 w-6 text-zinc-400 shrink-0" />
               <div className="space-y-1">
                 <p className="font-bold text-white">National Coverage</p>
                 <p className="text-sm text-zinc-500">Standard shipping available to all regions with verified medical addresses.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-[40px] bg-zinc-900 text-white space-y-6 relative overflow-hidden">
           <h2 className="text-2xl font-bold font-heading">Temperature Control</h2>
           <p className="text-zinc-400 text-sm leading-relaxed">
             Sensitive medications like insulin and certain antibiotics are shipped in high-tech insulated packaging with cold packs to maintain strict temperature ranges during transit.
           </p>
           <ul className="space-y-3">
             <li className="flex items-center gap-2 text-sm font-medium">
               <div className="h-1.5 w-1.5 rounded-full bg-primary" />
               Real-time Temperature Monitoring
             </li>
             <li className="flex items-center gap-2 text-sm font-medium">
               <div className="h-1.5 w-1.5 rounded-full bg-primary" />
               Insulated Medical-Grade Boxes
             </li>
             <li className="flex items-center gap-2 text-sm font-medium">
               <div className="h-1.5 w-1.5 rounded-full bg-primary" />
               Priority Handling for Cold Chain
             </li>
           </ul>
           <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-card/5 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}

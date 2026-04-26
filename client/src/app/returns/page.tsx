"use client";

import { RefreshCcw, AlertTriangle, CheckCircle2, ShieldAlert, History } from "lucide-react";

export default function ReturnsPage() {
  const guidelines = [
    {
      title: "Unopened Medication",
      rule: "Can be returned within 7 days of delivery if the seal is intact.",
      status: "Eligible for Full Refund",
      icon: CheckCircle2,
      color: "text-green-600"
    },
    {
      title: "Damaged Items",
      rule: "Must be reported within 24 hours of delivery with photographic evidence.",
      status: "Instant Replacement",
      icon: AlertTriangle,
      color: "text-amber-600"
    },
    {
      title: "Opened Items",
      rule: "For health and safety reasons, we cannot accept returns of opened medical items.",
      status: "Non-Returnable",
      icon: ShieldAlert,
      color: "text-red-600"
    }
  ];

  return (
    <div className="container px-4 py-16 md:px-8 max-w-5xl">
      <div className="space-y-4 mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-heading tracking-tight">Returns & Refunds</h1>
        <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mx-auto md:mx-0">
          Your safety is our priority. We have strict protocols for medical returns to ensure the integrity of our supply chain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {guidelines.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-8 rounded-[40px] bg-background border border-white/5 space-y-6">
              <div className="space-y-4">
                <Icon className={`h-8 w-8 ${item.color}`} />
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.rule}</p>
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-[40px] border border-white/5 p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white font-heading">The Refund Process</h2>
            <div className="space-y-8 relative">
              <div className="flex gap-6 relative z-10">
                 <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div className="w-0.5 flex-1 bg-white/5" />
                 </div>
                 <div className="pb-8">
                    <p className="font-bold text-white">Initiate Request</p>
                    <p className="text-sm text-zinc-500">Go to your order history and select &apos;Return Item&apos; next to the product.</p>
                 </div>
              </div>
              <div className="flex gap-6 relative z-10">
                 <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-zinc-200 text-zinc-400 flex items-center justify-center font-bold text-sm">2</div>
                    <div className="w-0.5 flex-1 bg-white/5" />
                 </div>
                 <div className="pb-8">
                    <p className="font-bold text-white">Inspection</p>
                    <p className="text-sm text-zinc-500">Our medical team will review the request and images within 24 hours.</p>
                 </div>
              </div>
              <div className="flex gap-6 relative z-10">
                 <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-zinc-200 text-zinc-400 flex items-center justify-center font-bold text-sm">3</div>
                 </div>
                 <div>
                    <p className="font-bold text-white">Instant Refund</p>
                    <p className="text-sm text-zinc-500">Once approved, the amount is credited back to your original payment method.</p>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="p-10 rounded-[40px] bg-primary text-white space-y-6">
            <RefreshCcw className="h-12 w-12 text-teal-200" />
            <h3 className="text-2xl font-bold font-heading">Zero-Hassle Policy</h3>
            <p className="text-primary/10 text-sm leading-relaxed">
              We understand that mistakes happen. If you accidentally ordered the wrong OTC medication, our support team will help you swap it before shipping or facilitate a return if it arrives sealed.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <History className="h-5 w-5 text-teal-200" />
              <p className="text-xs font-bold uppercase tracking-widest">Typical Refund Time: 3-5 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

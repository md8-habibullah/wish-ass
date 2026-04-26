"use client";

import { ShieldAlert, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="container px-4 py-24 md:px-8 max-w-4xl mx-auto space-y-16">
      <div className="space-y-4">
        <Link href="/">
           <Button variant="ghost" className="text-zinc-500 hover:text-white -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
           </Button>
        </Link>
        <h1 className="text-5xl font-black text-white font-heading tracking-tighter">Returns & Refunds.</h1>
        <p className="text-zinc-500 text-lg">Clinical Safety Standards Protocol</p>
      </div>

      <div className="p-8 rounded-[40px] bg-red-500/5 border border-red-500/20 space-y-4">
         <div className="flex items-center gap-3 text-red-500">
            <ShieldAlert className="h-6 w-6" />
            <h3 className="text-xl font-bold font-heading uppercase tracking-tight">Crucial: Safety First</h3>
         </div>
         <p className="text-zinc-400 text-sm leading-relaxed">
            Due to the sterile nature of medical supplies, we maintain a strict return policy to prevent cross-contamination and ensure patient safety.
         </p>
      </div>

      <div className="space-y-12 text-zinc-400 leading-relaxed">
        <section className="space-y-6">
           <h2 className="text-2xl font-bold text-white font-heading">Eligible for Return</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Damaged outer packaging upon arrival",
                "Expired products (verified by batch number)",
                "Incorrect item shipped by fulfillment center",
                "Recalled items by manufacturer"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-white/5">
                   <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                   <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">Non-Returnable Items</h2>
           <p>
              Opened sterile kits, temperature-sensitive vaccines (cold chain), and prescription medications once dispensed are strictly non-returnable.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">The Process</h2>
           <div className="space-y-4 border-l-2 border-white/5 pl-8 ml-4">
              <div className="relative">
                 <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                 <p className="font-bold text-white">1. Raise Request</p>
                 <p className="text-sm">Initiate return via the &quot;Order History&quot; panel within 48 hours.</p>
              </div>
              <div className="relative">
                 <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full bg-zinc-700" />
                 <p className="font-bold text-white">2. Quality Check</p>
                 <p className="text-sm">Our clinical team verifies the product condition.</p>
              </div>
              <div className="relative">
                 <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full bg-zinc-700" />
                 <p className="font-bold text-white">3. Credit/Replacement</p>
                 <p className="text-sm">Store credit or replacement is issued within 5 business days.</p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}

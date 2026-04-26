"use client";

import { Shield, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-24 md:px-8 max-w-4xl mx-auto space-y-16">
      <div className="space-y-4">
        <Link href="/">
           <Button variant="ghost" className="text-zinc-500 hover:text-white -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
           </Button>
        </Link>
        <h1 className="text-5xl font-black text-white font-heading tracking-tighter">Privacy Protocol.</h1>
        <p className="text-zinc-500 text-lg">Last updated: April 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-8 rounded-[40px] bg-card border border-white/5 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
               <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">Data Security</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
               All clinical and personal data is encrypted using AES-256 standards at rest and TLS 1.3 in transit.
            </p>
         </div>
         <div className="p-8 rounded-[40px] bg-card border border-white/5 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
               <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">Transparency</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
               We never share medical requisition history with third-party providers without explicit HIPAA-compliant consent.
            </p>
         </div>
      </div>

      <div className="space-y-12 text-zinc-400 leading-relaxed">
        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">1. Data Collection</h2>
           <p>
              Wish Ass collects minimal data necessary for hospital operations: Staff identity, department allocation, and supply requisition logs. We do not track personal health information (PHI) of patients directly.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">2. System Logs</h2>
           <p>
              To maintain system integrity and audit trails, all actions performed by administrators and sellers are logged and stored for 5 years as per international health IT regulations.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">3. Contact</h2>
           <p>
              For privacy-related inquiries, contact our DPO at <span className="text-primary font-bold">privacy@habibullah.dev</span>.
           </p>
        </section>
      </div>
    </div>
  );
}

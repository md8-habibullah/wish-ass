"use client";

import { FileText, Scale, Gavel, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container px-4 py-24 md:px-8 max-w-4xl mx-auto space-y-16">
      <div className="space-y-4">
        <Link href="/">
           <Button variant="ghost" className="text-zinc-500 hover:text-white -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
           </Button>
        </Link>
        <h1 className="text-5xl font-black text-white font-heading tracking-tighter">Terms of Service.</h1>
        <p className="text-zinc-500 text-lg">Effective Date: April 2026</p>
      </div>

      <div className="space-y-12 text-zinc-400 leading-relaxed">
        <section className="space-y-4 p-8 rounded-[40px] bg-card border border-white/5">
           <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-3">
              <CheckCircle2 className="text-primary h-6 w-6" />
              Acceptance of Terms
           </h2>
           <p>
              By accessing the MediSync platform, you agree to be bound by these Terms of Service and all applicable health regulations in your jurisdiction.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">1. Authorized Use Only</h2>
           <p>
              MediSync is intended for use by licensed medical professionals and authorized hospital staff. Unauthorized access or impersonation of clinical staff is a violation of international healthcare laws.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">2. Resource Allocation</h2>
           <p>
              Users are responsible for the accuracy of requisition orders. MediSync is not liable for clinical outcomes resulting from incorrect resource requests or inventory mismanagement at the department level.
           </p>
        </section>

        <section className="space-y-4">
           <h2 className="text-2xl font-bold text-white font-heading">3. Termination</h2>
           <p>
              We reserve the right to suspend accounts suspected of fraudulent requisitions or unauthorized secondary distribution of medical supplies.
           </p>
        </section>
      </div>
    </div>
  );
}

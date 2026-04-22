"use client";

import { ShieldCheck, Heart, Users, Award, Pill, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { label: "Verified Medicines", value: "5,000+" },
    { label: "Active Customers", value: "50,000+" },
    { label: "Licensed Sellers", value: "200+" },
    { label: "Delivery Cities", value: "15+" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Authenticity Guaranteed",
      description: "We strictly verify every seller and product on our platform to ensure you only receive 100% authentic medications.",
      color: "bg-teal-50 text-teal-600"
    },
    {
      icon: Heart,
      title: "Patient First",
      description: "Our platform is designed with the patient's convenience and safety as the ultimate priority in every decision.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "All products are stored and handled according to international medical standards to maintain their efficacy.",
      color: "bg-blue-50 text-blue-600"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white font-heading leading-tight">
              Revolutionizing <br />
              <span className="text-teal-400 italic">Healthcare Access.</span>
            </h1>
            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl">
              MediStore was founded with a simple goal: to make authentic, life-saving medications accessible to everyone, everywhere, at the touch of a button.
            </p>
          </div>
        </div>
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-zinc-100">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-black text-zinc-900 font-heading tracking-tight">{stat.value}</p>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-zinc-900 font-heading">The MediStore Story</h2>
               <div className="space-y-4 text-zinc-600 leading-relaxed text-lg">
                 <p>
                   In 2024, we noticed a massive gap in the online healthcare market. People were struggling to find verified, authentic medications without visiting multiple physical pharmacies.
                 </p>
                 <p>
                   We built MediStore as a platform that doesn't just sell medicine, but builds trust. By connecting licensed pharmacies directly to consumers through a secure, verified portal, we've eliminated the uncertainty of online health shopping.
                 </p>
                 <p>
                   Today, we are the leading OTC pharmacy platform, serving thousands of families daily with high-quality healthcare products and reliable expert advice.
                 </p>
               </div>
               <div className="pt-4">
                 <Link href="/shop">
                   <Button size="lg" className="rounded-full bg-teal-600 hover:bg-teal-700 h-14 px-8 font-bold">
                     Shop With Confidence
                     <ArrowRight className="ml-2 h-5 w-5" />
                   </Button>
                 </Link>
               </div>
            </div>
            <div className="relative aspect-square">
               <div className="absolute inset-0 bg-teal-600 rounded-[60px] rotate-3 opacity-10" />
               <div className="absolute inset-0 bg-zinc-900 rounded-[60px] -rotate-3 overflow-hidden flex items-center justify-center p-12">
                  <Pill className="h-48 w-48 text-teal-500/20 animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-zinc-50">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-zinc-900 font-heading tracking-tight">Our Core Values</h2>
            <p className="text-zinc-500 text-lg">The principles that guide every interaction on our platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-sm space-y-6 hover:shadow-xl transition-all hover:-translate-y-2">
                   <div className={`p-4 rounded-2xl w-fit ${value.color}`}>
                      <Icon className="h-8 w-8" />
                   </div>
                   <h3 className="text-xl font-bold text-zinc-900">{value.title}</h3>
                   <p className="text-zinc-500 leading-relaxed text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative min-h-[800px] h-auto py-32 md:py-0 w-full overflow-hidden flex items-center justify-center text-center">
      <Image
        src="/images/medical_hero_banner_1776588021141.png"
        alt="Premium Pharmacy"
        fill
        className="object-cover brightness-[0.2] scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 z-[5]" />
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span className="text-teal-100 text-[10px] font-bold uppercase tracking-[0.2em]">The Future of Online Pharmacy</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white font-heading leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 tracking-tighter">
            Better Care. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 italic">Better Life.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 font-medium">
            Experience a new standard in healthcare. Authentic OTC medicines, expert verification, and ultra-fast delivery. Your health is just one click away.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link href="/shop">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 h-14 px-8 md:h-20 md:px-14 rounded-full font-black text-lg md:text-xl shadow-[0_20px_60px_rgba(13,148,136,0.4)] group transition-all hover:scale-105 active:scale-95">
                Explore Shop
                <ArrowRight className="ml-3 h-5 w-5 md:h-7 md:w-7 transition-transform group-hover:translate-x-3" />
              </Button>
            </Link>
            <Link href="/register?role=SELLER">
              <Button size="lg" className="bg-white hover:bg-zinc-100 h-14 px-8 md:h-20 md:px-14 rounded-full font-black text-lg md:text-xl text-zinc-950 shadow-2xl transition-all hover:scale-105 active:scale-95">
                Become a Seller
              </Button>
            </Link>
          </div>

          <div className="pt-16 md:pt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-700 border-t border-white/5">
             <div className="space-y-1">
                <p className="text-4xl font-black text-white font-heading tracking-tighter">50k+</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Active Users</p>
             </div>
             <div className="space-y-1">
                <p className="text-4xl font-black text-teal-500 font-heading tracking-tighter">100%</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Authentic Items</p>
             </div>
             <div className="space-y-1">
                <p className="text-4xl font-black text-white font-heading tracking-tighter">24/7</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Direct Support</p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-50 to-transparent" />
    </section>
  );
}

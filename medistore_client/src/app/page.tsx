import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories";
import { TrustSection } from "@/components/home/trust-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustSection />
      <CategoriesSection />
      
      {/* Trending Products Section */}
      <section className="bg-zinc-950 py-32 overflow-hidden relative">
        <div className="container px-4 md:px-8 space-y-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white font-heading leading-tight">Trending <br /> <span className="text-teal-400">Medicines.</span></h2>
              <p className="text-zinc-400 text-lg max-w-lg">Our most requested healthcare products this week, verified for quality and stock.</p>
            </div>
            <Link href="/shop" className="w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto bg-white text-zinc-900 hover:bg-zinc-100 h-14 md:h-16 px-8 md:px-10 rounded-full font-bold text-lg shadow-xl shadow-white/5">
                Browse Full Catalog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="group flex flex-col bg-zinc-900/50 backdrop-blur-xl rounded-[40px] border border-white/5 overflow-hidden transition-all hover:bg-zinc-900 hover:-translate-y-3 hover:border-teal-500/30">
                 <div className="aspect-[4/3] relative p-8">
                    <div className="w-full h-full rounded-3xl bg-zinc-800/50 flex items-center justify-center overflow-hidden relative">
                      <Image 
                        src="/images/medicine_pack_placeholder_1776588054881.png"
                        alt="Medicine"
                        width={200}
                        height={200}
                        className="object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
                      />
                      <Badge className="absolute top-4 right-4 bg-teal-500/20 text-teal-400 border-teal-500/30 backdrop-blur-md">In Stock</Badge>
                    </div>
                 </div>
                 <div className="p-8 pt-0 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">Healthcare</span>
                         <div className="h-1 w-1 rounded-full bg-zinc-700" />
                         <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pain Relief</span>
                      </div>
                      <h4 className="text-white font-bold text-2xl group-hover:text-teal-400 transition-colors font-heading">Advanced Medication X</h4>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-xs line-through">$18.00</span>
                        <span className="text-white font-bold text-2xl font-heading">$12.50</span>
                      </div>
                      <Button size="icon" className="bg-teal-600 hover:bg-teal-500 rounded-2xl h-12 w-12 shadow-lg shadow-teal-500/20">
                         <ShoppingBag className="h-5 w-5" />
                      </Button>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Seller Promo Section */}
      <section className="py-24 container px-4 md:px-8">
        <div className="bg-teal-600 rounded-[40px] md:rounded-[60px] p-6 py-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="relative z-10 max-w-2xl space-y-8 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight">
              Empower Your <br />
              <span className="text-teal-200 italic font-serif">Pharmacy.</span>
            </h2>
            <p className="text-teal-50 text-xl leading-relaxed opacity-90">
              Join our nationwide network of verified sellers. Scale your medical business with advanced inventory tools and 24/7 order management.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
              <Link href="/register?role=SELLER" className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-white text-teal-700 hover:bg-teal-50 shadow-2xl border-none h-14 md:h-16 px-8 md:px-12 rounded-full font-bold text-lg md:text-xl transition-all hover:scale-105">
                  Register as Seller
                  <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex-1 w-full h-[300px] md:h-[400px] animate-pulse">
             <div className="absolute inset-0 bg-white/10 rounded-[40px] backdrop-blur-xl border border-white/20 rotate-3 translate-x-4" />
             <div className="absolute inset-0 bg-teal-500/20 rounded-[40px] backdrop-blur-md border border-white/10 -rotate-3 -translate-x-4 flex items-center justify-center">
                <HeartPulse className="h-32 w-32 text-white/40" />
             </div>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2"></div>
        </div>
      </section>
    </div>
  );
}

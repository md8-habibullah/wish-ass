"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Activity, 
  Database, 
  Cpu,
  Monitor,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto text-center space-y-10 relative z-10">
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge variant="outline" className="bg-card/5 border-white/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <Zap className="h-3 w-3 mr-2 fill-current" />
              Engineered by habibullah.dev
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            CLINICAL <br />
            <span className="text-primary italic">PRECISION.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            The next-generation hospital procurement system. Architected for zero-latency inventory management and mission-critical resource allocation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-card text-black hover:bg-zinc-200 h-16 px-10 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                Enter System
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/register?role=SELLER" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 bg-card/5 backdrop-blur-md text-white hover:bg-card/10 h-16 px-10 rounded-2xl font-bold text-lg transition-all hover:scale-105">
                Register Controller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24 bg-zinc-950/50 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Cpu className="h-8 w-8" />
                 </div>
                 <h3 className="text-2xl font-black text-white font-heading tracking-tight">High-Performance Core</h3>
                 <p className="text-zinc-500 leading-relaxed">
                    Powered by Node.js and Prisma ORM for ultra-fast database operations and seamless PostgreSQL integration via Supabase.
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Lock className="h-8 w-8" />
                 </div>
                 <h3 className="text-2xl font-black text-white font-heading tracking-tight">Secure Authentication</h3>
                 <p className="text-zinc-500 leading-relaxed">
                    Enterprise-grade security using Better Auth. Fully protected routes, role-based access control, and encrypted session management.
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Activity className="h-8 w-8" />
                 </div>
                 <h3 className="text-2xl font-black text-white font-heading tracking-tight">Real-time Auditing</h3>
                 <p className="text-zinc-500 leading-relaxed">
                    Live stock tracking with automated threshold alerts. High-priority emergency requisition bypass logic for critical care.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Engineer Showcase */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-10">
                 <div className="space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                       Project Architecture
                    </Badge>
                    <h2 className="text-5xl md:text-6xl font-black text-white font-heading leading-tight tracking-tighter">
                       Designed by <br />
                       <span className="text-primary italic">Habibullah</span>
                    </h2>
                 </div>
                 <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                    Every line of code and pixel in this system was meticulously crafted to represent the pinnacle of full-stack engineering and DevOps excellence.
                 </p>
                 <div className="grid grid-cols-2 gap-8 pt-4">
                    {[
                       { label: "Frontend", value: "Next.js + TS" },
                       { label: "Backend", value: "Express + Node" },
                       { label: "Database", value: "PostgreSQL" },
                       { label: "Security", value: "Better Auth" }
                    ].map((stat) => (
                       <div key={stat.label} className="border-l-2 border-white/10 pl-6 py-2">
                          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-white font-black text-xl">{stat.value}</p>
                       </div>
                    ))}
                 </div>
                 <Link href="https://habibullah.dev" target="_blank" className="inline-block">
                    <Button variant="ghost" className="text-white font-bold hover:text-primary transition-colors group">
                       View Portfolio
                       <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                 </Link>
              </div>
              
              <div className="flex-1 relative w-full aspect-square max-w-lg">
                 <div className="absolute inset-0 bg-primary/20 rounded-[64px] rotate-6 scale-95 blur-2xl" />
                 <div className="relative h-full w-full bg-zinc-900 border border-white/5 rounded-[64px] p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
                    <div className="flex justify-between items-start">
                       <div className="h-16 w-16 rounded-2xl bg-card/5 flex items-center justify-center border border-white/10">
                          <Monitor className="h-8 w-8 text-primary" />
                       </div>
                       <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 font-bold">SYSTEM ACTIVE</Badge>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Build Status</p>
                          <div className="h-2 w-full bg-card/5 rounded-full overflow-hidden">
                             <div className="h-full w-full bg-primary animate-pulse" />
                          </div>
                       </div>
                       <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                             <div key={i} className="h-1 bg-card/10 rounded-full" />
                          ))}
                       </div>
                       <p className="text-zinc-400 text-xs font-mono">
                          &gt; Deploying production bundle... <br />
                          &gt; Verifying SSL certificates... <br />
                          &gt; Optimization complete.
                       </p>
                    </div>
                    
                    {/* Decorative Code Snippet */}
                    <div className="absolute -right-20 top-1/3 rotate-12 bg-zinc-950 p-6 rounded-3xl border border-white/10 opacity-20 hidden md:block">
                       <pre className="text-[10px] font-mono text-primary">
{`const config = {
  architect: "Habibullah",
  stack: "Full-Stack",
  devOps: true,
  dark: "Default"
};`}
                       </pre>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter mb-10">
               READY TO <br />
               <span className="text-primary italic">ALLOCATE?</span>
            </h2>
            <Link href="/register">
               <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-20 px-16 rounded-[32px] font-black text-2xl shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)] transition-all hover:scale-105">
                  Get Started
               </Button>
            </Link>
         </div>
      </section>
    </div>
  );
}

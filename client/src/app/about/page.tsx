"use client";

import { ShieldCheck, Cpu, Code, Zap, Monitor, ArrowRight, Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const stats = [
    { label: "Deployments", value: "1,200+" },
    { label: "Uptime", value: "99.99%" },
    { label: "Code Coverage", value: "95%" },
    { label: "API Latency", value: "<50ms" },
  ];

  const corePillars = [
    {
      icon: Code,
      title: "Clean Architecture",
      description: "Every module is engineered following SOLID principles and layered architecture for maximum maintainability.",
      color: "text-primary bg-primary/10"
    },
    {
      icon: Terminal,
      title: "DevOps Excellence",
      description: "Automated CI/CD pipelines, containerized environments, and cloud-native scaling strategies.",
      color: "text-secondary bg-secondary/10"
    },
    {
      icon: Monitor,
      title: "Modern Stack",
      description: "Utilizing the latest in Next.js, TypeScript, and Prisma ORM to deliver a high-performance experience.",
      color: "text-emerald-500 bg-emerald-500/10"
    }
  ];

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              The Architect
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white font-heading leading-[0.9] tracking-tighter">
              Engineering <br />
              <span className="text-primary italic">Excellence.</span>
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
              MediSync is more than a procurement system. It&apos;s a showcase of modern full-stack architecture and DevOps mastery, engineered by <span className="text-white font-bold underline decoration-primary underline-offset-4">Habibullah</span>.
            </p>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-zinc-950/50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-3 border-l border-white/10 pl-8">
                <p className="text-5xl font-black text-white font-heading tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Story */}
      <section className="py-32">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tight">The Vision of MediSync</h2>
                  <div className="h-1 w-20 bg-primary rounded-full" />
               </div>
               <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                 <p>
                   MediSync was conceptualized to solve the critical inefficiency in hospital resource allocation. By combining real-time inventory tracking with emergency priority logic, we&apos;ve created a system that literally saves time when time is most valuable.
                 </p>
                 <p>
                   As a Senior Full-Stack & DevOps Engineer, I architected this platform to be resilient, secure, and blazing fast. Every endpoint, database index, and UI component has been optimized for the highest production standards.
                 </p>
               </div>
               <div className="pt-6">
                 <Link href="https://habibullah.dev" target="_blank">
                   <Button size="lg" className="rounded-2xl bg-card text-black hover:bg-zinc-200 h-16 px-10 font-bold text-lg group">
                     Visit Official Website
                     <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                   </Button>
                 </Link>
               </div>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 rounded-[64px] rotate-3 blur-3xl opacity-30" />
               <div className="relative bg-zinc-900 border border-white/5 rounded-[64px] p-12 overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-center gap-8">
                  <div className="space-y-6">
                     <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Code className="h-8 w-8" />
                     </div>
                     <h3 className="text-3xl font-black text-white font-heading uppercase tracking-tighter leading-none">
                        BUILT FOR <br />
                        <span className="text-zinc-500">PRODUCTION</span>
                     </h3>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-emerald-500 bg-emerald-500/10 w-fit px-4 py-2 rounded-xl border border-emerald-500/20">
                        <Zap className="h-4 w-4 fill-current" />
                        <span className="text-xs font-bold uppercase tracking-widest">Optimized Bundle</span>
                     </div>
                     <div className="flex items-center gap-4 text-primary bg-primary/10 w-fit px-4 py-2 rounded-xl border border-primary/20">
                        <ShieldCheck className="h-4 w-4 fill-current" />
                        <span className="text-xs font-bold uppercase tracking-widest">Enterprise Security</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 bg-zinc-950/50 relative">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <h2 className="text-5xl font-black text-white font-heading tracking-tighter">ENGINEERING PILLARS</h2>
            <p className="text-zinc-500 text-lg font-medium tracking-tight">The technical foundation of everything I build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {corePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="group p-12 rounded-[48px] bg-zinc-900 border border-white/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                   <div className={`p-5 rounded-2xl w-fit mb-8 ${pillar.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-10 w-10" />
                   </div>
                   <h3 className="text-2xl font-black text-white font-heading mb-4 tracking-tight">{pillar.title}</h3>
                   <p className="text-zinc-500 leading-relaxed font-medium">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Activity, 
  Database, 
  Cpu,
  Lock,
  Stethoscope,
  Truck,
  Globe,
  Users,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-4">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto text-center space-y-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Badge variant="outline" className="bg-white/5 border-white/10 text-primary px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl">
              <Zap className="h-3 w-3 mr-2 fill-current animate-bounce" />
              Next-Gen Medical Procurement
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black font-heading tracking-tighter text-white leading-[0.8] mb-4">
              CLINICAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary italic">INTELLIGENCE.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-zinc-500 text-lg md:text-2xl font-medium leading-relaxed">
              Wish Ass is the absolute pinnacle of medical procurement. Engineered by Habibullah for clinics that demand zero latency and absolute reliability.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-cyan-400 h-20 px-12 rounded-[32px] font-black text-xl shadow-[0_0_50px_-10px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95 group">
                Access Inventory
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 h-20 px-12 rounded-[32px] font-black text-xl transition-all hover:scale-105">
                Our Mission
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-20 flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="flex items-center gap-2">
               <Stethoscope className="h-6 w-6" />
               <span className="font-bold text-sm tracking-widest uppercase">500+ Clinics</span>
            </div>
            <div className="flex items-center gap-2">
               <Shield className="h-6 w-6" />
               <span className="font-bold text-sm tracking-widest uppercase">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
               <Globe className="h-6 w-6" />
               <span className="font-bold text-sm tracking-widest uppercase">Global Logistics</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white font-heading tracking-tighter uppercase">Why Wish Ass?</h2>
              <p className="text-zinc-500 max-w-xl mx-auto font-medium">Built by clinicians, for clinicians. We solved the inventory nightmare.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Activity className="h-10 w-10" />,
                  title: "Real-time Pulse",
                  desc: "Track every pill, kit, and device in real-time. Never run out of critical supplies during surgery again.",
                  color: "text-primary bg-primary/10"
                },
                {
                  icon: <Truck className="h-10 w-10" />,
                  title: "Express Logistics",
                  desc: "Automated replenishment logic that connects directly to global medical manufacturers.",
                  color: "text-secondary bg-secondary/10"
                },
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "Staff Accounts",
                  desc: "Granular role management for nurses, pharmacists, and chief medical officers.",
                  color: "text-emerald-500 bg-emerald-500/10"
                },
                {
                  icon: <BarChart3 className="h-10 w-10" />,
                  title: "Predictive Analytics",
                  desc: "AI-driven usage forecasting based on historical hospital admission data.",
                  color: "text-orange-500 bg-orange-500/10"
                },
                {
                  icon: <Lock className="h-10 w-10" />,
                  title: "Clinical Security",
                  desc: "HIPAA and GDPR compliant data storage with enterprise-grade encryption.",
                  color: "text-blue-500 bg-blue-500/10"
                },
                {
                  icon: <Cpu className="h-10 w-10" />,
                  title: "API-First Design",
                  desc: "Seamlessly integrate with your existing Hospital Management Systems (HMS).",
                  color: "text-zinc-400 bg-white/5"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-[48px] bg-card border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className={`h-20 w-20 rounded-3xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                     {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white font-heading mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Engineer Spotlight (Signature Habibullah Style) */}
      <section className="py-40 bg-zinc-900/30 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1 relative order-2 lg:order-1">
                 <div className="absolute inset-0 bg-primary/20 rounded-[64px] blur-3xl opacity-30" />
                 <div className="relative p-12 bg-zinc-950 border border-white/10 rounded-[64px] shadow-2xl space-y-10 overflow-hidden">
                    <div className="flex items-center justify-between">
                       <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Database className="h-6 w-6 text-primary" />
                       </div>
                       <Badge className="bg-primary/10 text-primary border-none">ARCHITECTURE v4.0</Badge>
                    </div>
                    <div className="space-y-6">
                       <h3 className="text-3xl font-black text-white font-heading italic">&quot;Zero Lag. Zero Errors.&quot;</h3>
                       <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                          We don&apos;t just build software; we engineer medical lifelines. Wish Ass&apos;s backend is optimized for sub-50ms response times globally.
                       </p>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                          <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-black text-xl">H</div>
                       </div>
                       <div>
                          <p className="font-black text-white text-lg tracking-tight leading-none">Habibullah</p>
                          <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">Chief Architect</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="flex-1 space-y-12 order-1 lg:order-2">
                 <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">Development Philosophy</Badge>
                 <h2 className="text-6xl md:text-8xl font-black text-white font-heading tracking-tighter leading-[0.85]">
                   ENGINEERED FOR <br />
                   <span className="text-zinc-600">MISSION CRITICAL.</span>
                 </h2>
                 <p className="text-zinc-500 text-xl font-medium max-w-xl">
                   Built using the most stable enterprise stack available. Wish Ass ensures your hospital operations never stop.
                 </p>
                 <div className="flex gap-4">
                    <Link href="https://habibullah.dev" target="_blank">
                       <Button size="lg" className="rounded-full px-8 h-14 bg-white text-black font-bold hover:bg-zinc-200">
                          Visit Studio
                       </Button>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="py-32 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black text-white font-heading tracking-tighter uppercase leading-none">
                    Trusted by <br />
                    <span className="text-primary italic">Clinical Leaders.</span>
                 </h2>
                 <p className="text-zinc-500 text-lg font-medium max-w-md">
                    Wish Ass is more than software. It&apos;s a partner in patient care, ensuring resources are where they need to be, exactly when they&apos;re needed.
                 </p>
                 <div className="flex gap-4 pt-4">
                    <div className="h-px w-20 bg-primary self-center" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global Healthcare Alliance</span>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                    { quote: "Wish Ass reduced our procurement latency by 40%. It's a game changer.", author: "Dr. Sarah Chen", role: "Chief of Surgery" },
                    { quote: "The most intuitive inventory system I've used in 20 years of nursing.", author: "Marcus Thorne", role: "Head Nurse" }
                 ].map((t, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-8 rounded-[40px] bg-white/5 border border-white/5 space-y-6 shadow-2xl"
                    >
                       <p className="text-zinc-300 font-medium italic">&quot;{t.quote}&quot;</p>
                       <div>
                          <p className="text-white font-bold text-sm">{t.author}</p>
                          <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Global Partners / Logos */}
      <section className="py-24 border-y border-white/5 bg-zinc-900/10 overflow-hidden">
         <div className="container mx-auto px-4">
            <p className="text-center text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em] mb-12">Integrated with Industry Standards</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
               {["FDA", "HIPAA", "ISO 9001", "HL7", "CE"].map(logo => (
                 <span key={logo} className="text-4xl font-black text-white font-heading tracking-tighter">{logo}</span>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 relative text-center">
         <div className="container mx-auto px-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="space-y-12"
            >
               <h2 className="text-6xl md:text-[9rem] font-black text-white font-heading tracking-tighter leading-none">
                 READY TO <br />
                 <span className="text-primary">SYNC?</span>
               </h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link href="/register">
                    <Button className="h-24 px-20 rounded-[40px] bg-primary hover:bg-cyan-400 text-black font-black text-3xl shadow-2xl transition-all hover:scale-110">
                       Deploy Now
                    </Button>
                  </Link>
                  <p className="text-zinc-500 font-bold text-xl">Join 2,400+ hospitals globally.</p>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
}

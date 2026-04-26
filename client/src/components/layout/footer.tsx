"use client";

import Link from "next/link";
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  ShieldCheck,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] translate-y-1/2" />

      <div className="container px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-xl bg-primary p-2 text-primary-foreground shadow-[0_0_15px_-3px_rgba(34,211,238,0.5)]">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white font-heading">
                  Medi<span className="text-primary">Sync</span>
                </span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
                  By habibullah.dev
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm max-w-xs">
              A state-of-the-art hospital procurement system engineered for speed, reliability, and precision. Built with the modern stack to empower clinical workflows.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/md8-habibullah" target="_blank">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/5 hover:bg-white/5 hover:text-primary transition-all">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://twitter.com/md8_habibullah" target="_blank">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/5 hover:bg-white/5 hover:text-primary transition-all">
                  <Twitter className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/habibullah-dev" target="_blank">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/5 hover:bg-white/5 hover:text-primary transition-all">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Platform</h4>
            <ul className="space-y-4">
              {[
                { name: "Central Inventory", href: "/shop" },
                { name: "Requisition Queue", href: "/cart" },
                { name: "Order History", href: "/orders" },
                { name: "Return Policy", href: "/return-policy" },
                { name: "Staff Support", href: "/faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-500 hover:text-primary text-sm transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8">Engineering</h4>
            <ul className="space-y-4">
              {[
                { name: "System Architecture", href: "/about" },
                { name: "Privacy Protocol", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Security Audit", href: "#" },
                { name: "API Documentation", href: "#" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-500 hover:text-primary text-sm transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2">Connect</h4>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-zinc-300 text-xs font-bold">medi@habibullah.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-zinc-300 text-xs font-bold">+880 1700 000000</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-zinc-300 text-xs font-bold">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-xs font-medium">
              &copy; {currentYear} Wish Ass. Engineered with &hearts; by <Link href="https://habibullah.dev" className="text-zinc-400 hover:text-primary transition-colors">Habibullah</Link>.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-zinc-600">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Lock className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Thermometer, 
  Droplet, 
  Baby, 
  Sparkles, 
  Heart, 
  Activity,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Pain Relief", icon: Thermometer, color: "bg-red-50 text-red-600" },
  { name: "Cold & Flu", icon: Activity, color: "bg-blue-50 text-blue-600" },
  { name: "Digestive", icon: Droplet, color: "bg-green-50 text-green-600" },
  { name: "Skin Care", icon: Sparkles, color: "bg-pink-50 text-pink-600" },
  { name: "Baby Care", icon: Baby, color: "bg-purple-50 text-purple-600" },
  { name: "Supplements", icon: Heart, color: "bg-orange-50 text-orange-600" },
];

export function CategoriesSection() {
  return (
    <section className="container px-4 md:px-8 py-24 space-y-16">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <Badge className="bg-teal-50 text-teal-700 border-teal-100 font-bold mb-2">Our Catalog</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 font-heading leading-tight">
            Comprehensive Care for <br /> Every Department.
          </h2>
          <p className="text-lg text-zinc-500">
            Find exactly what you need by browsing our specialized medical categories. All products are sourced from verified pharmacies.
          </p>
        </div>
        <Link href="/categories">
          <Button variant="outline" className="rounded-full h-14 px-8 border-zinc-200 font-bold hover:bg-zinc-50 group">
            All Categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
        {/* Large Featured Category */}
        <Link 
          href="/shop?category=Supplements" 
          className="lg:col-span-7 relative group overflow-hidden rounded-[48px] shadow-2xl shadow-zinc-200/50 block"
        >
          <Image 
            src="/images/medicine_categories_collage_1776588038884.png"
            alt="Wellness Essentials"
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
             <Badge className="bg-teal-500 border-none text-white font-bold">Featured Category</Badge>
             <h3 className="text-4xl md:text-5xl font-bold font-heading">Vitality & Wellness</h3>
             <p className="text-zinc-300 text-lg max-w-md">Discover premium vitamins and daily supplements to power your lifestyle.</p>
             <div className="pt-4">
                <Button className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full h-12 px-8 font-bold">
                  Browse Collection
                </Button>
             </div>
          </div>
        </Link>

        {/* Category Grid Sidebar */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <Link 
              key={cat.name} 
              href={`/shop?category=${cat.name}`}
              className="group relative flex flex-col items-center justify-center p-8 rounded-[40px] bg-white border border-zinc-100 transition-all hover:shadow-2xl hover:border-teal-200 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`p-5 rounded-[24px] mb-4 ${cat.color} group-hover:scale-110 transition-transform relative z-10 shadow-sm`}>
                <cat.icon className="h-8 w-8" />
              </div>
              <span className="text-sm font-extrabold text-zinc-800 text-center relative z-10 uppercase tracking-widest">{cat.name}</span>
              
              {/* Background pattern */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-zinc-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
          
          <Link 
            href="/shop"
            className="col-span-2 group relative flex items-center justify-between p-8 rounded-[40px] bg-zinc-900 transition-all hover:bg-zinc-800"
          >
             <div className="space-y-1">
                <h4 className="text-white font-bold text-xl">View All Medicines</h4>
                <p className="text-zinc-400 text-sm">Over 5,000+ items available</p>
             </div>
             <div className="h-14 w-14 rounded-full bg-teal-600 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowRight className="h-6 w-6" />
             </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

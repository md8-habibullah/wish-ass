"use client";

import { 
  Thermometer, 
  Droplet, 
  Baby, 
  Sparkles, 
  Heart, 
  Activity,
  ArrowRight,
  Pill,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";

const categoryMeta: Record<string, any> = {
  "prescription": { 
    icon: Stethoscope, 
    color: "bg-red-50 text-red-600", 
    description: "Prescription-only medications verified by healthcare professionals."
  },
  "otc": { 
    icon: Thermometer, 
    color: "bg-blue-50 text-blue-600", 
    description: "Over-the-counter medications for common ailments and symptoms."
  },
  "supplement": { 
    icon: Heart, 
    color: "bg-green-50 text-green-600", 
    description: "Vitamins, minerals, and dietary supplements for wellness."
  },
  "device": { 
    icon: Activity, 
    color: "bg-purple-50 text-purple-600", 
    description: "Medical equipment and diagnostic tools for health monitoring."
  },
  "cosmetic": { 
    icon: Sparkles, 
    color: "bg-pink-50 text-pink-600", 
    description: "Dermatological products and healthcare-grade beauty items."
  },
  "others": { 
    icon: Pill, 
    color: "bg-background text-zinc-400", 
    description: "Miscellaneous health supplies and general pharmacy items."
  },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-3xl mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-white font-heading">Explore Categories</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Find exactly what you need by browsing our specialized healthcare categories. All products are verified for quality and safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />
          ))
        ) : (
          categories.map((cat) => {
            const meta = categoryMeta[cat.name.toLowerCase()] || categoryMeta.others;
            const Icon = meta.icon;
            const medicine = cat.medicines?.[0];
            return (
              <Link 
                key={cat.name} 
                href={`/shop?category=${cat.name}`}
                className="group flex flex-col p-8 rounded-3xl bg-card border border-white/5 transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-teal-200"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl w-fit ${meta.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  {medicine && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-white/5 shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                      In Stock
                    </div>
                  )}
                </div>
                <div className="space-y-3 mb-6">
                   <h3 className="text-xl font-bold text-white font-heading group-hover:text-primary transition-colors capitalize">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                    {medicine ? (
                      <>Sample: <span className="font-semibold text-zinc-700">{medicine.name}</span></>
                    ) : (
                      meta.description
                    )}
                  </p>
                  {medicine && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-zinc-400">Starting from</p>
                      <p className="text-lg font-bold text-primary">${medicine.price}</p>
                    </div>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Explore Products</span>
                  <div className="rounded-full bg-background p-2 text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Featured Banner */}
      <div className="mt-20 rounded-[40px] bg-zinc-900 p-12 relative overflow-hidden text-center md:text-left">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold text-white font-heading leading-tight">
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Our inventory is updated daily. You can search our full database or contact our support team to help you find specific medications.
              </p>
           </div>
           <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary h-14 px-8 rounded-full font-bold shadow-xl shadow-primary/20">
                Browse Full Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
           </Link>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

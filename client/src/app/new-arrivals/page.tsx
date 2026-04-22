"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";
import { Sparkles, ShoppingBag, Plus, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRequisitionStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewArrivalsPage() {
  const router = useRouter();
  const addItem = useRequisitionStore((state) => state.addItem);

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/medicine?orderBy=desc`);
      return res.data.data; // Already sorted by desc in backend (newest first)
    },
  });

  return (
    <div className="container px-4 py-16 md:px-8">
      <div className="max-w-3xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-white/5">
          <Sparkles className="h-3 w-3 fill-current" />
          Just Restocked
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-heading">New <span className="text-primary">Arrivals.</span></h1>
        <p className="text-lg text-zinc-500 leading-relaxed">
          The latest additions to our healthcare inventory. Be the first to access our newly verified medications and health products.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-96 rounded-[40px] bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {medicines?.map((med: any) => (
            <Card 
              key={med.id} 
              className="group rounded-[40px] border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/shop/${med.id}`)}
            >
              <div className="relative bg-background p-6 flex items-center justify-center aspect-square">
                <Image 
                  src="/images/medicine_pack_placeholder_1776588054881.png"
                  alt={med.name}
                  width={180}
                  height={180}
                  className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-white border-none shadow-md font-bold uppercase text-[8px] tracking-widest px-2 py-0.5">
                  NEW
                </Badge>
              </div>
              
              <div className="flex flex-col justify-between p-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-heading leading-tight">
                    {med.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                    {med.category}
                  </p>
                </div>

                <CardFooter className="p-0 pt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-white font-heading">${med.price.toFixed(2)}</span>
                  <Button 
                    size="icon" 
                    className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary shadow-lg shadow-primary/20 transition-all active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({
                        id: med.id,
                        name: med.name,
                        price: med.price,
                        category: med.category,
                        stock: med.stock,
                        quantity: 1
                      });
                      toast.success(`${med.name} added to cart!`);
                    }}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

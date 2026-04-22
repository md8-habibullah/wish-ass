"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Info,
  Clock,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container px-4 py-32 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="bg-zinc-50 p-10 rounded-[60px] mb-8 relative">
          <ShoppingBag className="h-20 w-20 text-zinc-200" />
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-teal-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-extrabold text-zinc-900 font-heading tracking-tight">Your cart feels light</h1>
        <p className="text-zinc-500 mt-4 text-lg leading-relaxed">
          Looks like you haven&apos;t added any essential medicines yet. We have 5,000+ items ready for delivery.
        </p>
        <Link href="/shop" className="mt-10">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 h-16 px-12 rounded-full font-extrabold text-lg shadow-2xl shadow-teal-500/20 group">
            Browse Pharmacy
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-16 md:px-8 max-w-7xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-10">
        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-zinc-900 font-bold">Shopping Cart</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-10">
          <div className="space-y-2">
             <h1 className="text-4xl font-extrabold text-zinc-900 font-heading tracking-tight">Shopping Bag.</h1>
             <p className="text-zinc-500">You have <span className="text-zinc-900 font-bold">{getItemCount()} items</span> in your healthcare collection.</p>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-[40px] border border-zinc-100 p-8 flex flex-col md:flex-row gap-8 transition-all hover:shadow-2xl hover:border-teal-100 overflow-hidden">
                <div className="h-40 w-full md:w-40 flex-shrink-0 bg-zinc-50 rounded-[32px] overflow-hidden flex items-center justify-center p-6 border border-zinc-50 transition-colors group-hover:bg-white">
                  <Image 
                    src="/images/medicine_pack_placeholder_1776588054881.png"
                    alt={item.name} 
                    width={100}
                    height={100}
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <Badge className="bg-teal-50 text-teal-600 border-none font-bold text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full">
                           {item.category}
                         </Badge>
                         <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">In Stock</span>
                      </div>
                      <Link href={`/shop/${item.id}`} className="block">
                        <h3 className="text-2xl font-bold text-zinc-900 hover:text-teal-600 transition-colors font-heading leading-tight">
                          {item.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-bold text-zinc-900 font-heading">${(item.price * item.quantity).toFixed(2)}</p>
                       <p className="text-xs text-zinc-400 font-medium">${item.price.toFixed(2)} per unit</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between mt-8 gap-6">
                    <div className="flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl h-10 w-10 hover:bg-white hover:shadow-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-extrabold text-sm">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl h-10 w-10 hover:bg-white hover:shadow-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.stock || 99)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-zinc-400 hover:text-red-500 font-bold gap-2 rounded-xl h-11 px-4 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      REMOVE ITEM
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex items-start gap-5 p-8 rounded-[40px] bg-emerald-50/50 border border-emerald-100/50">
                <div className="p-4 rounded-2xl bg-white shadow-sm text-emerald-600">
                   <ShieldCheck className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                   <p className="text-lg font-bold text-zinc-900 font-heading">Secure Health Policy</p>
                   <p className="text-sm text-zinc-500 leading-relaxed">All medicines are verified for clinical standards and shelf life before shipping.</p>
                </div>
             </div>
             <div className="flex items-start gap-5 p-8 rounded-[40px] bg-blue-50/50 border border-blue-100/50">
                <div className="p-4 rounded-2xl bg-white shadow-sm text-blue-600">
                   <Clock className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                   <p className="text-lg font-bold text-zinc-900 font-heading">Express Delivery</p>
                   <p className="text-sm text-zinc-500 leading-relaxed">Expect your delivery within 24 hours in metro areas. Temperature controlled transit.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-[400px] space-y-8">
          <Card className="rounded-[48px] border-zinc-100 shadow-2xl shadow-zinc-200/50 overflow-hidden sticky top-32">
            <CardContent className="p-10 space-y-10">
              <div className="space-y-2">
                 <h2 className="text-2xl font-bold text-zinc-900 font-heading tracking-tight">Order Insight</h2>
                 <p className="text-sm text-zinc-500">Review your final pricing before checkout.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-zinc-500 font-bold text-sm tracking-widest uppercase">
                  <span>Bag Subtotal</span>
                  <span className="text-zinc-900 text-lg font-heading tracking-normal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 font-bold text-sm tracking-widest uppercase">
                  <span>Global Shipping</span>
                  <span className="text-zinc-900 text-lg font-heading tracking-normal">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 font-bold text-sm tracking-widest uppercase">
                  <span>Estimated Tax</span>
                  <span className="text-zinc-900 text-lg font-heading tracking-normal">$0.00</span>
                </div>
                
                <div className="relative pt-6">
                   <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
                   <div className="flex justify-between items-center pt-2">
                      <span className="text-zinc-900 font-black text-xl font-heading tracking-tight uppercase">Order Total</span>
                      <span className="text-teal-600 font-black text-4xl font-heading">${total.toFixed(2)}</span>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                 <Link href="/checkout" className="block w-full">
                   <Button className="w-full bg-teal-600 hover:bg-teal-700 h-20 rounded-[32px] text-xl font-extrabold shadow-2xl shadow-teal-500/30 group transition-all active:scale-95">
                     Checkout Now
                     <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                   </Button>
                 </Link>
                 <div className="flex items-center justify-center gap-6 text-zinc-300">
                    <CreditCard className="h-6 w-6" />
                    <div className="h-4 w-px bg-zinc-100" />
                    <ShoppingBag className="h-6 w-6" />
                    <div className="h-4 w-px bg-zinc-100" />
                    <ShieldCheck className="h-6 w-6" />
                 </div>
              </div>
              
              <div className="p-6 rounded-3xl bg-zinc-50 space-y-4 border border-zinc-100">
                 <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <Info className="h-4 w-4 text-teal-600" />
                    <span>Promo Code?</span>
                 </div>
                 <div className="flex gap-2">
                    <Input placeholder="SAVE20" className="h-12 rounded-2xl bg-white border-zinc-100 font-bold placeholder:font-medium shadow-inner" />
                    <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold bg-white">Apply</Button>
                 </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useRequisitionStore } from "@/lib/cart-store";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Zap, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  Building2,
  AlertCircle,
  Phone,
  Shield,
  Activity,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  fullName: z.string().min(2, "Staff name is required"),
  phone: z.string().min(1, "Contact extension is required"),
  departmentName: z.string().min(2, "Department/Ward name is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

export default function CheckoutPage() {
  const { items, getTotal, clearRequisition } = useRequisitionStore();
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!sessionLoading && !session) {
      router.push("/login?callbackUrl=/checkout");
    }
    if (isMounted && items.length === 0) {
      router.push("/shop");
    }
  }, [session, sessionLoading, router, items.length, isMounted]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: session?.user.name || "",
      phone: "",
      departmentName: "",
      priority: "LOW",
    },
  });

  if (!isMounted || sessionLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const subtotal = getTotal();
  const logisticsFee = 0.00; // Internal systems usually don't charge
  const total = subtotal + logisticsFee;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          medicineId: item.id,
          quantity: item.quantity
        })),
        priority: values.priority
      };

      await axios.post(`${API_BASE_URL}/orders`, orderData, {
        withCredentials: true
      });

      toast.success("Requisition Initialized Successfully!");
      clearRequisition();
      router.push("/orders");
    } catch (err: any) {
      console.error("Requisition error:", err);
      toast.error(err.response?.data?.message || "Protocol failure. Please re-submit.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-10">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em]">
              <Cpu className="h-4 w-4" />
              Allocation Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">
              Finalize <span className="text-primary italic">Requisition.</span>
            </h1>
          </div>
          <Link href="/cart">
            <Button variant="ghost" className="rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 h-12 font-bold group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Return to Queue
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="rounded-[40px] border-white/5 bg-card/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
                  <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-3 font-heading text-white">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      Internal Allocation
                    </CardTitle>
                    <Badge className="bg-primary/10 text-primary border-primary/20">System Ver. 4.0</Badge>
                  </CardHeader>
                  <CardContent className="p-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Staff Identity</FormLabel>
                            <FormControl>
                              <Input placeholder="Authorized Personnel Name" className="h-14 rounded-2xl bg-zinc-950/50 border-white/5 text-white focus:ring-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Comms Extension</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-4 top-4.5 h-5 w-5 text-zinc-400" />
                                <Input placeholder="Ext 402" className="pl-12 h-14 rounded-2xl bg-zinc-950/50 border-white/5 text-white focus:ring-primary/20" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="departmentName"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Destination Ward</FormLabel>
                            <FormControl>
                              <Input placeholder="ICU / Emergency / Pediatrics" className="h-14 rounded-2xl bg-zinc-950/50 border-white/5 text-white focus:ring-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Allocation Urgency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 rounded-2xl bg-zinc-950/50 border-white/5 text-white focus:ring-primary/20">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-2xl bg-zinc-900 border-white/5 text-white">
                                <SelectItem value="LOW" className="focus:bg-primary/10 focus:text-primary rounded-xl h-12 cursor-pointer">LOW (Standard Batch)</SelectItem>
                                <SelectItem value="MEDIUM" className="focus:bg-primary/10 focus:text-primary rounded-xl h-12 cursor-pointer text-orange-400">MEDIUM (Priority Batch)</SelectItem>
                                <SelectItem value="EMERGENCY" className="focus:bg-red-500/10 focus:text-red-500 rounded-xl h-12 cursor-pointer font-bold text-red-500">EMERGENCY (Bypass Queue)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-8 rounded-[40px] border border-white/5 bg-zinc-900/50 flex items-center gap-6">
                  <div className="h-16 w-16 rounded-[24px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Activity className="h-8 w-8" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-white font-black tracking-tight text-lg uppercase leading-none">Automated Delivery</p>
                    <p className="text-zinc-500 text-sm font-medium tracking-tight">Supplies will be dispatched via internal pneumatics or courier immediately.</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-primary opacity-20" />
                </div>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <Card className="rounded-[40px] border-white/5 bg-zinc-950 shadow-2xl overflow-hidden sticky top-24">
              <CardHeader className="p-8 border-b border-white/5 bg-card/20">
                <CardTitle className="text-xl font-heading text-white">Resource Manifest</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-5 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-white font-bold text-sm leading-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-black text-sm tracking-tight">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-[10px] font-bold text-zinc-400">QTY: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-white/5" />
                
                <div className="space-y-4">
                  <div className="flex justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-emerald-500">FREE</span>
                  </div>
                  <div className="pt-6 flex justify-between items-baseline border-t border-white/5">
                    <span className="text-white font-black text-xl tracking-tighter uppercase">Total Value</span>
                    <span className="text-primary font-black text-3xl tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-20 rounded-[32px] font-black text-xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] transition-all hover:scale-105 group" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Confirm Allocation
                      <Zap className="ml-3 h-6 w-6 fill-current transition-transform group-hover:scale-125" />
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-zinc-400">
                  <Shield className="h-3 w-3" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">End-to-End Encrypted Verification</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCartStore } from "@/lib/cart-store";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  MapPin,
  Phone,
  Wallet
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import axios from "axios";

import { API_BASE_URL } from "@/lib/api-config";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Full delivery address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Valid zip code is required"),
});

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
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
      address: "",
      city: "",
      zipCode: "",
    },
  });

  if (!isMounted || sessionLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = 5.00;
  const total = subtotal + shipping;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // API call to create order
      const orderData = {
        items: items.map(item => ({
          medicineId: item.id,
          quantity: item.quantity
        }))
      };

      await axios.post(`${API_BASE_URL}/orders`, orderData, {
        withCredentials: true
      });

      toast.success("Order placed successfully!");
      clearCart();
      router.push("/orders");
    } catch (err: any) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container px-4 py-8 md:px-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900 font-heading">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="rounded-3xl border-zinc-100 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                  <CardTitle className="text-lg flex items-center gap-2 font-heading">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                              <Input placeholder="+1 234 567 890" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street name, Building No, Apartment" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Health City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-zinc-100 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                  <CardTitle className="text-lg flex items-center gap-2 font-heading">
                    <Wallet className="h-5 w-5 text-teal-600" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-teal-600 bg-teal-50/30">
                    <div className="p-3 rounded-xl bg-teal-600 text-white">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-teal-900">Cash on Delivery</p>
                      <p className="text-xs text-teal-700">Pay when you receive your medicines.</p>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-teal-600" />
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border-teal-50 shadow-xl shadow-teal-50/50 overflow-hidden sticky top-24">
            <CardHeader className="border-b border-zinc-50 p-8">
              <CardTitle className="text-xl font-heading">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-sm">
                    <span className="text-zinc-600">
                      {item.name} <span className="text-zinc-400 font-bold ml-1">x{item.quantity}</span>
                    </span>
                    <span className="font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between text-zinc-600 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 text-sm">
                  <span>Shipping Fee</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-teal-900 pt-3 font-heading border-t border-zinc-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-teal-600 hover:bg-teal-700 h-14 rounded-full text-lg font-bold shadow-xl shadow-teal-100 mt-4" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Confirm Order
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

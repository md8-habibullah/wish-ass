"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Loader2,
  Calendar,
  CreditCard,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { API_BASE_URL } from "@/lib/api-config";

const statusConfig: any = {
  PENDING: { color: "bg-orange-100 text-orange-700", icon: Clock, text: "Pending" },
  PROCESSING: { color: "bg-blue-100 text-blue-700", icon: Package, text: "Processing" },
  SHIPPED: { color: "bg-purple-100 text-purple-700", icon: Truck, text: "Shipped" },
  DELIVERED: { color: "bg-green-100 text-green-700", icon: CheckCircle2, text: "Delivered" },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: ChevronRight, text: "Cancelled" },
};

export default function OrdersPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login?callbackUrl=/orders");
    }
  }, [session, sessionLoading, router]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/orders/my-orders`, {
        withCredentials: true
      });
      // The backend uses json-with-bigint which might return string for BigInt
      return res.data.data || res.data || [];
    },
    enabled: !!session,
  });

  if (sessionLoading || isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-zinc-900 font-heading">My Orders</h1>
          <p className="text-zinc-500">Track and manage your recent purchases</p>
        </div>
        <Link href="/shop">
          <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
          <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-zinc-300" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No orders yet</h3>
          <p className="text-zinc-500 max-w-xs mx-auto mt-2">
            You haven&apos;t placed any orders yet. Head to the shop to find what you need.
          </p>
          <Link href="/shop">
            <Button className="mt-8 bg-teal-600 hover:bg-teal-700">Go to Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <Card key={order.id} className="rounded-3xl border-zinc-100 shadow-sm overflow-hidden hover:border-teal-200 transition-colors">
              <CardHeader className="bg-zinc-50/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100">
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Order ID</p>
                    <p className="text-sm font-bold text-zinc-900">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Date Placed</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Amount</p>
                    <p className="text-sm font-bold text-teal-700">${(Number(order.totalPrice) / 100).toFixed(2)}</p>
                  </div>
                </div>
                
                <Badge className={`${statusConfig[order.status]?.color} border-none px-4 py-1.5 rounded-full flex items-center gap-2 h-fit`}>
                  {(() => {
                    const Config = statusConfig[order.status];
                    return (
                      <>
                        {Config && <Config.icon className="h-3.5 w-3.5" />}
                        <span className="font-bold tracking-tight">{Config?.text || order.status}</span>
                      </>
                    );
                  })()}
                </Badge>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-50">
                  {order.orderItems?.map((item: any) => (
                    <div key={item.id} className="p-6 md:px-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-sm">{item.medicine?.name || "Medicine"}</p>
                          <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-zinc-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 md:p-8 bg-zinc-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Method: <span className="font-bold text-zinc-700">Cash on Delivery</span></span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-bold px-5">
                      Need Help?
                    </Button>
                    <Link href={`/shop`}>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-full text-xs font-bold px-5">
                        Buy Again
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

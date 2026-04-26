"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Loader2,
  Calendar,
  ChevronRight,
  MoreVertical,
  Filter,
  Search,
  User,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";
import Link from "next/link";

const statusConfig: any = {
  PENDING: { color: "bg-orange-100 text-orange-700", icon: Clock, text: "Pending" },
  PROCESSING: { color: "bg-blue-100 text-blue-700", icon: Package, text: "Processing" },
  SHIPPED: { color: "bg-purple-100 text-purple-700", icon: Truck, text: "Shipped" },
  DELIVERED: { color: "bg-green-100 text-green-700", icon: CheckCircle2, text: "Delivered" },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: ChevronRight, text: "Cancelled" },
};

export default function SellerOrdersPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const role = (session?.user as any)?.role;
    if (!sessionLoading && (!session || (role !== "SELLER" && role !== "ADMIN"))) {
      router.push("/");
    }
  }, [session, sessionLoading, router]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["seller-orders"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/orders/seller-orders`, { withCredentials: true });
      return res.data.data || res.data || [];
    },
    enabled: !!session,
  });

  const statusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      return await axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, { status }, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    }
  });

  if (sessionLoading || isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const filteredOrders = orders?.filter((order: any) => 
    order.id.toLowerCase().includes(search.toLowerCase()) || 
    order.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 md:px-8">
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/seller/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-bold">Manage Orders</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white font-heading">Incoming Orders</h1>
          <p className="text-zinc-500">View and update the status of orders from your customers</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search by Order ID or Name..." 
              className="pl-9 rounded-xl h-11 text-sm shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-zinc-200 shadow-sm">
            <Filter className="h-4 w-4 text-zinc-500" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {!filteredOrders || filteredOrders.length === 0 ? (
           <div className="py-20 text-center text-zinc-400 bg-card rounded-3xl border border-dashed border-zinc-200">
             <Package className="h-10 w-10 mx-auto opacity-20 mb-2" />
             <p className="text-sm font-medium">No orders found</p>
           </div>
        ) : (
          filteredOrders.map((order: any) => (
            <Card key={order.id} className="rounded-3xl border-white/5 shadow-sm overflow-hidden hover:border-teal-200 transition-all">
              <CardHeader className="bg-background/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                <div className="flex flex-wrap items-center gap-6 md:gap-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Order ID</p>
                    <p className="text-sm font-bold text-white">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Customer</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                        {order.user?.name?.charAt(0) || "U"}
                      </div>
                      {order.user?.name || "Anonymous User"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Date</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Price</p>
                    <p className="text-sm font-bold text-primary">${Number(order.totalPrice).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <Badge className={`${statusConfig[order.status]?.color} border-none px-4 py-2 rounded-full flex items-center gap-2 h-fit text-xs font-bold`}>
                      {(() => {
                        const Config = statusConfig[order.status];
                        return (
                          <>
                            {Config && <Config.icon className="h-3.5 w-3.5" />}
                            <span>{Config?.text || order.status}</span>
                          </>
                        );
                      })()}
                   </Badge>

                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-zinc-200">
                           <MoreVertical className="h-4 w-4 text-zinc-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl w-48">
                        <DropdownMenuLabel className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Update Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => statusMutation.mutate({ orderId: order.id, status: "PROCESSING" })} className="cursor-pointer">
                          <Package className="mr-2 h-4 w-4 text-blue-600" />
                          <span>Mark as Processing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => statusMutation.mutate({ orderId: order.id, status: "SHIPPED" })} className="cursor-pointer">
                          <Truck className="mr-2 h-4 w-4 text-purple-600" />
                          <span>Mark as Shipped</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => statusMutation.mutate({ orderId: order.id, status: "DELIVERED" })} className="cursor-pointer">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                          <span>Mark as Delivered</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => statusMutation.mutate({ orderId: order.id, status: "CANCELLED" })} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                          <ChevronRight className="mr-2 h-4 w-4" />
                          <span>Cancel Order</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Order Items</p>
                      <div className="space-y-3">
                         {order.orderItems?.map((item: any) => (
                           <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-background border border-white/5">
                             <div className="flex items-center gap-3">
                               <div className="h-8 w-8 bg-card rounded-lg border border-white/5" />
                               <span className="text-sm font-bold text-white">{item.medicine?.name || "Medicine"}</span>
                             </div>
                             <span className="text-xs font-medium text-zinc-500">Qty: {item.quantity}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer Details</p>
                      <div className="p-5 rounded-2xl border border-white/5 space-y-3">
                         <div className="flex items-start gap-3">
                            <User className="h-4 w-4 text-zinc-400 mt-0.5" />
                            <div className="text-sm">
                               <p className="font-bold text-white">{order.user?.name}</p>
                               <p className="text-zinc-500">{order.user?.email}</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <Truck className="h-4 w-4 text-zinc-400 mt-0.5" />
                            <p className="text-sm text-zinc-400 leading-relaxed">
                               {order.shippingAddress || "No address provided"}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

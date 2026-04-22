"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
  Plus, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users,
  AlertCircle,
  Loader2,
  Settings,
  Pill,
  ArrowUpRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  MoreVertical,
  LayoutDashboard,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { API_BASE_URL } from "@/lib/api-config";

export default function SellerDashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    const role = (session?.user as any)?.role;
    if (!sessionLoading && (!session || (role !== "SELLER" && role !== "ADMIN"))) {
      router.push("/");
    }
  }, [session, sessionLoading, router]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: async () => {
       const isSeller = (session?.user as any).role === "SELLER";
       const [ordersRes, medicinesRes] = await Promise.all([
         axios.get(`${API_BASE_URL}/orders/seller-orders`, { withCredentials: true }),
         axios.get(isSeller ? `${API_BASE_URL}/medicine?sellerID=${session?.user.id}` : `${API_BASE_URL}/medicine`, { withCredentials: true })
       ]);
       
       const orders = ordersRes.data.data || ordersRes.data || [];
       const medicines = medicinesRes.data.data || medicinesRes.data || [];

       return {
         totalOrders: orders.length,
         activeMedicines: medicines.length || 0, 
         totalSales: orders.reduce((acc: number, curr: any) => acc + Number(curr.totalPrice), 0) / 100,
         pendingOrders: orders.filter((o: any) => o.status === "PENDING").length,
         rawOrders: orders
       };
    },
    enabled: !!session,
  });

  if (sessionLoading || statsLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  const statCards = [
    { title: "Revenue", value: `$${stats?.totalSales.toFixed(2)}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+12.5%" },
    { title: "Medicines", value: stats?.activeMedicines, icon: Pill, color: "text-teal-600", bg: "bg-teal-50", trend: "+2 new" },
    { title: "Orders", value: stats?.totalOrders, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50", trend: "+5 today" },
    { title: "Pending", value: stats?.pendingOrders, icon: Clock, color: "text-orange-600", bg: "bg-orange-50", trend: "High priority" },
  ];

  return (
    <div className="container px-4 py-12 md:px-8 max-w-7xl space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 rounded-[48px] bg-zinc-900 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500 text-white">
                 <Store className="h-6 w-6" />
              </div>
              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 font-bold px-3 py-0.5 rounded-full text-[10px] tracking-widest uppercase">
                 {(session?.user as any).role === "ADMIN" ? "Admin Hub" : "Seller Hub"}
              </Badge>
           </div>
           <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-extrabold font-heading">Dashboard Overview</h1>
              <p className="text-zinc-400 text-lg">Welcome back, <span className="text-white font-bold">{session?.user.name}</span>. Here&apos;s the {(session?.user as any).role === "ADMIN" ? "platform" : "pharmacy"} status.</p>
           </div>
        </div>
        <div className="relative z-10 flex gap-4">
           <Link href="/seller/medicines/new">
             <Button className="bg-teal-600 hover:bg-teal-700 h-16 px-10 rounded-3xl font-extrabold text-lg shadow-xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95">
               <Plus className="mr-3 h-6 w-6" />
               List Medicine
             </Button>
           </Link>
           <Button variant="outline" className="h-16 w-16 rounded-3xl border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
             <Settings className="h-6 w-6" />
           </Button>
        </div>
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => {
          const content = (
            <Card className="group h-full rounded-[48px] border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer bg-white">
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <Badge className={`${stat.bg} ${stat.color} border-none font-bold text-xs px-4 py-1.5 rounded-full`}>
                     {stat.trend}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">{stat.title}</p>
                  <h3 className="text-6xl font-black text-zinc-900 font-heading tracking-tighter leading-none">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          );

          if (stat.title === "Medicines") {
            return <Link key={stat.title} href="/seller/medicines">{content}</Link>;
          }
          if (stat.title === "Orders") {
            return <Link key={stat.title} href="/seller/orders">{content}</Link>;
          }
          if (stat.title === "Pending") {
            return <Link key={stat.title} href="/seller/orders">{content}</Link>;
          }
          return <div key={stat.title}>{content}</div>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 rounded-[48px] border-zinc-100 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-10 border-b border-zinc-50 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold font-heading">Fulfillment Queue</CardTitle>
              <p className="text-sm text-zinc-500">Orders awaiting processing or shipment</p>
            </div>
            <Link href="/seller/orders">
              <Button variant="ghost" className="text-teal-600 font-bold hover:bg-teal-50 rounded-2xl px-6">
                View Full Queue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-zinc-50">
                {(() => {
                   const pendingOrders = stats?.rawOrders?.filter((o: any) => o.status !== "DELIVERED" && o.status !== "CANCELLED").slice(0, 5) || [];
                   
                   if (pendingOrders.length === 0) {
                      return (
                        <div className="p-20 text-center space-y-4">
                           <div className="p-6 bg-zinc-50 rounded-full w-fit mx-auto">
                              <ShoppingBag className="h-10 w-10 text-zinc-200" />
                           </div>
                           <div className="space-y-2">
                              <p className="text-xl font-bold text-zinc-900 font-heading">No pending tasks</p>
                              <p className="text-zinc-500 max-w-xs mx-auto">Everything is shipped! Sit back and relax.</p>
                           </div>
                        </div>
                      );
                   }

                   return pendingOrders.map((order: any) => (
                      <div key={order.id} className="p-6 hover:bg-zinc-50/50 transition-colors flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                               <Package className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-zinc-900">Order #{order.id.slice(0, 8)}</p>
                               <p className="text-xs text-zinc-500">{order.user?.name} • {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="text-right">
                               <p className="text-sm font-bold text-zinc-900">${(Number(order.totalPrice) / 100).toFixed(2)}</p>
                               <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{order.status}</p>
                            </div>
                            <Link href="/seller/orders">
                               <Button variant="outline" size="icon" className="h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                         </div>
                      </div>
                   ));
                })()}
             </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="rounded-[48px] border-zinc-100 shadow-sm overflow-hidden">
          <CardHeader className="p-10 border-b border-zinc-50">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold font-heading">Stock Alerts</CardTitle>
              <p className="text-sm text-zinc-500">Inventory items running low</p>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-zinc-50 border border-zinc-100 group hover:border-red-200 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-2xl border border-zinc-200 flex items-center justify-center p-2">
                          <Pill className="h-6 w-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                       </div>
                       <div>
                          <p className="font-bold text-zinc-900 text-sm">Advanced Medication {i}</p>
                          <p className="text-xs text-zinc-500">Remaining: <span className="text-red-600 font-bold">{i * 2} units</span></p>
                       </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white text-zinc-300 hover:text-zinc-900">
                       <Plus className="h-5 w-5" />
                    </Button>
                 </div>
               ))}
             </div>
             <Link href="/seller/medicines">
                <Button variant="outline" className="w-full h-14 rounded-3xl border-zinc-200 font-bold hover:bg-zinc-50">
                  Update Full Inventory
                </Button>
             </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Overview (Mock Graph UI) */}
      <Card className="rounded-[48px] border-zinc-100 shadow-sm overflow-hidden bg-white">
         <CardHeader className="p-10 border-b border-zinc-50 flex flex-row items-center justify-between">
            <div className="space-y-1">
               <CardTitle className="text-2xl font-bold font-heading">Performance Insight</CardTitle>
               <p className="text-sm text-zinc-500">Your sales volume over the last 30 days</p>
            </div>
            <Select defaultValue="30d">
               <SelectTrigger className="w-32 rounded-xl border-zinc-100">
                  <SelectValue placeholder="Period" />
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  <SelectItem value="7d">Last 7d</SelectItem>
                  <SelectItem value="30d">Last 30d</SelectItem>
                  <SelectItem value="90d">Last 90d</SelectItem>
               </SelectContent>
            </Select>
         </CardHeader>
         <CardContent className="p-10">
            <div className="h-[300px] w-full flex items-end gap-3 px-4">
               {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((val, i) => (
                 <div key={i} className="flex-1 space-y-4 flex flex-col items-center group">
                    <div className="relative w-full h-full flex items-end justify-center">
                       <div 
                         className="w-full rounded-t-xl bg-teal-100 group-hover:bg-teal-600 transition-all duration-500" 
                         style={{ height: `${val}%` }} 
                       />
                       <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                          ${(val * 10).toFixed(0)}
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400">MAY {i + 1}</span>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

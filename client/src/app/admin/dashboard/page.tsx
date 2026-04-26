"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  Loader2,
  Settings,
  Pill,
  LayoutDashboard,
  Shield,
  ArrowUpRight,
  Ban,
  Mail,
  UserCheck
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";

export default function AdminDashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!sessionLoading && (!session || (session.user as any).role !== "ADMIN")) {
      router.push("/");
    }
  }, [session, sessionLoading, router]);

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
      return res.data.data || res.data || []; // Handle both structures
    },
    enabled: !!session,
  });

  const roleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string, role: string }) => {
      return await axios.patch(`${API_BASE_URL}/users/roleChange`, { id: userId, role }, { withCredentials: true });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(res.data.message || "User role updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update user role");
    }
  });

  const { data: platformStats, isLoading: platformStatsLoading } = useQuery({
    queryKey: ["admin-platform-stats"],
    queryFn: async () => {
       const [ordersRes, medicinesRes] = await Promise.all([
         axios.get(`${API_BASE_URL}/orders/seller-orders`, { withCredentials: true }), // Admin gets ALL orders here
         axios.get(`${API_BASE_URL}/medicine`, { withCredentials: true })
       ]);
       
       const orders = ordersRes.data.data || ordersRes.data || [];
       const medicines = medicinesRes.data.data || medicinesRes.data || [];

       return {
         totalOrders: orders.length,
         totalRevenue: orders.reduce((acc: number, curr: any) => acc + Number(curr.totalPrice), 0),
         totalMedicines: medicines.length || 0,
       };
    },
    enabled: !!session,
  });

  if (sessionLoading || usersLoading || platformStatsLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { title: "Total Users", value: users?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Platform Revenue", value: `$${platformStats?.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { title: "Total Orders", value: platformStats?.totalOrders || 0, icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Medicines", value: platformStats?.totalMedicines || 0, icon: Pill, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const filteredUsers = users?.filter((user: any) => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-12 md:px-8 max-w-7xl space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-12 rounded-[60px] bg-zinc-950 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/20">
                 <Shield className="h-6 w-6" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-bold px-4 py-1 rounded-full text-[10px] tracking-widest uppercase">
                 Administrator
              </Badge>
           </div>
           <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-tight">Platform Control.</h1>
              <p className="text-zinc-400 text-lg">Manage users, oversee transactions, and maintain platform integrity.</p>
           </div>
        </div>
        
        {/* Stats Summary in Header */}
         <div className="relative z-10 flex flex-wrap gap-4">
           <Button 
            onClick={() => router.push("/admin/dashboard/announcements")}
            className="bg-primary text-black hover:bg-cyan-400 h-16 px-10 rounded-3xl font-extrabold text-lg shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
           >
              <Bell className="h-6 w-6" />
              Broadcast Center
           </Button>
           <Button className="bg-card text-zinc-950 hover:bg-zinc-200 h-16 px-10 rounded-3xl font-extrabold text-lg shadow-xl transition-all hover:scale-105 active:scale-95">
              System Settings
           </Button>
        </div>

        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="group rounded-[48px] border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <CardContent className="p-10 space-y-8">
              <div className={`p-4 rounded-[24px] w-fit ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-4xl font-extrabold text-white font-heading tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management */}
      <Card className="rounded-[60px] border-white/5 shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-10 border-b border-background flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold font-heading">User Directory</CardTitle>
            <p className="text-zinc-500">Monitor and manage all accounts registered on MediSync</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                <Input 
                  placeholder="Search users by name or email..." 
                  className="pl-12 h-14 rounded-2xl bg-background border-none text-sm focus-visible:ring-purple-500 shadow-inner"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/5 bg-card hover:bg-background shadow-sm">
                <Filter className="h-5 w-5 text-zinc-500" />
             </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow className="border-white/5">
                  <TableHead className="p-8 font-bold text-white uppercase tracking-widest text-[10px]">User</TableHead>
                  <TableHead className="p-8 font-bold text-white uppercase tracking-widest text-[10px]">Role</TableHead>
                  <TableHead className="p-8 font-bold text-white uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="p-8 font-bold text-white uppercase tracking-widest text-[10px]">Joined</TableHead>
                  <TableHead className="p-8 font-bold text-white uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user: any) => (
                  <TableRow key={user.id} className="border-background hover:bg-background/50 transition-colors">
                    <TableCell className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/5 to-zinc-200 flex items-center justify-center font-extrabold text-zinc-500 shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-lg">{user.name}</span>
                          <span className="text-sm text-zinc-400 flex items-center gap-1.5">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-8">
                      <Badge className={`rounded-full px-4 py-1 font-bold text-[10px] tracking-widest border-none ${
                        user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : 
                        user.role === "SELLER" ? "bg-primary/10 text-primary" : 
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-8">
                      {user.banned ? (
                        <Badge variant="destructive" className="rounded-full px-4 py-1 text-[10px] font-bold border-none flex items-center gap-2 w-fit">
                           <ShieldAlert className="h-3 w-3" /> BANNED
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-full px-4 py-1 text-[10px] font-bold flex items-center gap-2 w-fit">
                           <UserCheck className="h-3 w-3" /> ACTIVE
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="p-8 text-zinc-500 font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="p-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/5">
                            <MoreVertical className="h-5 w-5 text-zinc-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2">
                          <DropdownMenuItem className="rounded-xl h-12 cursor-pointer font-bold gap-3">
                             <Mail className="h-4 w-4 text-zinc-400" /> Message User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl h-12 cursor-pointer font-bold gap-3">
                             <ArrowUpRight className="h-4 w-4 text-zinc-400" /> View History
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="rounded-xl h-12 cursor-pointer font-bold gap-3 text-purple-600 focus:text-purple-600 focus:bg-purple-50"
                            onClick={() => roleMutation.mutate({ userId: user.id, role: "ADMIN" })}
                          >
                             <Shield className="h-4 w-4" /> Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="rounded-xl h-12 cursor-pointer font-bold gap-3 text-primary focus:text-primary focus:bg-primary/10"
                            onClick={() => roleMutation.mutate({ userId: user.id, role: "SELLER" })}
                          >
                             <ShieldCheck className="h-4 w-4" /> Make Seller
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="rounded-xl h-12 cursor-pointer font-bold gap-3 text-blue-600 focus:text-blue-600 focus:bg-blue-50"
                            onClick={() => roleMutation.mutate({ userId: user.id, role: "CUSTOMER" })}
                          >
                             <UserCheck className="h-4 w-4" /> Make Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredUsers?.length === 0 && (
            <div className="py-32 text-center space-y-6">
               <div className="p-8 bg-background rounded-full w-fit mx-auto shadow-sm border border-dashed border-zinc-200">
                 <Users className="h-12 w-12 text-zinc-200" />
               </div>
               <div className="space-y-1">
                 <h3 className="text-2xl font-bold text-white font-heading">No users found</h3>
                 <p className="text-zinc-500">No accounts match your current search criteria.</p>
               </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

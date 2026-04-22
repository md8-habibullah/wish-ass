"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Loader2,
  Pill,
  Package,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
import Link from "next/link";

import { API_BASE_URL } from "@/lib/api-config";

export default function SellerMedicinesPage() {
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

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["seller-medicines"],
    queryFn: async () => {
      const isSeller = (session?.user as any)?.role === "SELLER";
      const url = isSeller 
        ? `${API_BASE_URL}/medicine?sellerID=${session?.user.id}`
        : `${API_BASE_URL}/medicine`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data.data || res.data || []; 
    },
    enabled: !!session,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${API_BASE_URL}/medicine/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
      toast.success("Medicine removed from inventory");
    },
    onError: () => {
      toast.error("Failed to delete medicine");
    }
  });

  if (sessionLoading || isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const filteredMedicines = medicines?.filter((med: any) => 
    med.name.toLowerCase().includes(search.toLowerCase()) || 
    med.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 md:px-8">
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/seller/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-bold">Manage Inventory</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Inventory</h1>
          <p className="text-zinc-500">Manage your medicine listings and stock levels</p>
        </div>
        <Link href="/seller/medicines/new">
          <Button className="bg-primary hover:bg-primary h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-5 w-5" />
            Add New Medicine
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-white/5 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-background p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-heading">Active Listings</CardTitle>
          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
             <Input 
              placeholder="Search inventory..." 
              className="pl-9 rounded-xl h-10 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow>
                <TableHead className="font-bold text-white">Medicine</TableHead>
                <TableHead className="font-bold text-white">Category</TableHead>
                <TableHead className="font-bold text-white">Price</TableHead>
                <TableHead className="font-bold text-white">Stock</TableHead>
                <TableHead className="text-right font-bold text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines?.map((med: any) => (
                <TableRow key={med.id} className="hover:bg-background/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm">{med.name}</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{med.manufacturer}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full border-white/5 text-primary bg-primary/10 px-3 py-0.5 text-[10px] font-bold">
                      {med.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-white text-sm">
                    ${med.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {med.stock <= 5 ? (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-red-600">{med.stock} (Low)</span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-zinc-400">{med.stock} units</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreVertical className="h-4 w-4 text-zinc-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href={`/seller/medicines/edit/${med.id}`}>
                            <Edit className="mr-2 h-4 w-4 text-zinc-400" />
                            <span>Edit Listing</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                          onClick={() => {
                            if(confirm("Are you sure you want to delete this medicine?")) {
                              deleteMutation.mutate(med.id);
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMedicines?.length === 0 && (
            <div className="py-20 text-center text-zinc-400">
               <Package className="h-10 w-10 mx-auto opacity-20 mb-2" />
               <p className="text-sm font-medium">No medicines found in your inventory</p>
               <Link href="/seller/medicines/new" className="mt-4 inline-block">
                 <Button variant="link" className="text-primary">Add your first medicine</Button>
               </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ShoppingBag,
  Plus,
  Star,
  Loader2,
  ChevronRight,
  LayoutGrid,
  List,
  Info,
  ArrowLeft
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { useRequisitionStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";
import { useEffect } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

import { Suspense } from "react";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get("category")?.toLowerCase() || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialStock = searchParams.get("stock") === "true";
  const initialManufacturer = searchParams.get("manufacturer") || "all";
  const initialTags = searchParams.get("tags")?.split(",") || [];
  
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("desc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [stockOnly, setStockOnly] = useState(initialStock);
  const [manufacturer, setManufacturer] = useState(initialManufacturer);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  
  const addItem = useRequisitionStore((state) => state.addItem);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (stockOnly) params.set("stock", "true");
    if (manufacturer !== "all") params.set("manufacturer", manufacturer);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [search, category, stockOnly, manufacturer, selectedTags, pathname, router]);

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines", search, category, sortBy, stockOnly, manufacturer, selectedTags],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "all") params.append("category", category);
      if (stockOnly) params.append("stock", "true");
      if (manufacturer !== "all") params.append("manufacturer", manufacturer);
      if (selectedTags.length > 0) params.append("tags", selectedTags.join(","));
      params.append("orderBy", sortBy);
      
      const res = await axios.get(`${API_BASE_URL}/medicine?${params.toString()}`);
      return res.data.data; 
    },
  });

  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        if (response.data && Array.isArray(response.data.data)) {
          const names = response.data.data.map((c: any) => c.name);
          setCategories(["All", ...names]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);

  const manufacturers = [
    "All", "Square Limited", "Beximco Pharma", "Incepta", "Opsonin", "Renata", "ACME"
  ];

  const commonTags = [
    "Paracetamol", "Fever", "Painkiller", "Antibiotic", "Vitamin", "Syrup", "Tablet"
  ];

  const filterProps = {
    category, setCategory, loadingCats, categories,
    stockOnly, setStockOnly,
    manufacturer, setManufacturer, manufacturers,
    selectedTags, setSelectedTags, commonTags
  };

  return (
    <div className="container px-4 py-12 md:px-8 max-w-7xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-bold">Inventory</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-72 space-y-10">
          <FilterContent {...filterProps} />
        </aside>

        {/* Mobile Filter Sheet */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-card flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <span className="font-bold">Filters & Refinement</span>
                </div>
                <Badge className="bg-primary text-white">
                  {(category !== "all" ? 1 : 0) + (stockOnly ? 1 : 0) + (manufacturer !== "all" ? 1 : 0) + selectedTags.length}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto bg-zinc-950 border-white/5">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-2xl font-black font-heading text-white">Refine Search</SheetTitle>
              </SheetHeader>
              <div className="pb-20">
                <FilterContent {...filterProps} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-card border border-white/5 rounded-[32px] shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-5 w-5 text-zinc-400" />
              <Input 
                placeholder="Search medications, health products..." 
                className="pl-12 h-12 rounded-2xl bg-background border-none text-sm focus-visible:ring-primary shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-background rounded-2xl p-1 border border-white/5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-10 w-10 rounded-xl ${view === "grid" ? "bg-card shadow-sm text-primary" : "text-zinc-400"}`}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-10 w-10 rounded-xl ${view === "list" ? "bg-card shadow-sm text-primary" : "text-zinc-400"}`}
                  onClick={() => setView("list")}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-12 rounded-2xl border-white/5 bg-card font-bold text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 rounded-[40px] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : medicines?.length === 0 ? (
            <div className="py-20 text-center space-y-6 bg-background rounded-[40px] border border-dashed border-zinc-200">
               <div className="p-6 bg-card rounded-full w-fit mx-auto shadow-sm">
                 <Search className="h-10 w-10 text-zinc-300" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-bold text-white font-heading">No medications found</h3>
                 <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
               </div>
               <Button 
                 variant="outline" 
                 onClick={() => {
                   setSearch(""); 
                   setCategory("all"); 
                   setStockOnly(false);
                   setManufacturer("all");
                   setSelectedTags([]);
                 }} 
                 className="rounded-full"
               >
                 Clear all filters
               </Button>
            </div>
          ) : (
            <div className={view === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "flex flex-col gap-6"
            }>
              {medicines?.map((med: any) => (
                <Card 
                  key={med.id} 
                  className={`group rounded-[40px] border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                    view === "list" ? "flex flex-col sm:flex-row h-auto sm:h-52" : ""
                  }`}
                  onClick={() => router.push(`/shop/${med.id}`)}
                >
                  <div className={`relative bg-background p-6 flex items-center justify-center ${
                    view === "list" ? "w-full sm:w-64 h-48 sm:h-auto shrink-0" : "aspect-[4/3]"
                  }`}>
                    <Image 
                      src="/images/medicine_pack_placeholder_1776588054881.png"
                      alt={med.name}
                      width={180}
                      height={180}
                      className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <Badge className="absolute top-6 left-6 bg-card/80 backdrop-blur-md text-primary border-none shadow-sm font-bold uppercase text-[10px] tracking-widest px-3 py-1">
                      {med.category}
                    </Badge>
                  </div>
                  
                  <div className={`flex flex-col justify-between p-8 ${view === "list" ? "flex-1" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`h-3 w-3 ${s <= 4 ? "fill-orange-400 text-orange-400" : "text-zinc-200"}`} />
                        ))}
                        <span className="text-[10px] font-bold text-zinc-400">(24 Reviews)</span>
                      </div>
                      <div className="block">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-heading leading-tight">
                          {med.name}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-500 line-clamp-2">
                        Authentic medication sourced from verified sellers. Verified for quality and shelf life.
                      </p>
                    </div>

                    <CardFooter className="p-0 pt-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white font-heading">${med.price.toFixed(2)}</span>
                        {med.stock <= 5 && <span className="text-[10px] font-bold text-red-500">Low Stock: {med.stock} left</span>}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/shop/${med.id}`} onClick={(e) => e.stopPropagation()}>
                           <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-white/5 hover:bg-background text-zinc-400 hover:text-primary transition-all">
                              <Info className="h-5 w-5" />
                           </Button>
                        </Link>
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
                            toast.success(`${med.name} added to requisition!`);
                          }}
                        >
                          <Plus className="h-6 w-6" />
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FilterContent({ 
  category, setCategory, loadingCats, categories, 
  stockOnly, setStockOnly, 
  manufacturer, setManufacturer, manufacturers,
  selectedTags, setSelectedTags, commonTags
}: any) {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white font-heading">Categories</h3>
        <div className="flex flex-col gap-2">
          {loadingCats ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-background animate-pulse" />
            ))
          ) : (
            categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                  category === cat.toLowerCase() 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" 
                    : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                <span className="text-sm capitalize">{cat}</span>
                {category === cat.toLowerCase() && <div className="h-1.5 w-1.5 rounded-full bg-card animate-pulse" />}
              </button>
            ))
          )}
        </div>
      </div>

      <Separator className="bg-white/5" />

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white font-heading">Stock Status</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStockOnly(!stockOnly)}
            className={`flex-1 p-3 rounded-2xl border-2 transition-all text-sm font-bold ${
              stockOnly 
                ? "border-primary bg-primary/10 text-primary" 
                : "border-white/5 text-zinc-500 hover:border-zinc-200"
            }`}
          >
            In Stock Only
          </button>
        </div>
      </div>

      <Separator className="bg-white/5" />

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white font-heading">Manufacturers</h3>
        <Select value={manufacturer} onValueChange={setManufacturer}>
          <SelectTrigger className="w-full h-12 rounded-2xl border-white/5 bg-card font-medium text-sm">
            <SelectValue placeholder="Select manufacturer" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {manufacturers.map((m: any) => (
              <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-white/5" />

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white font-heading">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {commonTags.map((tag: any) => {
            const isSelected = selectedTags.includes(tag.toLowerCase());
            return (
              <button
                key={tag}
                onClick={() => {
                  if (isSelected) {
                    setSelectedTags(selectedTags.filter((t: any) => t !== tag.toLowerCase()));
                  } else {
                    setSelectedTags([...selectedTags, tag.toLowerCase()]);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/5 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-white/5" />

      <div className="space-y-6">
         <h3 className="text-xl font-bold text-white font-heading">Quick Support</h3>
         <div className="p-6 rounded-3xl bg-zinc-900 text-white space-y-4 relative overflow-hidden">
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Medical Desk</p>
            <p className="text-sm leading-relaxed">Need help finding a specific medication?</p>
            <Button size="sm" className="w-full bg-primary hover:bg-primary rounded-xl font-bold">
              Live Chat
            </Button>
            <Info className="absolute -bottom-4 -right-4 h-20 w-20 text-white/5 rotate-12" />
         </div>
      </div>
    </div>
  );
}

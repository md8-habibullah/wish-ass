"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { 
  Pill, 
  ArrowLeft, 
  Loader2, 
  Save, 
  Upload,
  Info,
  DollarSign,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  description: z.string().min(10, "Provide a detailed description"),
  category: z.string().min(1, "Select a category"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  tags: z.string().optional(),
});

export default function MedicineFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      category: "others",
      price: 0,
      stock: 0,
      manufacturer: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (!sessionLoading && (!session || ((session.user as any).role !== "SELLER" && (session.user as any).role !== "ADMIN"))) {
      router.push("/");
    }

    if (isEdit) {
      axios.get(`${API_BASE_URL}/medicine/${id}`)
        .then(res => {
          const med = res.data.data;
          form.reset({
            name: med.name,
            description: med.description,
            category: med.category,
            price: med.price,
            stock: med.stock,
            manufacturer: med.manufacturer,
            tags: med.tags?.join(", ") || "",
          });
        })
        .catch(() => toast.error("Failed to load medicine data"))
        .finally(() => setIsFetching(false));
    }
  }, [id, isEdit, session, sessionLoading, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      };

      if (isEdit) {
        await axios.patch(`${API_BASE_URL}/medicine/${id}`, payload, { withCredentials: true });
        toast.success("Medicine updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/medicine`, payload, { withCredentials: true });
        toast.success("Medicine added to inventory");
      }
      router.push("/seller/medicines");
    } catch (err: any) {
      console.error("Medicine save error:", err);
      toast.error(err.response?.data?.message || err.message || "Something went wrong while saving");
    } finally {
      setIsLoading(false);
    }
  }

  if (sessionLoading || isFetching) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/seller/medicines">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white font-heading">
          {isEdit ? "Edit Medicine" : "Add New Medicine"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="rounded-3xl border-white/5 shadow-sm overflow-hidden">
                <CardHeader className="bg-background/50 border-b border-white/5">
                  <CardTitle className="text-lg flex items-center gap-2 font-heading">
                    <Info className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicine Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Paracetamol 500mg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the medicine, its uses, and precautions..." 
                            className="min-h-[150px] resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="others">Others</SelectItem>
                              <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                              <SelectItem value="Cold & Flu">Cold & Flu</SelectItem>
                              <SelectItem value="Digestive Health">Digestive Health</SelectItem>
                              <SelectItem value="Skin Care">Skin Care</SelectItem>
                              <SelectItem value="Vitamins & Supplements">Vitamins</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manufacturer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manufacturer</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Pfizer, GSK" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-white/5 shadow-sm overflow-hidden">
                <CardHeader className="bg-background/50 border-b border-white/5">
                  <CardTitle className="text-lg flex items-center gap-2 font-heading">
                    <Package className="h-5 w-5 text-primary" />
                    Inventory & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                              <Input type="number" step="0.01" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. fever, headache, pain" {...field} />
                        </FormControl>
                        <FormDescription>Separate tags with commas</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="rounded-3xl border-white/5 shadow-sm overflow-hidden">
                <CardHeader className="bg-background/50 border-b border-white/5">
                  <CardTitle className="text-lg flex items-center gap-2 font-heading">
                    <Upload className="h-5 w-5 text-primary" />
                    Product Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="aspect-square bg-background rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-center p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <Upload className="h-10 w-10 text-zinc-300 group-hover:text-primary transition-colors mb-4" />
                    <p className="text-sm font-medium text-zinc-400">Click to upload image</p>
                    <p className="text-xs text-zinc-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                  </div>
                </CardContent>
              </Card>

              <div className="sticky top-24 space-y-4">
                 <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                  disabled={isLoading}
                 >
                   {isLoading ? (
                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                   ) : (
                     <>
                       <Save className="mr-2 h-5 w-5" />
                       {isEdit ? "Update Medicine" : "Save Medicine"}
                     </>
                   )}
                 </Button>
                 <Link href="/seller/medicines" className="block">
                   <Button variant="ghost" className="w-full h-14 rounded-2xl text-zinc-500 hover:bg-white/5 font-bold">
                     Cancel
                   </Button>
                 </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

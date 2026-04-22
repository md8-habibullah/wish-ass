"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Star, 
  ShieldCheck, 
  Truck, 
  Undo2,
  Clock,
  ChevronRight,
  Share2,
  Heart,
  Loader2,
  Info,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";
import { useSession } from "@/lib/auth-client";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const { data: medicine, isLoading } = useQuery({
    queryKey: ["medicine", id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/medicine/${id}`);
      return res.data.data;
    },
  });

  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/reviews/${id}`);
      return res.data.data || res.data || [];
    },
  });

  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const postReview = async () => {
    if (!session) {
      toast.error("Please login to write a review");
      return;
    }
    if (!comment) {
      toast.error("Please provide a comment");
      return;
    }

    setIsSubmittingReview(true);
    try {
      await axios.post(`${API_BASE_URL}/reviews`, {
        medicineId: id,
        rating,
        comment
      }, { withCredentials: true });
      
      toast.success("Review posted successfully!");
      setComment("");
      refetchReviews();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to post review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const addToCart = () => {
    if (medicine) {
      addItem({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        category: medicine.category,
        stock: medicine.stock,
        quantity: quantity
      });
      toast.success(`${medicine.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="container px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-heading">Medicine not found</h2>
        <Link href="/shop" className="text-teal-600 hover:underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-8 max-w-7xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-teal-600 transition-colors">Shop</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-zinc-900 font-bold">{medicine.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-8">
           <div className="relative aspect-square rounded-[60px] bg-white border border-zinc-100 overflow-hidden shadow-2xl shadow-zinc-200/50 flex items-center justify-center p-12">
              <Image 
                src="/images/medicine_pack_placeholder_1776588054881.png"
                alt={medicine.name}
                width={400}
                height={400}
                className="object-contain"
                priority
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                 <Badge className="bg-teal-50 text-teal-700 border-teal-100 font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase">
                    Premium Quality
                 </Badge>
                 <Badge className={`bg-green-50 text-green-700 border-green-100 font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase ${medicine.stock === 0 ? "bg-red-50 text-red-700 border-red-100" : ""}`}>
                    {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
                 </Badge>
              </div>
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                 <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-zinc-100 bg-white shadow-sm hover:text-red-500">
                    <Heart className="h-5 w-5" />
                 </Button>
                 <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-zinc-100 bg-white shadow-sm">
                    <Share2 className="h-5 w-5" />
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`aspect-square rounded-3xl border ${i === 1 ? "border-teal-500 bg-teal-50" : "border-zinc-100 bg-white"} p-4 flex items-center justify-center cursor-pointer transition-all hover:border-teal-500`}>
                   <Image 
                    src="/images/medicine_pack_placeholder_1776588054881.png"
                    alt={medicine.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
           </div>
        </div>

        {/* Right: Info & Purchase */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`h-4 w-4 ${s <= 4 ? "fill-orange-400 text-orange-400" : "text-zinc-200"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-500">{reviews?.length || 0} Customer Reviews</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 font-heading leading-tight">{medicine.name}</h1>
              <p className="text-zinc-500 font-medium">Manufacturer: <span className="text-zinc-900 font-bold uppercase tracking-wider">{medicine.manufacturer}</span></p>
            </div>

            <div className="flex items-baseline gap-3">
               <span className="text-4xl font-extrabold text-teal-600 font-heading">${medicine.price.toFixed(2)}</span>
            </div>

            <p className="text-zinc-600 leading-relaxed text-lg">
              {medicine.description || "Authentic and verified medical product. This OTC medication is effective for its intended clinical applications. Always follow the recommended dosage or consult a healthcare professional."}
            </p>
          </div>

          <Separator className="bg-zinc-100" />

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="w-12 text-center font-extrabold text-lg">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-sm"
                  onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                  disabled={medicine.stock === 0}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              <div className="text-sm">
                 <p className="font-bold text-zinc-900">{medicine.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                 <p className="text-zinc-500">{medicine.stock} units available</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                className="flex-1 h-16 rounded-3xl bg-teal-600 hover:bg-teal-700 font-extrabold text-lg shadow-xl shadow-teal-500/20 transition-all active:scale-95"
                onClick={addToCart}
                disabled={medicine.stock === 0}
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                {medicine.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-start gap-4 p-5 rounded-[32px] bg-zinc-50 border border-zinc-100">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-teal-600">
                   <Truck className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-zinc-900">Fast Delivery</p>
                   <p className="text-xs text-zinc-500">Ships in 24 hours</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-5 rounded-[32px] bg-zinc-50 border border-zinc-100">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                   <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-zinc-900">Verified Item</p>
                   <p className="text-xs text-zinc-500">100% Authentic</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-32">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-10 border-b border-zinc-100 mb-12">
            <TabsTrigger value="description" className="px-0 pb-6 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent text-xl font-bold text-zinc-400 data-[state=active]:text-zinc-900 transition-all">
              Description
            </TabsTrigger>
            <TabsTrigger value="info" className="px-0 pb-6 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent text-xl font-bold text-zinc-400 data-[state=active]:text-zinc-900 transition-all">
              Additional Info
            </TabsTrigger>
            <TabsTrigger value="reviews" className="px-0 pb-6 rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent text-xl font-bold text-zinc-400 data-[state=active]:text-zinc-900 transition-all flex items-center gap-2">
              Reviews <Badge className="bg-zinc-100 text-zinc-500 border-none font-bold text-xs">{reviews?.length || 0}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                   <div className="space-y-4">
                      <h3 className="text-2xl font-bold font-heading">Clinical Overview</h3>
                      <p className="text-zinc-600 leading-relaxed text-lg">
                         This medication is formulated using advanced pharmaceutical standards to provide effective relief for the specified conditions. It is manufactured in ISO-certified facilities and undergoes rigorous quality control.
                      </p>
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-bold font-heading">Key Benefits</h3>
                      <ul className="space-y-3">
                         {[
                           "Fast-acting formula with clinical efficacy",
                           "Long-lasting relief from symptoms",
                           "Safe for long-term use as per physician advice",
                           "Standardized manufacturing for consistency"
                         ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-zinc-600">
                              <div className="h-2 w-2 rounded-full bg-teal-500" />
                              {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
                <div className="p-10 rounded-[48px] bg-zinc-900 text-white space-y-6 relative overflow-hidden">
                   <h3 className="text-2xl font-bold font-heading">Safety Precautions</h3>
                   <div className="space-y-4 relative z-10 text-zinc-400">
                      <p>• Keep out of reach of children.</p>
                      <p>• Store in a cool, dry place away from direct sunlight.</p>
                      <p>• Do not exceed the recommended daily dose.</p>
                      <p>• Consult a doctor if symptoms persist after 3 days.</p>
                   </div>
                   <Clock className="absolute -bottom-8 -right-8 h-40 w-40 text-white/5 -rotate-12" />
                </div>
             </div>
          </TabsContent>

          <TabsContent value="info" className="mt-0">
             <div className="max-w-3xl rounded-[40px] border border-zinc-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <tbody className="divide-y divide-zinc-50">
                      {[
                        { label: "Category", value: medicine.category },
                        { label: "Manufacturer", value: medicine.manufacturer },
                        { label: "Tags", value: medicine.tags?.join(", ") || "N/A" },
                        { label: "Stock", value: `${medicine.stock} units` },
                        { label: "Medicine ID", value: medicine.id }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-50 transition-colors">
                           <td className="p-6 font-bold text-zinc-900 w-1/3">{row.label}</td>
                           <td className="p-6 text-zinc-600">{row.value}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Review Stats & Posting */}
                <div className="lg:col-span-4 space-y-8">
                   <div className="p-10 rounded-[48px] bg-zinc-50 border border-zinc-100 text-center space-y-4">
                      <h2 className="text-6xl font-extrabold text-zinc-900 font-heading">
                        {(reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) / (reviews?.length || 1)).toFixed(1)}
                      </h2>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`h-6 w-6 ${s <= (reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) / (reviews?.length || 1)) ? "fill-orange-400 text-orange-400" : "text-zinc-200"}`} />
                        ))}
                      </div>
                      <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Based on {reviews?.length || 0} Reviews</p>
                   </div>

                   {session ? (
                     <Card className="rounded-[32px] border-zinc-100 p-8 space-y-6">
                        <div className="space-y-2">
                           <h3 className="font-bold text-lg">Leave a Review</h3>
                           <p className="text-sm text-zinc-500">Share your experience with this medicine.</p>
                        </div>
                        <div className="flex gap-2">
                           {[1, 2, 3, 4, 5].map(s => (
                             <button key={s} onClick={() => setRating(s)}>
                               <Star className={`h-8 w-8 ${s <= rating ? "fill-orange-400 text-orange-400" : "text-zinc-200"}`} />
                             </button>
                           ))}
                        </div>
                        <textarea 
                          className="w-full min-h-[100px] p-4 rounded-2xl bg-zinc-50 border-none focus:ring-teal-500 text-sm"
                          placeholder="Your review here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button 
                          className="w-full bg-zinc-900 hover:bg-zinc-800 rounded-full font-bold h-12"
                          onClick={postReview}
                          disabled={isSubmittingReview}
                        >
                          {isSubmittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
                        </Button>
                     </Card>
                   ) : (
                     <div className="p-8 rounded-[32px] bg-zinc-50 border border-zinc-100 text-center space-y-4">
                        <MessageSquare className="h-10 w-10 text-zinc-300 mx-auto" />
                        <p className="text-sm font-medium text-zinc-500">Please login to write a review</p>
                        <Link href="/login" className="block">
                           <Button variant="outline" className="w-full rounded-full font-bold">Sign In</Button>
                        </Link>
                     </div>
                   )}
                </div>

                {/* Review List */}
                <div className="lg:col-span-8 space-y-8">
                   {!reviews || reviews.length === 0 ? (
                     <div className="py-20 text-center text-zinc-400">
                        <MessageSquare className="h-12 w-12 mx-auto opacity-10 mb-2" />
                        <p>No reviews yet. Be the first to review!</p>
                     </div>
                   ) : (
                     reviews.map((r: any) => (
                      <div key={r.id} className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-sm space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-extrabold text-lg uppercase">
                                  {r.user?.name?.charAt(0) || "U"}
                               </div>
                               <div>
                                  <p className="font-bold text-zinc-900">{r.user?.name || "Verified User"}</p>
                                  <p className="text-xs text-zinc-500">{new Date(r.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>
                            <div className="flex gap-1">
                               {[1, 2, 3, 4, 5].map(s => (
                                 <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-orange-400 text-orange-400" : "text-zinc-200"}`} />
                               ))}
                            </div>
                         </div>
                         <p className="text-zinc-600 leading-relaxed">
                            "{r.comment}"
                         </p>
                      </div>
                     ))
                   )}
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

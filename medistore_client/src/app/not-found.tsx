"use client";

import Link from "next/link";
import { Pill, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-white px-4">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Animated background glow */}
        <div className="absolute h-64 w-64 animate-pulse rounded-full bg-teal-100/50 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 rounded-[40px] bg-zinc-950 p-8 shadow-2xl shadow-zinc-200">
             <div className="relative">
                <Pill className="h-20 w-20 text-teal-500 animate-bounce" />
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white border-4 border-zinc-950">
                  !
                </div>
             </div>
          </div>
          <h1 className="text-9xl font-black tracking-tighter text-zinc-900 font-heading">
            4<span className="text-teal-600">0</span>4
          </h1>
        </div>
      </div>

      <div className="max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 font-heading">Prescription Missing!</h2>
          <p className="text-lg text-zinc-500">
            We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or never existed in our pharmacy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button className="h-14 rounded-2xl bg-zinc-950 px-8 font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95">
              <Home className="mr-2 h-5 w-5" />
              Back to Pharmacy
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="h-14 rounded-2xl border-zinc-200 px-8 font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
              <Search className="mr-2 h-5 w-5" />
              Browse Medicines
            </Button>
          </Link>
        </div>

        <div className="pt-8">
           <Link href="/support" className="text-sm font-bold text-teal-600 hover:underline flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Need help finding something? Contact Support
           </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Urgent red glow */}
        <div className="absolute h-64 w-64 animate-pulse rounded-full bg-red-100/50 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 rounded-[40px] bg-red-600 p-8 shadow-2xl shadow-red-200">
             <ShieldAlert className="h-20 w-20 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-zinc-900 font-heading text-center">
            Critical <span className="text-red-600">Error.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 font-heading">Something went wrong!</h2>
          <p className="text-zinc-500 font-medium">
            We encountered a medical emergency in our system. Don&apos;t worry, our specialists are on it.
          </p>
          
          <div className="mx-auto mt-4 max-w-xs rounded-2xl bg-white border border-zinc-200 p-4 shadow-sm">
             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Diagnosis</p>
             <p className="text-xs font-mono text-zinc-600 break-all bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                {error.message || "An unexpected error occurred during operation."}
             </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => reset()}
            className="h-14 rounded-2xl bg-zinc-950 px-8 font-bold text-white shadow-xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Try Resuscitation
          </Button>
          <Link href="/">
            <Button variant="outline" className="h-14 rounded-2xl border-zinc-200 bg-white px-8 font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-zinc-400 font-medium">
           Ref ID: {error.digest || Math.random().toString(36).substring(7).toUpperCase()}
        </p>
      </div>
    </div>
  );
}

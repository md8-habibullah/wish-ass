"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
               <div className="relative h-24 w-24 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <AlertTriangle className="h-12 w-12 text-primary animate-pulse" />
               </div>
            </div>
            
            <div className="space-y-2">
               <h1 className="text-4xl font-black text-white font-heading tracking-tight uppercase">System Failure.</h1>
               <p className="text-zinc-500 font-medium">An unexpected error has interrupted the clinical protocol.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left overflow-hidden">
               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Error Log</p>
               <p className="text-xs font-mono text-red-400/80 break-all leading-relaxed">
                  {this.state.error?.message || "Unknown execution error"}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button 
                onClick={() => window.location.reload()}
                className="flex-1 h-14 rounded-2xl bg-primary hover:bg-cyan-400 text-black font-black uppercase tracking-widest transition-all"
               >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset System
               </Button>
               <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-white/5 text-white font-black uppercase tracking-widest">
                     <Home className="mr-2 h-4 w-4" />
                     Return Home
                  </Button>
               </Link>
            </div>
            
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Status Code: CRITICAL_EXCEPTION_0x88</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

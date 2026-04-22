"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing. Please check your email link again.");
      return;
    }

    const verify = async () => {
      try {
        const { data, error } = await authClient.verifyEmail({
          query: { token },
        });

        if (error) {
          setStatus("error");
          setMessage(error.message || "Failed to verify email. The token may be expired.");
          toast.error("Verification failed");
        } else {
          setStatus("success");
          toast.success("Email verified successfully!");
          // Auto redirect after 3 seconds
          setTimeout(() => router.push("/login"), 3000);
        }
      } catch (err) {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
        console.error(err);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-[48px] bg-white p-12 shadow-2xl shadow-zinc-200 text-center space-y-8 border border-zinc-100">
        <div className="flex justify-center">
          {status === "loading" && (
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-teal-100 opacity-75" />
              <div className="relative h-20 w-20 rounded-full bg-teal-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
              </div>
            </div>
          )}
          {status === "success" && (
            <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center shadow-lg shadow-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
          )}
          {status === "error" && (
            <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center shadow-lg shadow-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
            {status === "loading" ? "Verifying Email..." : 
             status === "success" ? "Verification Successful!" : "Verification Failed"}
          </h1>
          <p className="text-zinc-500 font-medium leading-relaxed">
            {status === "loading" ? "Please wait while we validate your credentials with our secure server." :
             status === "success" ? "Your email has been confirmed. You now have full access to MediStore features." :
             message}
          </p>
        </div>

        <div className="pt-4">
          {status === "success" ? (
            <Link href="/login">
              <Button className="w-full h-14 rounded-2xl bg-zinc-950 font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 group">
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : status === "error" ? (
            <div className="space-y-4">
               <Link href="/register">
                 <Button className="w-full h-14 rounded-2xl bg-zinc-950 font-bold text-white shadow-xl transition-all">
                   Back to Registration
                 </Button>
               </Link>
               <Button variant="ghost" className="text-teal-600 font-bold hover:bg-teal-50 rounded-xl" onClick={() => router.refresh()}>
                 Try Again
               </Button>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-2 text-zinc-400">
           <Mail className="h-4 w-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">MediStore Secure Auth</span>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

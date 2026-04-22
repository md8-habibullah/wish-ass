"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await (authClient as any).forgetPassword({
      email,
      redirectTo: "/reset-password",
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } else {
      setIsSuccess(true);
      toast.success("Reset link sent to your email!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-zinc-50/50">
      <Card className="w-full max-w-md rounded-[40px] border-zinc-100 shadow-2xl overflow-hidden bg-white">
        <CardHeader className="p-10 text-center space-y-4">
          <div className="p-4 rounded-3xl bg-teal-50 text-teal-600 w-fit mx-auto mb-2">
            <Mail className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold font-heading">Forgot Password?</CardTitle>
          <CardDescription className="text-zinc-500 text-base">
            No worries, we'll send you reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-12 h-14 rounded-2xl bg-zinc-50 border-none focus-visible:ring-teal-500 shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-lg shadow-xl shadow-teal-500/20 transition-all active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 w-fit mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                 <h4 className="font-bold text-zinc-900">Check your email</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed">
                   We've sent a password reset link to <span className="font-bold text-zinc-900">{email}</span>.
                 </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-2xl font-bold border-zinc-100"
                onClick={() => setIsSuccess(false)}
              >
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-teal-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

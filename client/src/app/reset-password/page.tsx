"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-teal-600" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 3) {
      toast.error("Password must be at least 3 characters");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to reset password. Link may be expired.");
    } else {
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-zinc-50/50">
      <Card className="w-full max-w-md rounded-[40px] border-zinc-100 shadow-2xl overflow-hidden bg-white">
        <CardHeader className="p-10 text-center space-y-4">
          <div className="p-4 rounded-3xl bg-teal-50 text-teal-600 w-fit mx-auto mb-2">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold font-heading">Set New Password</CardTitle>
          <CardDescription className="text-zinc-500 text-base">
            Your new password must be different from previous passwords.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">New Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 rounded-2xl bg-zinc-50 border-none focus-visible:ring-teal-500 shadow-inner"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 rounded-2xl bg-zinc-50 border-none focus-visible:ring-teal-500 shadow-inner"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-lg shadow-xl shadow-teal-500/20 transition-all active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 w-fit mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                 <h4 className="font-bold text-zinc-900">Password reset!</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed">
                   Your password has been successfully reset. Redirecting you to the login page...
                 </p>
              </div>
              <Loader2 className="h-6 w-6 animate-spin text-teal-600 mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

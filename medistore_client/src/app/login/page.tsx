"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pill, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-teal-600" /></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error(error.message || "Login failed. Please check your credentials.");
        return;
      }

      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      console.error("Unexpected login error:", err);
      toast.error(err.message || "An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-zinc-50/50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <Card className="w-full max-w-lg rounded-[60px] border-zinc-100 shadow-2xl overflow-hidden bg-white relative z-10">
        <CardHeader className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-3xl bg-teal-600 p-4 text-white shadow-2xl shadow-teal-500/30 group hover:scale-110 transition-transform">
              <Pill className="h-10 w-10" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black tracking-tight text-zinc-900 font-heading">
              Welcome Back.
            </CardTitle>
            <CardDescription className="text-zinc-500 text-lg font-medium">
              Access your personalized pharmacy dashboard.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-12 pb-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
                        <Input 
                          placeholder="name@example.com" 
                          className="pl-12 h-14 rounded-2xl bg-zinc-50 border-none focus-visible:ring-2 focus-visible:ring-teal-500/20 shadow-inner text-base" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between ml-1">
                      <FormLabel className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Security Password</FormLabel>
                      <Link 
                        href="/forgot-password" 
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-12 h-14 rounded-2xl bg-zinc-50 border-none focus-visible:ring-2 focus-visible:ring-teal-500/20 shadow-inner text-base" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-zinc-950 hover:bg-zinc-800 text-white mt-4 h-16 rounded-3xl font-black text-xl shadow-2xl shadow-zinc-200 transition-all active:scale-95 group" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Sign In to Account
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-100" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-white px-6 text-zinc-400">Or Secure Login with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200 transition-all font-bold text-zinc-600" 
            type="button" 
            disabled={isLoading}
            onClick={() => signIn.social({ provider: "google" })}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google OAuth
          </Button>

          <p className="mt-10 text-center text-sm font-medium text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-teal-600 hover:text-teal-700 transition-colors">
              Create one for free
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

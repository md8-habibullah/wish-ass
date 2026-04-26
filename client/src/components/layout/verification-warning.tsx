"use client";

import { AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export function VerificationWarning() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!session || session.user.emailVerified) return null;

  const resendVerification = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: session.user.email,
        callbackURL: window.location.origin + "/verify-email",
      });
      if (error) throw error;
      toast.success("Verification email sent! Check your inbox.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary/10 border-b border-primary/20 py-3 px-4 animate-in fade-in slide-in-from-top-full duration-700 relative z-[60]">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-primary">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
             <AlertCircle className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold tracking-tight leading-none sm:leading-normal">
            Your email <span className="underline">{session.user.email}</span> is not verified. 
            Access to some features may be restricted.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto rounded-full border-primary/30 hover:bg-primary/20 h-9 px-6 text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          onClick={resendVerification}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Verify Now"}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

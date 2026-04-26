"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function GlobalClientLogic() {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      // Optional: toast.error("System Protocol Interrupted. Check logs.");
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return null;
}

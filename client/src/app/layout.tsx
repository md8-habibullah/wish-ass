import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { VerificationWarning } from "@/components/layout/verification-warning";
import { LiveChat } from "@/components/layout/live-chat";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { GlobalErrorBoundary } from "@/components/error-boundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediSync | Engineered by habibullah.dev",
  description: "A premium hospital procurement and resource management system, architected by Habibullah.",
  authors: [{ name: "Habibullah", url: "https://habibullah.dev" }],
  keywords: ["Medical Supply Chain", "Hospital Inventory", "DevOps", "Habibullah", "Healthcare IT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      // toast.error("Network or system failure. Check console for details.");
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans bg-background text-foreground`}>
        <QueryProvider>
          <GlobalErrorBoundary>
            <div className="relative flex min-h-screen flex-col">
              <VerificationWarning />
              <Navbar />
              <main className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <LiveChat />
            </div>
            <Toaster position="top-right" richColors closeButton />
          </GlobalErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}

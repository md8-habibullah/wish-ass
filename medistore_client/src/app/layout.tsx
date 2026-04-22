import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediStore | Your Trusted Online Pharmacy",
  description: "Shop for verified OTC medicines, supplements, and healthcare products at MediStore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans bg-zinc-50`}>
        <QueryProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px-300px)]">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}

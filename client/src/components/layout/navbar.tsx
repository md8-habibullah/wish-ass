"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRequisitionStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { 
  Zap,
  ClipboardList, 
  PlusSquare,
  User, 
  LogOut, 
  LayoutDashboard,
  Search,
  Menu,
  X,
  Bell,
  Heart,
  Shield,
  Monitor
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { data: session } = useSession();
  const items = useRequisitionStore((state) => state.items);
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.getElementById("navbar-search")?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = mounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  const navLinks = [
    { name: "Inventory", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="rounded-xl bg-primary p-2 text-primary-foreground shadow-[0_0_15px_-3px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white font-heading leading-none">
                Medi<span className="text-primary">Sync</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
                habibullah.dev
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-11 w-11 hover:bg-white/5 text-zinc-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-xs font-bold transition-all uppercase tracking-[0.15em] relative group/link ${
                    isActive 
                      ? "text-primary" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full group">
            <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input
              id="navbar-search"
              type="text"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl h-10 pl-11 pr-12 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white/10 transition-all placeholder:text-zinc-600"
            />
            <div className="absolute right-3 top-2 flex items-center gap-1">
               {searchQuery && (
                 <button 
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:bg-white/10 rounded-md text-zinc-500 hover:text-white"
                 >
                   <X className="h-3 w-3" />
                 </button>
               )}
               <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                 <span className="text-xs">⌘</span>K
               </kbd>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" className="relative rounded-xl h-11 w-11 p-0 hover:bg-white/5 text-zinc-400 hover:text-primary transition-colors">
              <ClipboardList className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-xl border border-white/5 p-0 hover:bg-white/5 overflow-hidden">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                    <AvatarFallback className="bg-zinc-900 text-zinc-400 font-bold">
                      {session.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 rounded-2xl p-2 bg-zinc-900 border-white/5 shadow-2xl" align="end">
                <DropdownMenuLabel className="p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-white">{session.user.name}</p>
                    <p className="text-xs text-zinc-500 font-medium">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuGroup className="p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="rounded-lg h-10 cursor-pointer hover:bg-white/5 text-zinc-300">
                      <User className="mr-3 h-4 w-4" />
                      <span className="font-bold text-xs">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {((session.user as any).role === "SELLER" || (session.user as any).role === "ADMIN") && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller/dashboard" className="rounded-lg h-10 cursor-pointer bg-primary/10 text-primary mt-1 hover:bg-primary/20">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        <span className="font-bold text-xs">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/5" />
                <div className="p-2">
                  <DropdownMenuItem 
                    className="rounded-lg h-10 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10"
                    onClick={() => signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/");
                          router.refresh();
                        }
                      }
                    })}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-bold text-xs">Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="text-zinc-400 font-bold hover:text-white hover:bg-white/5 rounded-xl h-11 px-6 text-xs uppercase tracking-widest">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl h-11 px-8 font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-3xl border-b border-white/5 py-8 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-black uppercase tracking-[0.2em] transition-all ${
                    isActive ? "text-primary" : "text-zinc-500 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="h-px bg-white/5 my-4" />
            <div className="flex flex-col gap-4">
              {!session ? (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-white/5 font-bold">
                      LOG IN
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl bg-primary font-bold">
                      GET STARTED
                    </Button>
                  </Link>
                </>
              ) : (
                 <Link href="/seller/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl bg-primary/10 text-primary border-primary/20 font-bold">
                       CONTROL CENTER
                    </Button>
                 </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

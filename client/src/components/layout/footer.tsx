import Link from "next/link";
import { Pill, Github, Linkedin, Globe, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="container px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-teal-600 p-1.5 text-white">
                <Pill className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MediStore
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Your trusted online pharmacy for OTC medicines. We provide verified, high-quality healthcare products delivered right to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="https://github.com/md8-habibullah" target="_blank" className="hover:text-teal-500 transition-colors"><Github className="h-5 w-5" /></Link>
              <Link href="https://habibullah.dev" target="_blank" className="hover:text-teal-500 transition-colors"><Globe className="h-5 w-5" /></Link>
              <Link href="https://linkedin.com/in/md8-habibullah" target="_blank" className="hover:text-teal-500 transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-teal-500 transition-colors">All Medicines</Link></li>
              <li><Link href="/categories" className="hover:text-teal-500 transition-colors">Categories</Link></li>
              <li><Link href="/featured" className="hover:text-teal-500 transition-colors">Featured Items</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-teal-500 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/orders" className="hover:text-teal-500 transition-colors">Track Order</Link></li>
              <li><Link href="/shipping" className="hover:text-teal-500 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-teal-500 transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-teal-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-teal-500" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-teal-500" />
                <span>medi@habibullah.dev</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-teal-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} <Link href="https://habibullah.dev" className="hover:text-white transition-colors">habibullah.dev</Link>. All rights reserved. | OTC Medicines Only</p>
        </div>
      </div>
    </footer>
  );
}

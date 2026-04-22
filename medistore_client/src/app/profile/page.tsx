"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { 
  User, 
  Mail, 
  Shield, 
  ShoppingBag, 
  LogOut, 
  Settings, 
  MapPin, 
  ChevronRight,
  Loader2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";

export default function ProfilePage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login");
    }
    if (session?.user.name) {
      setName(session.user.name);
    }
  }, [session, sessionLoading, router]);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      await axios.patch(`${API_BASE_URL}/users/updateProfile`, { name }, { withCredentials: true });
      toast.success("Profile updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="container px-4 py-12 md:px-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="rounded-[32px] border-zinc-100 shadow-xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-teal-500 to-teal-700" />
            <CardContent className="p-8 -mt-12 text-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg mx-auto">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback className="bg-teal-50 text-teal-700 text-2xl font-bold">
                  {session.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 font-heading">{session.user.name}</h2>
                <p className="text-sm text-zinc-500">{session.user.email}</p>
              </div>
              <Badge className={`rounded-full px-4 py-1 font-bold text-[10px] ${
                (session.user as any).role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                (session.user as any).role === "SELLER" ? "bg-teal-100 text-teal-700" :
                "bg-blue-100 text-blue-700"
              } border-none`}>
                {(session.user as any).role}
              </Badge>
            </CardContent>
          </Card>

          <nav className="space-y-2">
             <Link href="/orders" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-100 hover:border-teal-200 transition-all group">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-zinc-50 text-zinc-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                      <ShoppingBag className="h-5 w-5" />
                   </div>
                   <span className="font-bold text-zinc-700 group-hover:text-zinc-900 transition-all">Order History</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-300" />
             </Link>
             <Link href="/profile" className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100 group">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-teal-600 text-white shadow-lg shadow-teal-100">
                      <Settings className="h-5 w-5" />
                   </div>
                   <span className="font-bold text-teal-900">Account Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-teal-600" />
             </Link>
             <button 
              onClick={() => signOut()}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-zinc-100 hover:bg-red-50 hover:border-red-100 transition-all group"
             >
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-zinc-50 text-zinc-400 group-hover:bg-red-100 group-hover:text-red-600 transition-all">
                      <LogOut className="h-5 w-5" />
                   </div>
                   <span className="font-bold text-zinc-700 group-hover:text-red-700 transition-all">Sign Out</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-red-300" />
             </button>
          </nav>
        </div>

        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="rounded-[32px] border-zinc-100 shadow-sm overflow-hidden">
             <CardHeader className="p-8 border-b border-zinc-50 flex justify-between items-center flex-row">
               <CardTitle className="text-xl font-heading">Personal Information</CardTitle>
               <Button 
                variant="ghost" 
                size="sm" 
                className="text-teal-600 font-bold hover:bg-teal-50"
                onClick={() => setIsEditing(!isEditing)}
               >
                 {isEditing ? "Cancel" : "Edit Profile"}
               </Button>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</p>
                      {isEditing ? (
                        <div className="flex gap-2">
                           <input 
                            className="h-10 px-3 rounded-lg border border-zinc-200 focus:ring-teal-500 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                           />
                           <Button 
                            className="bg-teal-600 hover:bg-teal-700 h-10 px-4 rounded-lg text-xs"
                            onClick={handleUpdateProfile}
                            disabled={isUpdating}
                           >
                             {isUpdating ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                           </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-900 font-bold">
                           <User className="h-4 w-4 text-teal-600" />
                           {session.user.name}
                        </div>
                      )}
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</p>
                      <div className="flex items-center gap-2 text-zinc-900 font-bold">
                         <Mail className="h-4 w-4 text-teal-600" />
                         {session.user.email}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Joined On</p>
                      <div className="flex items-center gap-2 text-zinc-900 font-bold">
                         <Calendar className="h-4 w-4 text-teal-600" />
                         {new Date(session.user.createdAt).toLocaleDateString()}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Account Role</p>
                      <div className="flex items-center gap-2 text-zinc-900 font-bold">
                         <Shield className="h-4 w-4 text-teal-600" />
                         {(session.user as any).role}
                      </div>
                   </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h3 className="font-bold text-zinc-900">Account Security</h3>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-zinc-900">Email Verification</p>
                        <p className="text-xs text-zinc-500">Your email is verified and secure.</p>
                     </div>
                     <Badge className="bg-green-100 text-green-700 border-none font-bold text-[10px]">VERIFIED</Badge>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-zinc-200 font-bold">
                     Change Password
                  </Button>
                </div>
             </CardContent>
           </Card>

           <Card className="rounded-[32px] border-zinc-100 shadow-sm overflow-hidden">
              <CardHeader className="p-8 border-b border-zinc-50">
                 <CardTitle className="text-xl font-heading">Default Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center space-y-4">
                 <div className="p-6 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200">
                    <MapPin className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-zinc-500">No default address set.</p>
                 </div>
                 <Button className="bg-teal-600 hover:bg-teal-700 h-12 px-8 rounded-2xl font-bold shadow-lg shadow-teal-100">
                    Add New Address
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

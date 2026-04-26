"use client";

import { Bell, Info, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "urgent";
  createdAt: string;
}

export function NotificationBell() {
  const [hasNew, setHasNew] = useState(false);
  const [lastViewed, setLastViewed] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("lastViewedAnnouncement");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setLastViewed(parseInt(saved));
  }, []);

  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/announcements`);
      return res.data.data as Announcement[];
    },
    refetchInterval: 60000, // Refetch every minute
  });

  useEffect(() => {
    if (announcements && announcements.length > 0) {
      const newest = new Date(announcements[0].createdAt).getTime();
      if (newest > lastViewed) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasNew(true);
      }
    }
  }, [announcements, lastViewed]);

  const handleOpen = () => {
    setHasNew(false);
    const newest = announcements?.[0] ? new Date(announcements[0].createdAt).getTime() : Date.now();
    setLastViewed(newest);
    localStorage.setItem("lastViewedAnnouncement", newest.toString());
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case "urgent": return <Zap className="h-4 w-4 text-primary animate-pulse" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && handleOpen()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-white/5 text-zinc-400 transition-all">
          <Bell className={`h-5 w-5 ${hasNew ? "animate-tada" : ""}`} />
          {hasNew && (
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-zinc-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 rounded-3xl bg-zinc-900 border-white/5 p-2 shadow-2xl z-[101]" align="end">
        <DropdownMenuLabel className="p-4 flex items-center justify-between">
           <span className="font-black text-xs uppercase tracking-widest text-white">System Notices</span>
           <Badge variant="outline" className="bg-white/5 border-white/5 text-[10px] text-zinc-500 font-bold">
              {announcements?.length || 0} Total
           </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
          {isLoading ? (
            <div className="p-8 text-center text-zinc-600 text-xs font-bold uppercase animate-pulse">Scanning Network...</div>
          ) : !announcements || announcements.length === 0 ? (
            <div className="p-12 text-center space-y-4">
               <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-zinc-700">
                  <CheckCircle2 className="h-6 w-6" />
               </div>
               <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">All Systems Clear</p>
            </div>
          ) : (
            announcements.map((item) => (
              <DropdownMenuItem key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-start gap-2 cursor-default focus:bg-white/10 transition-all mb-2">
                <div className="flex items-center gap-2 w-full">
                  {getIcon(item.type)}
                  <span className="font-bold text-xs text-white uppercase tracking-tight truncate">{item.title}</span>
                  <span className="ml-auto text-[8px] font-bold text-zinc-600 uppercase whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                  {item.content}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator className="bg-white/5" />
        <div className="p-2">
           <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white h-10 rounded-xl">
              Archive Log
           </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

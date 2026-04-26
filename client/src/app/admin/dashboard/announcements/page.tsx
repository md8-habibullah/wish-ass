"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";
import { 
  Bell, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Info, 
  Zap, 
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "urgent";
  active: boolean;
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<"info" | "warning" | "urgent">("info");

  const { data: announcements, isLoading } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/announcements`);
      return res.data.data as Announcement[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newAnn: { title: string; content: string; type: string }) => {
      return axios.post(`${API_BASE_URL}/announcements`, newAnn, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setNewTitle("");
      setNewContent("");
      toast.success("Announcement broadcasted!");
    },
    onError: () => toast.error("Failed to broadcast announcement")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`${API_BASE_URL}/announcements/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted");
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    createMutation.mutate({ title: newTitle, content: newContent, type: newType });
  };

  return (
    <div className="container px-4 py-12 md:px-8 max-w-6xl space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white font-heading tracking-tighter uppercase">Broadcast Center</h1>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Command & Control notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Create Form */}
        <div className="lg:col-span-5">
           <Card className="rounded-[40px] border-white/5 bg-card/50 backdrop-blur-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5 bg-primary/5">
                 <CardTitle className="text-xl font-bold font-heading flex items-center gap-3">
                    <Plus className="h-5 w-5 text-primary" />
                    New Announcement
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Notice Title</label>
                       <Input 
                        placeholder="Maintenance Alert, System Update..." 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="h-12 rounded-2xl bg-zinc-950/50 border-white/5 focus:ring-primary/20"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Broadcast Content</label>
                       <textarea 
                        className="w-full min-h-[120px] rounded-2xl bg-zinc-950/50 border-white/5 p-4 text-sm text-white focus:ring-1 focus:ring-primary/20 outline-none"
                        placeholder="Detail the update or warning here..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Priority Level</label>
                       <Select value={newType} onValueChange={(v: "info" | "warning" | "urgent") => setNewType(v)}>
                          <SelectTrigger className="h-12 rounded-2xl bg-zinc-950/50 border-white/5">
                             <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl bg-zinc-900 border-white/5">
                             <SelectItem value="info" className="rounded-xl">Information</SelectItem>
                             <SelectItem value="warning" className="rounded-xl">Warning</SelectItem>
                             <SelectItem value="urgent" className="rounded-xl text-primary font-bold">Urgent Alert</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-cyan-400 text-black font-black uppercase tracking-widest transition-all"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Broadcast Notification"}
                    </Button>
                 </form>
              </CardContent>
           </Card>
        </div>

        {/* List */}
        <div className="lg:col-span-7 space-y-6">
           <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 ml-2">Active Broadcasts</h3>
           {isLoading ? (
             <div className="flex items-center justify-center p-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
             </div>
           ) : announcements?.length === 0 ? (
             <div className="p-20 rounded-[40px] border border-dashed border-white/5 text-center space-y-4">
                <Bell className="h-12 w-12 text-zinc-800 mx-auto" />
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No active notices</p>
             </div>
           ) : (
             announcements?.map((ann) => (
               <Card key={ann.id} className="group rounded-[32px] border-white/5 bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
                  <div className="p-6 flex items-start gap-6">
                     <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        ann.type === 'urgent' ? 'bg-primary/10 text-primary' : 
                        ann.type === 'warning' ? 'bg-orange-500/10 text-orange-500' : 
                        'bg-blue-500/10 text-blue-500'
                     }`}>
                        {ann.type === 'urgent' ? <Zap className="h-6 w-6" /> : 
                         ann.type === 'warning' ? <AlertTriangle className="h-6 w-6" /> : 
                         <Info className="h-6 w-6" />}
                     </div>
                     <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                           <h4 className="font-bold text-white uppercase tracking-tight">{ann.title}</h4>
                           <span className="text-[10px] font-bold text-zinc-600 uppercase">{new Date(ann.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">{ann.content}</p>
                     </div>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
                       onClick={() => deleteMutation.mutate(ann.id)}
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </div>
               </Card>
             ))
           )}
        </div>
      </div>
    </div>
  );
}

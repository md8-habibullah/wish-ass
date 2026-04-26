"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth-client";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

export function LiveChat() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "agent",
      content: "Hello! Welcome to MediSync Clinical Support. How can we assist you with your procurement today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock agent response
    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: `Understood${session?.user.name ? `, ${session.user.name}` : ""}. I'm connecting you with a medical logistics officer. Please hold for a moment while we verify your department credentials.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-[100]"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-primary hover:bg-cyan-400 text-black shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)] group transition-all"
            >
              <MessageCircle className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100vw-32px)] md:w-[400px] bg-zinc-900 border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${
              isMinimized ? "h-[80px]" : "h-[600px] max-h-[80vh]"
            }`}
          >
            {/* Header */}
            <div className="bg-primary p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-black">
                 <div className="h-10 w-10 rounded-2xl bg-black/10 flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                 </div>
                 <div>
                    <p className="font-black text-sm tracking-tight leading-none uppercase">Support Node</p>
                    <p className="text-[10px] font-bold opacity-70">Always Online</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-black/10 text-black" onClick={() => setIsMinimized(!isMinimized)}>
                    <Minus className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-black/10 text-black" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                 </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
                >
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-primary text-black rounded-br-none" 
                          : "bg-white/5 text-zinc-300 rounded-bl-none border border-white/5"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 text-zinc-500 p-4 rounded-3xl rounded-bl-none border border-white/5 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-widest">Agent Typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-zinc-950 border-t border-white/5">
                  <div className="relative flex items-center gap-2 bg-white/5 rounded-2xl p-2 pr-4 border border-white/5 group focus-within:border-primary/50 transition-all">
                    <input 
                      type="text" 
                      placeholder="Ask clinical support..."
                      className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm font-medium h-10 px-4"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button 
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="h-10 w-10 rounded-xl bg-primary hover:bg-cyan-400 text-black p-0 shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[9px] text-zinc-600 mt-3 text-center uppercase font-bold tracking-widest">Powered by MediSync AI & Engineering</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

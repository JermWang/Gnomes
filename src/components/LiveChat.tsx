"use client";
import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  { user: "truthseeker42", text: "bro zoom in" },
  { user: "gnome_watcher", text: "that's not a cat" },
  { user: "subterranean_dave", text: "they're in my backyard" },
  { user: "anon_7741", text: "$GNOMES" },
  { user: "red_circle_king", text: "WHY IS NO ONE TALKING ABOUT THIS" },
  { user: "meadow_lurker", text: "i saw one near the shed last tuesday" },
  { user: "anon_3382", text: "enhance the left side" },
  { user: "deep_state_gnome", text: "the orb knows" },
  { user: "truthseeker42", text: "LOOK CLOSER" },
  { user: "gnome_watcher", text: "they move in groups of 7" },
  { user: "anon_7741", text: "my ring cam caught something at 3am" },
  { user: "subterranean_dave", text: "STAY AWAKE" },
  { user: "red_circle_king", text: "it's always the garden" },
  { user: "meadow_lurker", text: "the purple orbs are a signal" },
  { user: "anon_3382", text: "$GNOMES TO THE MOON" },
  { user: "deep_state_gnome", text: "they sealed the files for a reason" },
  { user: "truthseeker42", text: "THIS IS NOT A DRILL" },
  { user: "gnome_watcher", text: "check sector 4" },
];

interface ChatMsg {
  id: number;
  user: string;
  text: string;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [msgIndex, setMsgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      const msg = MESSAGES[msgIndex % MESSAGES.length];
      const newMsg: ChatMsg = { id: idRef.current++, ...msg };
      setMessages((prev) => [...prev.slice(-30), newMsg]);
      setMsgIndex((i) => i + 1);
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [open, msgIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 z-40" data-no-circle>
      {/* Toggle */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-gnome-dark border border-gnome-yellow/50 text-gnome-yellow font-mono text-xs px-3 py-2 hover:bg-gnome-yellow hover:text-gnome-dark transition-colors animate-blink"
        >
          💬 LIVE THREAD ({MESSAGES.length})
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="w-72 bg-[#1a1a2e] border border-gnome-yellow/30 shadow-2xl flex flex-col" style={{ maxHeight: "320px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#0f0f1a] border-b border-gnome-yellow/20">
            <span className="font-mono text-[10px] text-gnome-yellow tracking-widest">
              ● LIVE THREAD — {messages.length} msgs
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gnome-red text-sm hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-1" style={{ maxHeight: "240px" }}>
            {messages.length === 0 && (
              <p className="font-mono text-[10px] text-gray-600 text-center py-4">
                waiting for signals...
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="chat-bubble">
                <span className="font-mono text-[10px] text-gnome-purple-light">{msg.user}: </span>
                <span className="font-mono text-[10px] text-gray-300">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Fake input */}
          <div className="px-2 py-2 border-t border-gnome-yellow/10">
            <div className="font-mono text-[9px] text-gray-600 bg-[#0a0a14] px-2 py-1 rounded cursor-not-allowed">
              // observers only — no posting //
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

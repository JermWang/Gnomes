"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "";

export default function Hero() {
  const [flash, setFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = TOKEN_ADDRESS;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden scanlines"
      style={{ background: "url('/we found them.png') center center / cover no-repeat" }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Camera flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* ── TOP TICKER ── */}
      <div className="absolute top-0 left-0 right-0 bg-gnome-red overflow-hidden py-1 z-20">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-block mx-6 font-impact text-sm tracking-widest text-white">
              ★ $GNOMES ★ SUBTERRANEAN ACTIVITY DETECTED ★ THEY WERE NEVER MYTHS ★ LOOK CLOSER ★ STAY AWAKE ★
            </span>
          ))}
        </div>
      </div>

      {/* BREAKING tag */}
      <motion.div
        className="absolute top-7 left-4 bg-gnome-red text-white font-impact text-xs px-2 py-1 z-20 animate-blink"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        ● BREAKING NEWS
      </motion.div>

      {/* ── SCATTERED GIFS ── */}

      {/* wizardgnome — LEFT hero mascot */}
      <div className="absolute left-0 md:left-10 bottom-14 z-10 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/wizardgnome.gif" alt="Wizard Gnome" width={150}
          className="opacity-95 drop-shadow-[0_0_18px_rgba(123,60,255,0.9)]" />
        <p className="font-comic text-gnome-yellow text-[10px] text-center mt-1 animate-blink">HE KNOWS.</p>
      </div>

      {/* pixel gnome strip — right side */}
      <div className="absolute right-4 md:right-14 bottom-16 z-10 pointer-events-none hidden sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/FEMEZBBMFPRTHYZSLFRGF56BF2QYMI44.gif" alt="Classic Gnome" width={54}
          className="pixel-gif opacity-85" />
        <p className="font-mono text-[8px] text-gnome-red text-center mt-1">UNIT 7</p>
      </div>


      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mb-1 mt-10" style={{ transform: "rotate(0.8deg)" }}>
        <span className="font-mono text-[9px] text-gnome-yellow/50 tracking-[0.4em]">
          {"//"} DECLASSIFIED TRANSMISSION {"//"}
        </span>
      </div>

      <motion.h1
        className="font-impact text-5xl md:text-8xl lg:text-[7rem] text-white text-center cursor-pointer select-none z-10 relative px-4 leading-none"
        style={{ transform: "rotate(-2deg)", textShadow: "4px 4px 0px #ff2b2b, 8px 8px 0px rgba(123,60,255,0.25)" }}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        THEY WERE NEVER <span className="text-gnome-red">MYTHS.</span>
      </motion.h1>

      <motion.p
        className="font-mono text-gnome-yellow text-base md:text-2xl mt-3 text-center z-10 tracking-wider px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        WHY IS NO ONE TALKING ABOUT THIS?
      </motion.p>

      <motion.p
        className="font-impact text-gnome-purple-light text-3xl md:text-5xl mt-5 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        $GNOMES
      </motion.p>

      {/* Contract address + Twitter row */}
      <motion.div
        className="mt-6 z-10 flex flex-col sm:flex-row items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        {/* Copy Contract Address — 3D retro button */}
        {TOKEN_ADDRESS && (
          <motion.button
            onClick={copyAddress}
            className="flex items-center gap-2 font-mono text-xs md:text-sm px-5 py-2.5 text-white rounded-sm"
            style={{
              background: "linear-gradient(180deg, #9b4dff 0%, #6a1fcf 50%, #5010a8 100%)",
              boxShadow: "0 4px 0 #3a0980, 0 6px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
              border: "2px solid #7b3cff",
              textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
            }}
            whileHover={{ y: -1 }}
            whileTap={{ y: 3, boxShadow: "0 1px 0 #3a0980, 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)" }}
          >
            <span className="truncate max-w-[160px] md:max-w-[220px]">
              {TOKEN_ADDRESS}
            </span>
            <span className={`shrink-0 font-bold ${copied ? "text-green-300" : "text-yellow-300"}`}>
              {copied ? "COPIED ✓" : "📋 COPY"}
            </span>
          </motion.button>
        )}

        {/* Twitter/X — 3D retro button */}
        <motion.a
          href="https://x.com/GnomesOnSOL"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs md:text-sm px-5 py-2.5 text-white rounded-sm no-underline"
          style={{
            background: "linear-gradient(180deg, #444 0%, #222 50%, #111 100%)",
            boxShadow: "0 4px 0 #000, 0 6px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            border: "2px solid #555",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
          }}
          whileHover={{ y: -1 }}
          whileTap={{ y: 3, boxShadow: "0 1px 0 #000, 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>@GnomesOnSOL</span>
        </motion.a>
      </motion.div>

      <motion.a
        href="#evidence"
        className="mt-5 z-10 font-mono px-6 py-3 text-white text-base md:text-lg rounded-sm no-underline"
        style={{
          background: "linear-gradient(180deg, #ff4444 0%, #cc1111 50%, #aa0000 100%)",
          boxShadow: "0 4px 0 #660000, 0 6px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          border: "2px solid #ff2b2b",
          textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ y: -1 }}
        whileTap={{ y: 3, boxShadow: "0 1px 0 #660000, 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}
      >
        START INVESTIGATING ↓
      </motion.a>

      {/* Stamps */}
      <div className="absolute top-7 right-4 stamp text-[10px] z-20 hidden sm:block">
        CLASSIFIED
      </div>
      <div className="absolute bottom-12 left-4 font-mono text-[10px] text-gnome-bg/30 z-10">
        CAM_04 // MOTION TRIGGERED
      </div>
    </section>
  );
}

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

      {/* Copy contract address */}
      {TOKEN_ADDRESS && (
        <motion.button
          onClick={copyAddress}
          className="mt-6 z-10 flex items-center gap-2 bg-gnome-purple/20 border border-gnome-purple/50 text-gnome-purple-light font-mono text-xs md:text-sm px-4 py-2 hover:bg-gnome-purple/40 transition-all duration-200 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="truncate max-w-[180px] md:max-w-xs opacity-70 group-hover:opacity-100 transition-opacity">
            {TOKEN_ADDRESS}
          </span>
          <span className={`shrink-0 text-xs font-bold transition-colors ${
            copied ? "text-green-400" : "text-gnome-yellow"
          }`}>
            {copied ? "COPIED ✓" : "COPY"}
          </span>
        </motion.button>
      )}

      <motion.a
        href="#evidence"
        className="mt-4 z-10 border-2 border-gnome-red text-gnome-red font-mono px-6 py-3 hover:bg-gnome-red hover:text-white transition-colors duration-200 text-base md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
      >
        START INVESTIGATING ↓
      </motion.a>

      {/* Twitter/X Link */}
      <motion.a
        href="https://x.com/GnomesOnSOL"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-7 left-4 z-20 flex items-center gap-2 bg-gnome-dark/80 border border-gnome-purple/50 px-3 py-2 hover:bg-gnome-purple/20 transition-all group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <svg className="w-4 h-4 fill-gnome-purple-light group-hover:fill-gnome-yellow transition-colors" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="font-mono text-xs text-gnome-purple-light group-hover:text-gnome-yellow transition-colors">@GnomesOnSOL</span>
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

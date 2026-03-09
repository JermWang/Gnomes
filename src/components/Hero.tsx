"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden paper-texture parchment-page"
    >
      {/* Aged paper vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(122, 90, 68, 0.15), inset 0 0 60px rgba(0,0,0,0.05)",
        }}
      />

      {/* Decorative corner ornaments */}
      <svg className="absolute top-6 left-6 w-16 h-16 text-faded-brown/30" viewBox="0 0 100 100">
        <path d="M0,0 Q50,10 50,50 Q10,50 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
        <path d="M15,5 Q25,15 20,25" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute top-6 right-6 w-16 h-16 text-faded-brown/30" viewBox="0 0 100 100" style={{ transform: "scaleX(-1)" }}>
        <path d="M0,0 Q50,10 50,50 Q10,50 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
        <path d="M15,5 Q25,15 20,25" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-6 left-6 w-16 h-16 text-faded-brown/30" viewBox="0 0 100 100" style={{ transform: "scaleY(-1)" }}>
        <path d="M0,0 Q50,10 50,50 Q10,50 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-6 right-6 w-16 h-16 text-faded-brown/30" viewBox="0 0 100 100" style={{ transform: "scale(-1,-1)" }}>
        <path d="M0,0 Q50,10 50,50 Q10,50 0,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>

      {/* Small decorative mushroom sketches */}
      <svg className="absolute top-24 right-16 w-12 h-14 text-moss/20 hidden md:block" viewBox="0 0 50 60">
        <ellipse cx="25" cy="20" rx="18" ry="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="34" x2="25" y2="55" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="16" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="30" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="22" r="2.5" fill="currentColor" opacity="0.3" />
      </svg>

      <svg className="absolute bottom-32 left-12 w-10 h-10 text-moss/20 hidden md:block" viewBox="0 0 40 40">
        <path d="M10,35 C10,20 5,15 20,5 C35,15 30,20 30,35" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="20" y1="15" x2="20" y2="35" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      {/* Clover sketch */}
      <svg className="absolute top-40 left-20 w-8 h-8 text-forest/15 hidden lg:block" viewBox="0 0 40 40">
        <circle cx="14" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="26" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="20" x2="20" y2="38" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Main content - book spread layout */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

        {/* LEFT — Large gnome illustration plate */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="plate-frame max-w-md mx-auto" style={{ transform: "rotate(-1.5deg)" }}>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/gnome on shroom.png"
                alt="Field illustration — Gnome specimen observed atop fungal growth"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority
              />
            </div>
            <p className="font-handwritten text-center text-faded-brown mt-2 text-sm">
              Plate I — Specimen observed atop Amanita muscaria, autumn 1893
            </p>
          </div>

          {/* Handwritten annotation arrow */}
          <div className="absolute -bottom-4 right-4 md:right-0 font-handwritten text-rust text-lg" style={{ transform: "rotate(5deg)" }}>
            <svg className="inline-block w-8 h-8 mr-1" viewBox="0 0 40 40">
              <path d="M5,35 C15,20 25,15 35,8" fill="none" stroke="#9b4b3f" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M28,5 L35,8 L30,14" fill="none" stroke="#9b4b3f" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            note the red cap
          </div>
        </motion.div>

        {/* RIGHT — Journal text description */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Small decorative header line */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-faded-brown/30" />
            <span className="font-handwritten text-faded-brown text-sm tracking-wider">Vol. XII — Spring Edition</span>
            <div className="h-px flex-1 bg-faded-brown/30" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1] tracking-tight">
            The Hidden World{" "}
            <span className="italic text-forest">of Gnomes</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-ink/80 leading-relaxed">
            Field observations collected from quiet gardens, meadows, and forests across the European countryside.
          </p>

          <div className="field-note" style={{ transform: "rotate(-0.5deg)" }}>
            &ldquo;They move among the roots and stones with a purpose we are only beginning to understand.&rdquo;
            <span className="block text-sm mt-1 text-faded-brown">— E. Thornberry, Field Naturalist, 1897</span>
          </div>

          {/* Wax seal + CTA row */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a href="#observations" className="btn-wood no-underline">
              Begin Reading ↓
            </a>
            <div className="wax-seal" style={{ transform: "rotate(-8deg)" }}>
              G.S.
            </div>
          </div>

          {/* Social links — vintage label style */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {TOKEN_ADDRESS && (
              <button
                onClick={copyAddress}
                className="btn-tag text-xs flex items-center gap-2"
              >
                <span className="truncate max-w-[140px] sm:max-w-[180px]">{TOKEN_ADDRESS}</span>
                <span className="font-handwritten text-rust">
                  {copied ? "✓ copied" : "copy"}
                </span>
              </button>
            )}
            <a
              href="https://x.com/GnomesOnSOL"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tag text-xs no-underline flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 fill-ink" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @GnomesOnSOL
            </a>
            <a
              href="https://t.me/GnomesPortal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tag text-xs no-underline flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 fill-ink" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom annotation arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <p className="font-handwritten text-faded-brown text-sm mb-2">scroll to continue reading</p>
        <svg className="w-6 h-10 text-faded-brown/50" viewBox="0 0 24 40">
          <path d="M12,2 L12,32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M6,26 L12,34 L18,26" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

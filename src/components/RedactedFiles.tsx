"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RedactedFiles() {

  return (
    <section id="redacted" className="relative py-20 px-4 md:px-8 bg-[#e8e4d8] overflow-hidden">
      {/* Scattered FBI files background pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        {/* Repeated background file pattern */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white border border-gray-300 shadow-md"
            style={{
              width: `${180 + (i % 3) * 40}px`,
              height: `${240 + (i % 4) * 50}px`,
              left: `${(i % 4) * 25 + (i % 2) * 5}%`,
              top: `${Math.floor(i / 4) * 30 + (i % 3) * 8}%`,
              transform: `rotate(${-8 + (i % 5) * 4}deg)`,
            }}
          >
            {/* Fake redacted lines */}
            <div className="p-4 space-y-2">
              <div className="h-2 bg-black w-3/4" />
              <div className="h-2 bg-black w-full" />
              <div className="h-2 bg-black w-5/6" />
              <div className="h-2 bg-gray-300 w-2/3 mt-4" />
              <div className="h-2 bg-black w-full" />
            </div>
          </div>
        ))}
      </div>

      <motion.h2
        className="font-impact text-4xl md:text-6xl text-center text-gnome-dark mb-12 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        REDACTED <span className="text-gnome-red">FILES</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto relative z-10 flex gap-4 items-start">
        {/* 'me parece que' gnome peeking from the left */}
        <div className="hidden lg:flex flex-col items-center pt-16 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gifs/B7M4XUXTDSE477LEQNOBFY2MOYLXO2E5.gif" alt="Thinking gnome" width={100}
            className="pixel-gif opacity-85" />
          <p className="font-comic text-[9px] text-gnome-dark/60 text-center mt-1 max-w-[90px]">
            &ldquo;it seems to me that...&rdquo;
          </p>
        </div>
        <div className="flex-1">
        {/* Document container - enhanced to stand out */}
        <motion.div
          className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden border-4 border-gnome-red/20"
          style={{ transform: "rotate(-0.5deg)" }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.02, rotate: 0 }}
        >
          {/* The actual redacted document image */}
          <div className="relative w-full">
            <Image
              src="/redacted_files.png"
              alt="Classified redacted document"
              width={900}
              height={1200}
              className="w-full h-auto block"
              style={{ filter: "contrast(1.08) brightness(0.98)" }}
              priority
            />

            {/* CONFIDENTIAL stamp */}
            <div className="absolute top-6 right-6 stamp text-xl z-20 animate-pulse">
              CONFIDENTIAL
            </div>

            {/* TOP SECRET stamp */}
            <div className="absolute top-6 left-6 stamp text-sm z-20" style={{ color: "#ff2b2b", transform: "rotate(-12deg)" }}>
              TOP SECRET
            </div>

            {/* File markings bar at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 flex justify-between px-4 py-2 text-[10px] font-mono text-gray-500 border-t-2 border-gnome-red/30">
              <span>PAGE 1 OF ██</span>
              <span>FILE NO. GN-████-7742</span>
              <span className="text-gnome-red">CLASSIFIED</span>
            </div>
          </div>
        </motion.div>
        </div> {/* end flex-1 */}
      </div>
    </section>
  );
}

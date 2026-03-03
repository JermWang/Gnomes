"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


export default function RedactedFiles() {
  const [redactionLevel, setRedactionLevel] = useState(70);
  const [stampShake, setStampShake] = useState(false);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedactionLevel(Number(e.target.value));
    setStampShake(true);
    setTimeout(() => setStampShake(false), 500);
  };

  return (
    <section id="redacted" className="relative py-20 px-4 md:px-8 bg-gnome-bg overflow-hidden">
      {/* Scan texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23000'/%3E%3Crect width='1' height='1' fill='%23333'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />

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
        {/* Document container */}
        <motion.div
          className="bg-white shadow-2xl relative overflow-hidden"
          style={{ transform: "rotate(-0.5deg)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* The actual redacted document image */}
          <div className="relative w-full">
            <Image
              src="/redacted_files.png"
              alt="Classified redacted document"
              width={900}
              height={1200}
              className="w-full h-auto block"
              style={{ filter: "contrast(1.05) brightness(0.97)" }}
              priority
            />

            {/* CONFIDENTIAL stamp */}
            <div
              className={`absolute top-6 right-6 stamp text-xl z-20 ${stampShake ? "animate-shake" : ""}`}
            >
              CONFIDENTIAL
            </div>

            {/* File markings bar at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 flex justify-between px-4 py-2 text-[10px] font-mono text-gray-400 border-t border-gray-200">
              <span>PAGE 1 OF ██</span>
              <span>FILE NO. GN-████-7742</span>
            </div>
          </div>
        </motion.div>

        {/* Redaction slider */}
        <motion.div
          className="mt-8 bg-gnome-dark p-6 border border-gnome-red/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <label className="font-mono text-sm text-gnome-red block mb-3">
            REDACTION LEVEL: {redactionLevel}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={redactionLevel}
            onChange={handleSlider}
            className="w-full accent-gnome-red cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
            <span>DECLASSIFIED</span>
            <span>FULLY REDACTED</span>
          </div>
        </motion.div>
        </div> {/* end flex-1 */}
      </div>
    </section>
  );
}

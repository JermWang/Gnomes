"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EvidenceCard {
  id: string;
  title: string;
  caption: string;
  image: string;
  rotation: number;
  stamp?: string;
}

const EVIDENCE: EvidenceCard[] = [
  {
    id: "e1",
    title: "RING CAM FOOTAGE",
    caption: "CAM_04 // MOTION TRIGGERED",
    image: "/ringcam.png",
    rotation: -3,
    stamp: "THEY SAID IT WAS A CAT.",
  },
  {
    id: "e2",
    title: "ARCHIVAL PHOTO // RECOVERED",
    caption: "DO NOT DISSEMINATE",
    image: "/archive_photo.png",
    rotation: 2,
    stamp: "WHY WAS THIS SEALED?",
  },
  {
    id: "e3",
    title: "FIELD OBSERVATION",
    caption: "LOOK CLOSER.",
    image: "/hidinggnomes.png",
    rotation: -1.5,
  },
  {
    id: "e4",
    title: "ZOOM + RED CIRCLE",
    caption: "IT WAS $GNOMES.",
    image: "/zoom_redcircle.png",
    rotation: 3,
    stamp: "ENHANCED",
  },
  {
    id: "e5",
    title: "WE FOUND THEM",
    caption: "SUBTERRANEAN EXIT POINT",
    image: "/we found them.png",
    rotation: -2,
  },
  {
    id: "e6",
    title: "ORB GATHERING",
    caption: "UNEXPLAINED LUMINANCE",
    image: "/orb_gathering.png",
    rotation: 1.5,
    stamp: "LOOK CLOSER.",
  },
];

// ── Hyperrealistic 3D pushpin (CSS-only) ──
function Pin3D() {
  return (
    <div
      className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.55))" }}
    >
      {/* Pin head — metallic sphere with specular */}
      <div
        className="w-[22px] h-[22px] rounded-full mx-auto"
        style={{
          background: [
            "radial-gradient(circle at 34% 28%, rgba(255,210,210,0.95) 0%, transparent 26%)",
            "radial-gradient(circle at 68% 72%, rgba(90,0,0,0.75) 0%, transparent 33%)",
            "radial-gradient(circle at 50% 50%, #e03020 0%, #b01c10 38%, #6a0800 68%, #1e0200 100%)",
          ].join(", "),
          boxShadow: [
            "0 3px 10px rgba(0,0,0,0.75)",
            "0 1px 3px rgba(0,0,0,0.5)",
            "inset 0 1px 3px rgba(255,180,160,0.55)",
          ].join(", "),
        }}
      />
      {/* Shaft — tapered metallic cylinder */}
      <div
        className="mx-auto"
        style={{
          width: 4,
          height: 11,
          marginTop: -2,
          background: "linear-gradient(135deg, #e0e0e0 0%, #b0b0b0 25%, #686868 65%, #909090 100%)",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
          boxShadow: "1px 0 2px rgba(0,0,0,0.35)",
        }}
      />
      {/* Contact shadow on card */}
      <div
        className="mx-auto"
        style={{
          width: 14,
          height: 4,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function EvidenceBoard() {
  const [selectedCard, setSelectedCard] = useState<EvidenceCard | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  return (
    <>
    <section
      id="evidence"
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: "#111008" }}
    >
      {/* ── SVG filter defs for cork grain ── */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="cork-grain" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65 0.22" numOctaves="4" seed="11" result="noise" />
            <feColorMatrix
              type="matrix"
              values="0.35 0.20 0.08 0 0.48
                      0.22 0.14 0.04 0 0.32
                      0.08 0.04 0.02 0 0.12
                      0    0    0    2 -0.3"
              in="noise"
              result="corkColor"
            />
          </filter>
        </defs>
      </svg>

      {/* Global SVG filter for MS Paint rough effect (shared across all cards) */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="rough">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── Cork surface (fills section minus frame margin) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "28px 22px",
          backgroundColor: "#b08050",
          filter: "url(#cork-grain)",
          opacity: 0.75,
        }}
      />

      {/* Cork edge vignette — depth + shadow inset */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "28px 22px",
          boxShadow: [
            "inset 0 0 60px rgba(0,0,0,0.45)",
            "inset 0 0 140px rgba(0,0,0,0.20)",
          ].join(", "),
        }}
      />

      {/* ── Wood frame — 4 planks ── */}
      {/* TOP plank */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: "28px",
        background: [
          "repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(0,0,0,0.06) 60px, rgba(0,0,0,0.06) 62px)",
          "linear-gradient(180deg, #9c5c24 0%, #7a4018 30%, #8c5020 55%, #6a380e 78%, #7c4818 100%)",
        ].join(", "),
        boxShadow: "0 5px 14px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,210,140,0.18), inset 0 -2px 5px rgba(0,0,0,0.45)",
        zIndex: 5,
      }} />
      {/* BOTTOM plank */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: "28px",
        background: [
          "repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(0,0,0,0.07) 60px, rgba(0,0,0,0.07) 62px)",
          "linear-gradient(0deg, #9c5c24 0%, #7a4018 30%, #8c5020 55%, #6a380e 78%, #7c4818 100%)",
        ].join(", "),
        boxShadow: "0 -5px 14px rgba(0,0,0,0.65), inset 0 -1px 0 rgba(255,210,140,0.18), inset 0 2px 5px rgba(0,0,0,0.45)",
        zIndex: 5,
      }} />
      {/* LEFT plank */}
      <div className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{
        width: "22px",
        background: [
          "repeating-linear-gradient(180deg, transparent 0px, transparent 80px, rgba(0,0,0,0.06) 80px, rgba(0,0,0,0.06) 82px)",
          "linear-gradient(90deg, #9c5c24 0%, #7a4018 35%, #8c5020 60%, #6a380e 80%, #7c4818 100%)",
        ].join(", "),
        boxShadow: "5px 0 14px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,210,140,0.15), inset -2px 0 5px rgba(0,0,0,0.4)",
        zIndex: 5,
      }} />
      {/* RIGHT plank */}
      <div className="absolute top-0 bottom-0 right-0 pointer-events-none" style={{
        width: "22px",
        background: [
          "repeating-linear-gradient(180deg, transparent 0px, transparent 80px, rgba(0,0,0,0.06) 80px, rgba(0,0,0,0.06) 82px)",
          "linear-gradient(270deg, #9c5c24 0%, #7a4018 35%, #8c5020 60%, #6a380e 80%, #7c4818 100%)",
        ].join(", "),
        boxShadow: "-5px 0 14px rgba(0,0,0,0.55), inset -1px 0 0 rgba(255,210,140,0.15), inset 2px 0 5px rgba(0,0,0,0.4)",
        zIndex: 5,
      }} />

      {/* ── Corner screws ── */}
      {["top-[6px] left-[6px]", "top-[6px] right-[6px]", "bottom-[6px] left-[6px]", "bottom-[6px] right-[6px]"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-[14px] h-[14px] rounded-full pointer-events-none z-10`} style={{
          background: "radial-gradient(circle at 38% 32%, #d4c098 0%, #a08860 35%, #6a5838 65%, #3a3020 100%)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,240,200,0.3)",
        }}>
          {/* Screw slot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ width: "8px", height: "1.5px", background: "rgba(0,0,0,0.5)", transform: "rotate(45deg)" }} />
          </div>
        </div>
      ))}

      {/* ── Board drop shadow on the wall ── */}
      <div className="absolute pointer-events-none" style={{
        inset: "28px 22px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)",
        zIndex: -1,
      }} />

      <motion.h2
        className="font-impact text-4xl md:text-6xl text-center text-gnome-red mb-2 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        EVIDENCE BOARD
      </motion.h2>
      <p className="font-mono text-gnome-yellow text-center text-sm mb-12 relative z-10">
        {"//"} CLICK TO ENHANCE — HOVER TO INVESTIGATE {"//"}
      </p>

      {/* SVG red strings connecting cards */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" aria-hidden="true">
        <line x1="20%" y1="30%" x2="50%" y2="45%" stroke="#ff2b2b" strokeWidth="1" opacity="0.3" />
        <line x1="50%" y1="45%" x2="80%" y2="25%" stroke="#ff2b2b" strokeWidth="1" opacity="0.3" />
        <line x1="35%" y1="70%" x2="65%" y2="60%" stroke="#ff2b2b" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Evidence cards grid */}
      <div className="evidence-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {EVIDENCE.map((card, i) => (
          <motion.div
            key={card.id}
            id={`card-${card.id}`}
            className="relative bg-gnome-bg p-3 shadow-lg cursor-pointer pin-shadow group"
            style={{ transform: `rotate(${card.rotation}deg)` }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(255,43,43,0.3)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedCard(card)}
          >
            {/* 3D Pin */}
            <Pin3D />

            {/* Image */}
            <div className="relative w-full aspect-[4/3] bg-gnome-dark overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 33vw"
                loading="lazy"
              />
              {/* MS Paint-style crude red circle on hover */}
              <svg
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-90 transition-opacity pointer-events-none"
                viewBox="0 0 100 100" preserveAspectRatio="none"
              >
                <ellipse cx="42" cy="52" rx="22" ry="20"
                  fill="none" stroke="#ff2b2b" strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ filter: "url(#rough)" }}
                />
              </svg>
            </div>

            {/* Caption area */}
            <div className="mt-2">
              <p className="font-mono text-xs text-gnome-dark font-bold">{card.title}</p>
              <p className="font-mono text-[10px] text-gray-500">{card.caption}</p>
            </div>

            {/* Stamp */}
            {card.stamp && (
              <div className="absolute bottom-2 right-2 stamp text-[8px] !p-1 !border-2">
                {card.stamp}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Zoom Enhance Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => { setSelectedCard(null); setEnhanced(false); }}
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-gnome-dark border border-gnome-red/40 p-4 sm:p-6 max-w-3xl w-full z-10 flex flex-col md:flex-row gap-4 sm:gap-6 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Close */}
              <button
                onClick={() => { setSelectedCard(null); setEnhanced(false); }}
                className="absolute top-2 right-3 text-gnome-red font-impact text-2xl hover:scale-110 transition-transform p-2 z-20"
              >
                ✕
              </button>

              {/* Full image */}
              <div className="flex-1 relative aspect-[4/3] bg-black">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  fill
                  className="object-contain"
                  sizes="50vw"
                />
              </div>

              {/* Zoom bubble + controls */}
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="font-impact text-2xl text-gnome-red">{selectedCard.title}</h3>
                <p className="font-mono text-xs text-gnome-yellow">{selectedCard.caption}</p>

                {/* Zoom bubble */}
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-gnome-red">
                  <Image
                    src={selectedCard.image}
                    alt="Enhanced zoom"
                    fill
                    className={`object-cover transition-all duration-300 ${
                      enhanced ? "scale-[3] contrast-150 saturate-150" : "scale-[1.5]"
                    }`}
                    sizes="200px"
                  />
                </div>

                {/* Enhance toggle */}
                <label className="flex items-center gap-3 font-mono text-sm cursor-pointer mx-auto">
                  <span className={enhanced ? "text-gnome-red" : "text-gray-400"}>ENHANCE</span>
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      enhanced ? "bg-gnome-red" : "bg-gray-600"
                    }`}
                    onClick={() => setEnhanced(!enhanced)}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        enhanced ? "left-7" : "left-1"
                      }`}
                    />
                  </div>
                </label>

                {enhanced && (
                  <motion.p
                    className="font-comic text-gnome-yellow text-xs text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    *jaw drops* bro... zoom in more...
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}

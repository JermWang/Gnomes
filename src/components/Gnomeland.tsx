"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const RUNES = ["ᚠ", "ᚨ", "ᛗ", "ᛟ", "ᚲ", "ᛊ", "ᛏ", "ᚹ", "ᛈ", "ᛉ", "ᚾ", "ᛚ", "ᛜ"];

// ── Photorealistic glass orb ──
function FloatingOrb({ onOrbClick, clickCount }: { onOrbClick: () => void; clickCount: number }) {
  const [runes, setRunes] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
  const [echos, setEchos] = useState<{ id: number; delay: number }[]>([]);
  const [hovering, setHovering] = useState(false);
  const [shimmerDeg, setShimmerDeg] = useState(0);
  const runeId = useRef(0);
  const echoId = useRef(0);
  const rafRef = useRef<number>(0);

  // Continuously rotate the iridescent shimmer layer
  useEffect(() => {
    let deg = 0;
    const tick = () => {
      deg = (deg + 0.35) % 360;
      setShimmerDeg(deg);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spawnEchos = () => {
    const rings = Array.from({ length: 3 }, (_, i) => ({
      id: echoId.current++,
      delay: i * 0.12,
    }));
    setEchos((prev) => [...prev, ...rings]);
    // Clean up after animation completes
    setTimeout(() => {
      setEchos((prev) => prev.filter((e) => !rings.find((r) => r.id === e.id)));
    }, 1200);
  };

  const spawnRunes = (e: React.MouseEvent) => {
    for (let i = 0; i < 5; i++) {
      const id = runeId.current++;
      const x = (Math.random() - 0.5) * 120;
      const y = -(Math.random() * 60 + 20);
      const char = RUNES[Math.floor(Math.random() * RUNES.length)];
      setRunes((prev) => [...prev.slice(-12), { id, x, y, char }]);
      setTimeout(() => setRunes((prev) => prev.filter((r) => r.id !== id)), 1600);
    }
  };

  const ORB_SIZE = 160;

  return (
    <div className="relative" style={{ width: ORB_SIZE, height: ORB_SIZE }}>

      {/* ── Outer atmospheric halo (far glow) ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -60,
          background: "radial-gradient(circle, rgba(90,30,220,0.10) 0%, rgba(50,0,160,0.05) 45%, transparent 70%)",
          animation: "pulse_orb 4s ease-in-out infinite",
        }}
      />

      {/* ── Mid glow ring ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -28,
          background: hovering
            ? "radial-gradient(circle, rgba(140,60,255,0.32) 0%, rgba(80,10,200,0.16) 50%, transparent 72%)"
            : "radial-gradient(circle, rgba(110,40,220,0.22) 0%, rgba(60,0,180,0.10) 50%, transparent 72%)",
          transition: "background 0.4s ease",
          animation: "pulse_orb 2.6s ease-in-out infinite 0.4s",
        }}
      />

      {/* ── THE ORB ── */}
      <motion.div
        className="absolute inset-0 rounded-full cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={(e) => { onOrbClick(); spawnRunes(e); spawnEchos(); }}
        style={{
          // Layered radial gradients simulate a lit glass sphere
          background: [
            // Large soft specular (light source upper-left)
            "radial-gradient(ellipse at 36% 30%, rgba(255,255,255,0.50) 0%, rgba(200,170,255,0.18) 32%, transparent 55%)",
            // Deep shadow lower-right
            "radial-gradient(circle at 68% 72%, rgba(10,0,40,0.85) 0%, transparent 42%)",
            // Rim light bottom (sub-surface scatter)
            "radial-gradient(ellipse at 50% 92%, rgba(140,70,255,0.45) 0%, transparent 38%)",
            // Core sphere body
            "radial-gradient(circle at 50% 46%, #7a32ff 0%, #5515c8 30%, #380094 58%, #18004e 80%, #080018 100%)",
          ].join(", "),
          boxShadow: hovering
            ? [
                "0 0  90px 28px rgba(110, 50, 255, 0.60)",
                "0 0 180px 60px rgba(70,  0, 200, 0.28)",
                "inset 0  0  35px rgba(180,120,255, 0.28)",
                "inset 0 -22px 40px rgba(8, 0, 40, 0.70)",
              ].join(", ")
            : [
                "0 0  45px 14px rgba(90,  35, 220, 0.44)",
                "0 0  90px 32px rgba(50,   0, 170, 0.22)",
                "inset 0  0  22px rgba(140, 80, 255, 0.18)",
                "inset 0 -16px 30px rgba(8,  0, 40, 0.60)",
              ].join(", "),
          transition: "box-shadow 0.45s ease",
          animation: "float 3.5s ease-in-out infinite",
        }}
      >
        {/* Animated iridescent shimmer (conic gradient rotates) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${shimmerDeg}deg at 48% 50%,
              rgba(255, 60, 60, 0.07)   0deg,
              rgba(120,  0,255, 0.11)  72deg,
              rgba(  0,160,255, 0.07) 144deg,
              rgba(  0,255,160, 0.05) 216deg,
              rgba(255,200,  0, 0.07) 288deg,
              rgba(255, 60, 60, 0.07) 360deg
            )`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Primary specular highlight — large, soft */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "11%", left: "14%",
            width: "44%", height: "34%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.62) 0%, rgba(220,200,255,0.28) 48%, transparent 100%)",
            filter: "blur(5px)",
          }}
        />

        {/* Sharp catch-light (tiny bright dot — glass effect) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "17%", left: "20%",
            width: "17%", height: "13%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.5) 55%, transparent 100%)",
          }}
        />

        {/* Tiny secondary catch-light */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "56%", right: "18%",
            width: "7%", height: "5%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
          }}
        />

        {/* Hover lens flare streak */}
        {hovering && (
          <motion.div
            className="absolute pointer-events-none"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.55, scaleX: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              top: "45%", left: 0, right: 0, height: "10%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.12) 75%, transparent)",
              filter: "blur(3px)",
            }}
          />
        )}
      </motion.div>

      {/* Click counter badge */}
      {clickCount > 0 && (
        <div className="absolute -top-2 -right-2 z-20 bg-gnome-red text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold shadow-lg">
          {clickCount}
        </div>
      )}

      {/* Echo rings — expand outward and fade on click */}
      <AnimatePresence>
        {echos.map((echo) => (
          <motion.div
            key={echo.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
              border: "2px solid rgba(140, 70, 255, 0.6)",
              boxShadow: "0 0 12px rgba(140, 70, 255, 0.3), inset 0 0 12px rgba(140, 70, 255, 0.15)",
            }}
            initial={{ width: 40, height: 40, opacity: 0.8 }}
            animate={{ width: 320, height: 320, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              delay: echo.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Runes burst outward on click */}
      {runes.map((r) => (
        <span
          key={r.id}
          className="rune"
          style={{
            left: `calc(50% + ${r.x}px)`,
            top:  `calc(50% + ${r.y}px)`,
            fontSize: "16px",
          }}
        >
          {r.char}
        </span>
      ))}
    </div>
  );
}

// Deterministic seeded pseudo-random (avoids SSR hydration mismatch)
function seeded(seed: number, offset = 0) {
  const s = Math.sin(seed * 9301 + offset * 49297 + 233) * 93280;
  return s - Math.floor(s);
}

// ── Upgraded ambient particle field ──
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const colors = [
      "rgba(160,107,255,VAR)",
      "rgba(100, 40,255,VAR)",
      "rgba(200,140,255,VAR)",
      "rgba( 80,200,255,VAR)",
      "rgba(255,180, 80,VAR)",
    ];
    return {
      id: i,
      x: seeded(i, 0) * 100,
      y: seeded(i, 1) * 100,
      size: 2 + seeded(i, 2) * 10,
      duration: 4 + seeded(i, 3) * 7,
      delay: seeded(i, 4) * 5,
      color: colors[i % colors.length].replace("VAR", String((0.3 + seeded(i, 5) * 0.5).toFixed(2))),
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 100%)`,
            filter: p.size > 6 ? "blur(1px)" : "none",
          }}
          animate={{ y: [0, -40, 0], opacity: [0.08, 0.6, 0.08] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Gnomeland() {
  const [orbClicks, setOrbClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [stampAnim, setStampAnim] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mystical chime — Web Audio API synthesized tone
  const playChime = useCallback((clickNum: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Base pitch rises slightly with each click
    const base = 520 + clickNum * 40;
    const vol = 0.12;

    // Main tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(base, now);
    osc1.frequency.exponentialRampToValueAtTime(base * 1.02, now + 0.3);
    gain1.gain.setValueAtTime(vol, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    // Harmonic shimmer (octave + fifth)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(base * 1.5, now);
    gain2.gain.setValueAtTime(vol * 0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now + 0.03);
    osc2.stop(now + 0.5);

    // High sparkle
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(base * 2, now);
    gain3.gain.setValueAtTime(vol * 0.15, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc3.connect(gain3).connect(ctx.destination);
    osc3.start(now + 0.05);
    osc3.stop(now + 0.35);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOrbClick = () => {
    const next = orbClicks + 1;
    setOrbClicks(next);
    playChime(next);
    if (next >= 7 && !showSecret) {
      setStampAnim(true);
      setTimeout(() => {
        setShowSecret(true);
        setStampAnim(false);
      }, 800);
    }
  };

  const parallaxOffset = (factor: number) => scrollY * factor * 0.05;

  return (
    <section
      id="gnomeland"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #1a2a1a 70%, #0b0b10 100%)",
      }}
    >
      <Particles />

      {/* Parallax background layers */}
      <div
        className="parallax-layer absolute bottom-0 left-0 right-0 h-40 opacity-30"
        style={{
          transform: `translateY(${parallaxOffset(0.3)}px)`,
          background: "linear-gradient(transparent, #1a2a1a)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.h2
          className="font-impact text-5xl md:text-7xl text-gnome-purple-light text-center mb-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GNOMELAND
        </motion.h2>

        <motion.p
          className="font-mono text-gnome-yellow text-center mb-12 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          ENTER IF YOU DARE — THEY&apos;RE WATCHING
        </motion.p>

        {/* Gnomeland image */}
        <motion.div
          className="relative w-full max-w-2xl aspect-video mb-12 rounded-lg overflow-hidden border-2 border-gnome-purple/40"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Image
            src="/chilltwin.jpg"
            alt="Chill twin gnomes"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 640px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gnome-purple/30 to-transparent" />
        </motion.div>

        {/* The Orb — god-tier render meets MS Paint label */}
        <motion.div
          className="mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Deliberately crude Comic Sans label — intentional low-fi against the high-fidelity orb */}
          <div className="relative mb-5">
            <p
              className="font-comic text-gnome-purple-light text-center"
              style={{
                fontSize: "13px",
                transform: "rotate(-1.5deg)",
                letterSpacing: "0.05em",
                textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
              }}
            >
              // click the orb //
            </p>
            {/* Hand-drawn underline (SVG scrawl) */}
            <svg viewBox="0 0 120 8" className="w-full" style={{ marginTop: "-2px", opacity: 0.6 }}>
              <path
                d="M2,5 Q20,2 40,5 Q60,8 80,4 Q100,1 118,5"
                fill="none" stroke="#a06bff" strokeWidth="1.5" strokeLinecap="round"
              />
            </svg>
          </div>

          <FloatingOrb onOrbClick={handleOrbClick} clickCount={orbClicks} />

          {/* Crude click-count feedback — Comic Sans scrawl beneath the god-tier orb */}
          {orbClicks > 0 && orbClicks < 7 && (
            <motion.p
              key={orbClicks}
              className="font-comic text-gnome-yellow mt-4 text-center"
              style={{ fontSize: "11px", transform: `rotate(${(orbClicks % 2 === 0 ? 1 : -1) * 1.2}deg)` }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {orbClicks === 1 && "u felt that right"}
              {orbClicks === 2 && "do it again"}
              {orbClicks === 3 && "its getting warmer"}
              {orbClicks === 4 && "STOP. (keep going)"}
              {orbClicks === 5 && "almost there..."}
              {orbClicks === 6 && "ONE MORE."}
            </motion.p>
          )}
        </motion.div>

        {/* CONFIDENTIAL stamp animation on 7 clicks */}
        <AnimatePresence>
          {stampAnim && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 3, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <div className="stamp text-6xl md:text-8xl !border-8">CONFIDENTIAL</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secret panel */}
        <AnimatePresence>
          {showSecret && (
            <motion.div
              className="mt-6 bg-gnome-dark border-2 border-gnome-red p-6 max-w-md w-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-impact text-3xl text-gnome-red text-center animate-blink">
                YOU ARE TOO CLOSE
              </p>
              <p className="font-mono text-xs text-gnome-yellow text-center mt-4">
                THEY KNOW YOU&apos;RE LOOKING.
              </p>
              <p className="font-mono text-xs text-gray-500 text-center mt-2">
                FILE FLAGGED — IP LOGGED — STAY AWAKE
              </p>
              <button
                onClick={() => { setShowSecret(false); setOrbClicks(0); }}
                className="mt-4 mx-auto block font-mono text-xs text-gnome-red border border-gnome-red px-3 py-1 hover:bg-gnome-red hover:text-white transition-colors"
              >
                [CLOSE FILE]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";

const EVIDENCE_IDS = ["e1", "e2", "e3", "e4", "e5", "e6"];

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(4872);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((c) => c + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToRandom = () => {
    const id = EVIDENCE_IDS[Math.floor(Math.random() * EVIDENCE_IDS.length)];
    const el = document.getElementById(`card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-gnome-yellow");
      setTimeout(() => el.classList.remove("ring-4", "ring-gnome-yellow"), 2000);
    }
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <footer className="relative overflow-hidden bg-gnome-dark border-t-2 border-gnome-red/30">

      {/* ── 88×31 GIF BANNER STRIP (top of footer — GIFs only) ── */}
      <div className="bg-[#0a0a14] border-b border-gnome-purple/20 py-2 px-4 flex flex-wrap items-center justify-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/871.gif"      alt="Waar is jy"    className="h-8 opacity-90 hover:opacity-100 transition-opacity" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/japtext.gif"  alt="Japanese text" className="h-8 opacity-90 hover:opacity-100 transition-opacity" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/911.gif"      alt="9-11-2001"     className="h-8 opacity-90 hover:opacity-100 transition-opacity" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/FEMEZBBMFPRTHYZSLFRGF56BF2QYMI44.gif" alt="Gnome" className="h-8 pixel-gif opacity-80" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/AZTOSQLI6ZII47J2JOSUYKAIUAWOKASD.gif" alt="Gnome" className="h-8 pixel-gif opacity-70" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/1107.gif" alt="Gnome" className="h-8 pixel-gif opacity-80" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gifs/5GBPEKPY4LQRCKJAAHWB5TTQSHSAK4PI.gif" alt="Gnome" className="h-8 pixel-gif opacity-75" />
      </div>

      <div className="relative z-20 py-10 px-4 max-w-4xl mx-auto">

        {/* Gnome mascot + counter row */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">

          {/* wizardgnome mascot */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/wizardgnome.gif" alt="Wizard Gnome" width={56}
              className="opacity-80 drop-shadow-[0_0_8px_rgba(123,60,255,0.6)]" />
            <div>
              <p className="font-comic text-gnome-purple-light text-xs animate-blink">STAY AWAKE.</p>
              <p className="font-mono text-[9px] text-gray-600">HE IS ALWAYS WATCHING.</p>
            </div>
          </div>

          {/* Visitor counter */}
          <div className="font-mono text-xs text-gray-500 text-center">
            <div className="text-gnome-yellow mb-1">YOU ARE VISITOR #</div>
            <div className="bg-black border border-green-900 px-3 py-1 text-green-400 tracking-[0.3em] text-base font-bold">
              {String(visitorCount).padStart(10, "0")}
            </div>
          </div>

          {/* Last updated */}
          <div className="font-mono text-[10px] text-gray-600 text-right">
            <div>LAST UPDATED: <span className="text-gnome-red">{timeStr}</span></div>
            <div className="mt-1 text-gnome-yellow animate-blink">● STAY AWAKE ●</div>
            <div className="mt-1">🚧 UNDER CONSTRUCTION 🚧</div>
          </div>
        </div>

        {/* ── GNOME TRUTH WEBRING ── */}
        <div className="border border-gnome-purple/30 bg-[#0d0d1a] p-4 mb-8 text-center">
          <p className="font-mono text-[10px] text-gnome-purple-light tracking-widest mb-3">
            ✦ GNOME TRUTH WEB RING ✦
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/AZTOSQLI6ZII47J2JOSUYKAIUAWOKASD.gif" alt="Gnome" width={32} className="opacity-60" />
            <button className="font-mono text-xs text-gnome-purple hover:text-gnome-purple-light border border-gnome-purple/40 px-3 py-1 transition-colors">
              [← prev]
            </button>
            <button
              onClick={goToRandom}
              className="font-mono text-xs text-gnome-red hover:text-gnome-yellow border border-gnome-red/40 px-3 py-1 transition-colors"
            >
              [random]
            </button>
            <button className="font-mono text-xs text-gnome-purple hover:text-gnome-purple-light border border-gnome-purple/40 px-3 py-1 transition-colors">
              [next →]
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/AZTOSQLI6ZII47J2JOSUYKAIUAWOKASD.gif" alt="Gnome" width={32}
              className="opacity-60" style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>

        {/* Bottom fine print */}
        <div className="text-center border-t border-gray-800 pt-6 space-y-2">
          <p className="font-mono text-[10px] text-gray-600">
            © {now.getFullYear()} DEPARTMENT OF SUBTERRANEAN AFFAIRS — ALL FILES SEALED — DO NOT DISSEMINATE
          </p>
          <p className="font-mono text-[9px] text-gray-700">
            $GNOMES IS NOT A SECURITY. THIS IS FOLKLORE. WE ARE JUST REPORTING THE EVIDENCE.
          </p>
          <p className="font-comic text-[10px] text-gray-700">
            made with paranoia and $GNOMES ✦ hosted on the dark web (jk)
          </p>
          <p className="font-mono text-[8px] text-gray-700 mt-3">
            BEST VIEWED IN 800×600 · NETSCAPE NAVIGATOR 4.0 · IE6 COMPATIBLE
          </p>
          {/* GIFs-only row */}
          <div className="flex items-center justify-center gap-3 mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/B7M4XUXTDSE477LEQNOBFY2MOYLXO2E5.gif" alt="Thinking gnome" width={50}
              className="pixel-gif opacity-50" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/wizardgnome.gif" alt="Wizard gnome" width={40}
              className="pixel-gif opacity-40" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gifs/B7M4XUXTDSE477LEQNOBFY2MOYLXO2E5.gif" alt="Thinking gnome" width={50}
              className="pixel-gif opacity-50" style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

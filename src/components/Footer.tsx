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
      <div className="bg-[#0a0a14] border-b border-gnome-purple/20 py-2 px-2 sm:px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 overflow-hidden">
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
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-6 mb-8">

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

          {/* Last updated + Social */}
          <div className="font-mono text-[10px] text-gray-600 text-center sm:text-right">
            <div>LAST UPDATED: <span className="text-gnome-red">{timeStr}</span></div>
            <div className="mt-1 text-gnome-yellow animate-blink">● STAY AWAKE ●</div>
            <a
              href="https://x.com/GnomesOnSOL"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 border border-gnome-purple/40 px-2 py-1 hover:bg-gnome-purple/20 transition-all group"
            >
              <svg className="w-3 h-3 fill-gnome-purple-light group-hover:fill-gnome-yellow transition-colors" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-gnome-purple-light group-hover:text-gnome-yellow transition-colors">@GnomesOnSOL</span>
            </a>
            <a
              href="https://t.me/GnomesPortal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 border border-gnome-purple/40 px-2 py-1 hover:bg-gnome-purple/20 transition-all group"
            >
              <svg className="w-3 h-3 fill-gnome-purple-light group-hover:fill-gnome-yellow transition-colors" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span className="text-gnome-purple-light group-hover:text-gnome-yellow transition-colors">Telegram</span>
            </a>
            <div className="mt-2">🚧 UNDER CONSTRUCTION 🚧</div>
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

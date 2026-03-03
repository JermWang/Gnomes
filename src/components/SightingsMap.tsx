"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORLD_MAP_PATHS } from "./worldMapPaths";

interface Sighting {
  id: number;
  lat: number;
  lng: number;
  location: string;
  code: string;
  date: string;
  description: string;
  threat: number;
  verified: boolean;
}

const SIGHTINGS: Sighting[] = [
  { id: 1, lat: 40.7, lng: -74.0, location: "New York, USA", code: "NYC", date: "2024-02-14", description: "Subway tunnel collapse reveals subterranean colony. 3 MTA workers debriefed. NDA signed.", threat: 4, verified: true },
  { id: 2, lat: 51.5, lng: -0.1, location: "London, UK", code: "LDN", date: "2024-02-18", description: "Jubilee line CCTV captures 0.6m bipedal entity. Footage seized by MI5.", threat: 3, verified: true },
  { id: 3, lat: 35.7, lng: 139.7, location: "Tokyo, Japan", code: "TYO", date: "2024-02-21", description: "Shinjuku station maintenance crew reports tools relocated overnight. Tiny footprints found.", threat: 2, verified: false },
  { id: 4, lat: 48.9, lng: 2.3, location: "Paris, France", code: "PAR", date: "2024-02-25", description: "Catacomb explorers encounter organized tunnel system not on any map. DGSE investigating.", threat: 5, verified: true },
  { id: 5, lat: -33.9, lng: 18.4, location: "Cape Town, SA", code: "CPT", date: "2024-03-01", description: "Table Mountain cave formations show evidence of artificial modification. Samples pending.", threat: 2, verified: false },
  { id: 6, lat: 55.8, lng: 37.6, location: "Moscow, Russia", code: "MOW", date: "2024-03-02", description: "Metro-2 security breach. Unauthorized small-scale excavation detected at depth 80m.", threat: 4, verified: false },
  { id: 7, lat: -23.5, lng: -46.6, location: "São Paulo, Brazil", code: "GRU", date: "2024-02-28", description: "Sewer expansion crew discovers miniature infrastructure. 12 witnesses. Media blackout.", threat: 3, verified: true },
  { id: 8, lat: 41.9, lng: 12.5, location: "Rome, Italy", code: "ROM", date: "2024-02-16", description: "Vatican sub-basement Level 4 intrusion alarm. Swiss Guard deployed. No comment from Holy See.", threat: 5, verified: true },
  { id: 9, lat: 39.9, lng: 116.4, location: "Beijing, China", code: "PEK", date: "2024-02-20", description: "Forbidden City restoration uncovers network of micro-tunnels predating Ming Dynasty.", threat: 3, verified: false },
  { id: 10, lat: -34.6, lng: -58.4, location: "Buenos Aires, ARG", code: "BUE", date: "2024-02-27", description: "Subte Line D passengers report synchronized tapping from beneath platform. Recurring.", threat: 2, verified: true },
  { id: 11, lat: 37.8, lng: -122.4, location: "San Francisco, USA", code: "SFO", date: "2024-03-03", description: "BART tunnel expansion reveals hollow cavity system. Soil composition anomalous.", threat: 4, verified: true },
  { id: 12, lat: 52.5, lng: 13.4, location: "Berlin, Germany", code: "BER", date: "2024-02-19", description: "U-Bahn maintenance shaft graffiti matches symbols found at 7 other global sites.", threat: 3, verified: false },
  { id: 13, lat: 59.3, lng: 18.1, location: "Stockholm, Sweden", code: "ARN", date: "2024-03-04", description: "Tunnelbana Line 17 derailment caused by precision track displacement. Investigation sealed.", threat: 4, verified: true },
  { id: 14, lat: 25.0, lng: 55.3, location: "Dubai, UAE", code: "DXB", date: "2024-03-05", description: "Palm Jumeirah foundation scan reveals non-human tunneling. Classified by UAE MOD.", threat: 3, verified: false },
  { id: 15, lat: -37.8, lng: 145.0, location: "Melbourne, AUS", code: "MEL", date: "2024-02-22", description: "Loop tunnel boring machine damaged by pre-existing cavity. Workers report voices.", threat: 2, verified: true },
];

const FEED_MESSAGES = [
  "SIGINT INTERCEPT: Encrypted burst transmission detected — origin subterranean, freq 23.4 GHz",
  "FIELD REPORT: Agent TOADSTOOL confirms visual contact — Sector 7G, depth 40m",
  "ALERT: Seismic anomaly detected beneath Zurich. Pattern matches known gnomish boring activity",
  "INTEL: Satellite thermal scan reveals subsurface heat signatures — grid ref 48.2N 16.4E",
  "UPDATE: Seoul Station K-14 incident reclassified from UNEXPLAINED to GNOME-RELATED",
  "NOTICE: Asset REDCAP reports widespread tunneling activity across Scandinavian shelf",
  "DECRYPT: Recovered drive from Prague site contains 847 files. Language unknown. Analysis ongoing",
  "WARNING: Correlation detected between sightings and upcoming lunar perigee",
  "SIGINT: HAM radio operators report coordinated signal at 7.83 Hz — Schumann resonance disrupted",
  "DISPATCH: Rapid response team GARDEN deployed to Jakarta. ETA 4 hours",
  "DATA: Pattern analysis confirms 340% increase in global subterranean activity since Q1",
  "REPORT: Chilean mine collapse reveals carved stone chambers at 200m. Pre-Columbian origin ruled out",
];

// Mercator-style projection for SVG viewBox 0 0 1000 500
function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 1000;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 250 - (mercN / Math.PI) * 250;
  return { x, y: Math.max(20, Math.min(480, y)) };
}

export default function SightingsMap() {
  const [selected, setSelected] = useState<Sighting | null>(null);
  const [liveCount, setLiveCount] = useState(247);
  const [blink, setBlink] = useState(false);
  const [feedLines, setFeedLines] = useState<string[]>([]);
  const [systemTime, setSystemTime] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);

  // Blink
  useEffect(() => {
    const i = setInterval(() => setBlink((b) => !b), 800);
    return () => clearInterval(i);
  }, []);

  // Live count
  useEffect(() => {
    const i = setInterval(() => {
      if (Math.random() > 0.5) setLiveCount((c) => c + 1);
    }, 6000);
    return () => clearInterval(i);
  }, []);

  // System clock
  useEffect(() => {
    const tick = () => setSystemTime(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  // Live feed
  useEffect(() => {
    let idx = 0;
    const i = setInterval(() => {
      const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
      setFeedLines((prev) => [
        ...prev.slice(-15),
        `[${ts}] ${FEED_MESSAGES[idx % FEED_MESSAGES.length]}`,
      ]);
      idx++;
      if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }, 4000);
    return () => clearInterval(i);
  }, []);

  // Connection lines between nearby sightings
  const connections: [Sighting, Sighting][] = [];
  for (let i = 0; i < SIGHTINGS.length; i++) {
    for (let j = i + 1; j < SIGHTINGS.length; j++) {
      const dx = SIGHTINGS[i].lng - SIGHTINGS[j].lng;
      const dy = SIGHTINGS[i].lat - SIGHTINGS[j].lat;
      if (Math.sqrt(dx * dx + dy * dy) < 35) {
        connections.push([SIGHTINGS[i], SIGHTINGS[j]]);
      }
    }
  }

  const threatColor = (t: number) =>
    t >= 5 ? "#ff0033" : t >= 4 ? "#ff4444" : t >= 3 ? "#ff8800" : "#44ff44";

  return (
    <section
      id="sightings"
      className="relative py-16 px-4 md:px-8 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080815 0%, #0e0e22 40%, #0c0c1a 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── TERMINAL HEADER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-green-900/60 bg-black/80 mb-6"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-green-900/40 bg-green-950/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] text-green-500/60 ml-3">GNOSIS-NET v4.2.7 — SUBTERRANEAN INTELLIGENCE TRACKING SYSTEM</span>
            </div>
            <span className="font-mono text-[10px] text-green-500/40">{systemTime}</span>
          </div>
          <div className="px-4 py-3 flex flex-wrap gap-x-8 gap-y-1 font-mono text-[10px]">
            <span className="text-green-500/70">SYS: <span className="text-green-400">OPERATIONAL</span></span>
            <span className="text-green-500/70">CLEARANCE: <span className="text-red-400">LEVEL 5 — EYES ONLY</span></span>
            <span className="text-green-500/70">NETWORK: <span className="text-green-400">14 NODES ACTIVE</span></span>
            <span className="text-green-500/70">THREATS: <span className={`${blink ? "text-red-400" : "text-red-400/30"}`}>{liveCount} LOGGED</span></span>
            <span className="text-green-500/70">UPLINK: <span className="text-green-400">ENCRYPTED</span></span>
          </div>
        </motion.div>

        {/* ── MAP + SIDEBAR LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

          {/* MAP */}
          <motion.div
            className="relative bg-[#0a0a1a] border border-green-900/40 overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="opacity-[0.12]">
                <defs>
                  <pattern id="mapgrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ff44" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapgrid)" />
              </svg>
            </div>

            {/* Corner labels */}
            <div className="absolute top-2 left-3 font-mono text-[9px] text-green-500/30 z-10">90°N</div>
            <div className="absolute bottom-2 left-3 font-mono text-[9px] text-green-500/30 z-10">90°S</div>
            <div className="absolute top-2 right-3 font-mono text-[9px] text-green-500/30 z-10">180°E</div>
            <div className="absolute bottom-2 right-3 font-mono text-[9px] text-green-500/30 z-10">180°W</div>

            {/* World map SVG */}
            <svg viewBox="0 0 1000 500" className="w-full h-auto" style={{ minHeight: "380px" }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-strong">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Latitude lines */}
              {[-60, -30, 0, 30, 60].map((lat) => {
                const { y } = project(lat, 0);
                return <line key={`lat${lat}`} x1="0" y1={y} x2="1000" y2={y} stroke="#00ff44" strokeWidth="0.4" opacity="0.15" />;
              })}
              {/* Longitude lines */}
              {[-120, -60, 0, 60, 120].map((lng) => {
                const { x } = project(0, lng);
                return <line key={`lng${lng}`} x1={x} y1="0" x2={x} y2="500" stroke="#00ff44" strokeWidth="0.4" opacity="0.15" />;
              })}

              {/* ── LANDMASS FILL (subtle) ── */}
              <g fill="#00ff44" fillOpacity="0.08" stroke="none">
                {WORLD_MAP_PATHS.map((d, i) => (
                  <path key={`fill-${i}`} d={d} />
                ))}
              </g>
              {/* ── COASTLINE OUTLINES (detailed) ── */}
              <g fill="none" stroke="#00ff44" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" opacity="0.55">
                {WORLD_MAP_PATHS.map((d, i) => (
                  <path key={`stroke-${i}`} d={d} />
                ))}
              </g>

              {/* ── CONNECTION LINES ── */}
              {connections.map(([a, b], i) => {
                const pa = project(a.lat, a.lng);
                const pb = project(b.lat, b.lng);
                return (
                  <line
                    key={`conn-${i}`}
                    x1={pa.x} y1={pa.y}
                    x2={pb.x} y2={pb.y}
                    stroke="#ff2b2b"
                    strokeWidth="0.8"
                    opacity="0.25"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* ── SIGHTING MARKERS ── */}
              {SIGHTINGS.map((s) => {
                const { x, y } = project(s.lat, s.lng);
                const isSel = selected?.id === s.id;
                const col = threatColor(s.threat);
                return (
                  <g key={s.id} className="cursor-pointer" onClick={() => setSelected(s)}>
                    {/* Outer pulse */}
                    <circle cx={x} cy={y} r="8" fill="none" stroke={col} strokeWidth="0.5" opacity="0.4">
                      <animate attributeName="r" from="8" to="22" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    {/* Second pulse (offset) */}
                    <circle cx={x} cy={y} r="8" fill="none" stroke={col} strokeWidth="0.3" opacity="0.3">
                      <animate attributeName="r" from="8" to="18" dur="3s" begin="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="3s" begin="1.5s" repeatCount="indefinite" />
                    </circle>
                    {/* Core glow */}
                    <circle cx={x} cy={y} r={isSel ? "7" : "5"} fill={col} opacity="0.15" filter="url(#glow-strong)" />
                    {/* Dot */}
                    <circle cx={x} cy={y} r={isSel ? "4" : "2.5"} fill={col} filter="url(#glow)">
                      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Label */}
                    <text x={x + 7} y={y - 6} fill={col} fontSize="8" fontFamily="monospace" opacity="0.7">{s.code}</text>
                    {/* Threat level tick */}
                    <text x={x + 7} y={y + 3} fill="#666" fontSize="6" fontFamily="monospace">T{s.threat}</text>
                  </g>
                );
              })}
            </svg>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 scanlines" />

            {/* LIVE indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-[10px] z-10">
              <span className={`inline-block w-2 h-2 rounded-full ${blink ? "bg-red-500 shadow-[0_0_6px_#ff0000]" : "bg-red-900"}`} />
              <span className="text-red-400">LIVE TRACKING</span>
            </div>

            {/* Bottom status bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t border-green-900/30 px-4 py-1.5 flex justify-between font-mono text-[9px] text-green-500/50 z-10">
              <span>PROJECTION: MERCATOR | REFRESH: 200ms | RESOLUTION: HIGH</span>
              <span>NODES: {SIGHTINGS.length} ACTIVE | CONNECTIONS: {connections.length}</span>
            </div>
          </motion.div>

          {/* ── SIDEBAR ── */}
          <div className="flex flex-col gap-4">

            {/* SELECTED SIGHTING DETAIL */}
            <div className="border border-green-900/40 bg-black/80 flex-shrink-0">
              <div className="px-3 py-1.5 border-b border-green-900/30 bg-green-950/20">
                <span className="font-mono text-[10px] text-green-500/60">INCIDENT DETAIL</span>
              </div>
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.id}
                    className="p-3 font-mono text-[11px] space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">{selected.location}</span>
                      <button onClick={() => setSelected(null)} className="text-red-500/60 hover:text-red-400 text-[10px]">[CLOSE]</button>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-green-500/50">
                      <span>DATE: {selected.date}</span>
                      <span>|</span>
                      <span>CODE: {selected.code}</span>
                    </div>
                    {/* Threat bar */}
                    <div className="mt-1">
                      <div className="text-[9px] text-green-500/50 mb-1">THREAT LEVEL</div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-2 flex-1 rounded-sm"
                            style={{
                              background: i < selected.threat ? threatColor(selected.threat) : "#111",
                              boxShadow: i < selected.threat ? `0 0 4px ${threatColor(selected.threat)}40` : "none",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-green-300/80 text-[10px] leading-relaxed mt-2">{selected.description}</p>
                    <div className="text-[9px] mt-1" style={{ color: selected.verified ? "#44ff44" : "#ff8800" }}>
                      STATUS: {selected.verified ? "VERIFIED" : "UNVERIFIED — PENDING FIELD CONFIRMATION"}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div className="p-3 font-mono text-[10px] text-green-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    SELECT A NODE ON THE MAP TO VIEW INCIDENT DETAILS
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* THREAT SUMMARY */}
            <div className="border border-green-900/40 bg-black/80">
              <div className="px-3 py-1.5 border-b border-green-900/30 bg-green-950/20">
                <span className="font-mono text-[10px] text-green-500/60">GLOBAL THREAT ASSESSMENT</span>
              </div>
              <div className="p-3 font-mono text-[10px] space-y-2">
                <div className="flex justify-between"><span className="text-green-500/50">ACTIVE SIGHTINGS</span><span className="text-green-400">{liveCount}</span></div>
                <div className="flex justify-between"><span className="text-green-500/50">VERIFIED</span><span className="text-green-400">{SIGHTINGS.filter(s => s.verified).length}</span></div>
                <div className="flex justify-between"><span className="text-green-500/50">UNVERIFIED</span><span className="text-yellow-500">{SIGHTINGS.filter(s => !s.verified).length}</span></div>
                <div className="flex justify-between"><span className="text-green-500/50">THREAT LVL 5</span><span className="text-red-400">{SIGHTINGS.filter(s => s.threat >= 5).length} SITES</span></div>
                <div className="h-px bg-green-900/30 my-1" />
                <div className="flex justify-between"><span className="text-green-500/50">GLOBAL STATUS</span><span className={`font-bold ${blink ? "text-red-400" : "text-red-400/40"}`}>ELEVATED</span></div>
              </div>
            </div>

            {/* LIVE FEED */}
            <div className="border border-green-900/40 bg-black/80 flex-1 min-h-[180px] flex flex-col">
              <div className="px-3 py-1.5 border-b border-green-900/30 bg-green-950/20 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${blink ? "bg-green-400" : "bg-green-900"}`} />
                <span className="font-mono text-[10px] text-green-500/60">INTELLIGENCE FEED</span>
              </div>
              <div ref={feedRef} className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[200px]" style={{ scrollbarWidth: "none" }}>
                {feedLines.length === 0 && (
                  <p className="font-mono text-[9px] text-green-500/20 p-2">AWAITING INCOMING TRANSMISSIONS...</p>
                )}
                {feedLines.map((line, i) => (
                  <p key={i} className="font-mono text-[9px] text-green-400/60 leading-tight">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM LEGEND ── */}
        <div className="mt-4 border border-green-900/40 bg-black/80 px-4 py-3 flex flex-wrap gap-x-8 gap-y-2 justify-between items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#44ff44] shadow-[0_0_4px_#44ff44]" />
              <span className="text-green-500/50">LOW THREAT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff8800] shadow-[0_0_4px_#ff8800]" />
              <span className="text-green-500/50">MEDIUM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff4444] shadow-[0_0_4px_#ff4444]" />
              <span className="text-green-500/50">HIGH</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff0033] shadow-[0_0_4px_#ff0033]" />
              <span className="text-green-500/50">CRITICAL</span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-green-500/30">GNOSIS-NET // DEPT. OF SUBTERRANEAN AFFAIRS // CLASSIFICATION: TS/SCI</span>
        </div>
      </div>
    </section>
  );
}

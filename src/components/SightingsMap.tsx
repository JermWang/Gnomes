"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Sighting {
  id: number;
  lat: number;
  lng: number;
  location: string;
  date: string;
  description: string;
  verified: boolean;
}

const SIGHTINGS: Sighting[] = [
  { id: 1, lat: 40.7, lng: -74.0, location: "New York, USA", date: "2024-02-14", description: "Subway tunnel, 3 witnesses", verified: true },
  { id: 2, lat: 51.5, lng: -0.1, location: "London, UK", date: "2024-02-18", description: "Underground station", verified: true },
  { id: 3, lat: 35.7, lng: 139.7, location: "Tokyo, Japan", date: "2024-02-21", description: "Metro system", verified: false },
  { id: 4, lat: 48.9, lng: 2.3, location: "Paris, France", date: "2024-02-25", description: "Catacombs", verified: true },
  { id: 5, lat: -33.9, lng: 18.4, location: "Cape Town, SA", date: "2024-03-01", description: "Table Mountain caves", verified: false },
  { id: 6, lat: 55.8, lng: 37.6, location: "Moscow, Russia", date: "2024-03-02", description: "Metro-2 rumors", verified: false },
  { id: 7, lat: -23.5, lng: -46.6, location: "São Paulo, Brazil", date: "2024-02-28", description: "Sewer system", verified: true },
  { id: 8, lat: 41.9, lng: 12.5, location: "Rome, Italy", date: "2024-02-16", description: "Ancient tunnels", verified: true },
  { id: 9, lat: 39.9, lng: 116.4, location: "Beijing, China", date: "2024-02-20", description: "Forbidden City basement", verified: false },
  { id: 10, lat: -34.6, lng: -58.4, location: "Buenos Aires, ARG", date: "2024-02-27", description: "Subte Line D", verified: true },
  { id: 11, lat: 37.8, lng: -122.4, location: "San Francisco, USA", date: "2024-03-03", description: "BART tunnels", verified: true },
  { id: 12, lat: 52.5, lng: 13.4, location: "Berlin, Germany", date: "2024-02-19", description: "U-Bahn maintenance", verified: false },
];

export default function SightingsMap() {
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  const [liveCount, setLiveCount] = useState(SIGHTINGS.length);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((b) => !b);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLiveCount((c) => c + 1);
      }
    }, 8000);
    return () => clearInterval(countInterval);
  }, []);

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectToMap = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <section
      id="sightings"
      className="relative py-20 px-4 md:px-8 bg-gnome-dark border-t-2 border-b-2 border-gnome-red/20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-impact text-3xl md:text-5xl text-gnome-red mb-2">
            GLOBAL SIGHTINGS MAP
          </h2>
          <p className="font-mono text-gnome-yellow text-sm tracking-widest">
            {"//"} REAL-TIME REPORTS FROM THE FIELD {"//"}
          </p>
          <div className="mt-4 font-mono text-xs text-gnome-purple-light">
            <span className={blink ? "opacity-100" : "opacity-30"}>● LIVE</span>
            <span className="mx-3">|</span>
            <span>{liveCount} CONFIRMED SIGHTINGS</span>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative bg-[#0a0a14] border-2 border-gnome-red/30 p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7b3cff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Simplified world map SVG */}
          <svg viewBox="0 0 100 50" className="w-full h-auto relative z-0" style={{ minHeight: "300px" }}>
            {/* Continents (very simplified outlines) */}
            <g fill="none" stroke="#7b3cff" strokeWidth="0.3" opacity="0.4">
              {/* North America */}
              <path d="M 15,10 Q 20,8 25,12 L 28,18 Q 25,22 20,20 L 15,15 Z" />
              {/* South America */}
              <path d="M 22,25 Q 25,28 24,35 L 20,38 Q 18,35 19,30 Z" />
              {/* Europe */}
              <path d="M 45,12 Q 48,10 52,13 L 50,16 Q 47,15 45,12 Z" />
              {/* Africa */}
              <path d="M 48,18 Q 52,20 53,28 L 50,32 Q 47,28 48,22 Z" />
              {/* Asia */}
              <path d="M 60,8 Q 75,10 80,15 L 78,22 Q 70,20 65,18 L 60,12 Z" />
              {/* Australia */}
              <path d="M 75,32 Q 80,33 82,36 L 78,38 Q 75,36 75,32 Z" />
            </g>

            {/* Sighting markers */}
            {SIGHTINGS.map((sighting) => {
              const { x, y } = projectToMap(sighting.lat, sighting.lng);
              const isSelected = selectedSighting?.id === sighting.id;
              return (
                <g key={sighting.id}>
                  {/* Pulsing ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill="none"
                    stroke={sighting.verified ? "#ff2b2b" : "#7b3cff"}
                    strokeWidth="0.3"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from="2"
                      to="4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Marker dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "1.2" : "0.8"}
                    fill={sighting.verified ? "#ff2b2b" : "#7b3cff"}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedSighting(sighting)}
                    style={{ filter: isSelected ? "drop-shadow(0 0 3px #ff2b2b)" : "none" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />
        </motion.div>

        {/* Sighting details panel */}
        {selectedSighting && (
          <motion.div
            className="mt-6 bg-[#0a0a14] border border-gnome-red/40 p-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedSighting(null)}
              className="absolute top-2 right-2 text-gnome-red hover:text-gnome-yellow font-mono text-xs"
            >
              [X]
            </button>
            <div className="font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${selectedSighting.verified ? "bg-gnome-red" : "bg-gnome-purple"}`} />
                <span className="text-gnome-yellow font-bold">{selectedSighting.location}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">{selectedSighting.date}</span>
              </div>
              <p className="text-gray-300">{selectedSighting.description}</p>
              <div className="text-[10px] text-gray-500 mt-2">
                STATUS: {selectedSighting.verified ? "VERIFIED" : "PENDING VERIFICATION"}
              </div>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gnome-red" />
            <span className="text-gray-400">VERIFIED SIGHTINGS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gnome-purple" />
            <span className="text-gray-400">UNVERIFIED REPORTS</span>
          </div>
        </div>

        {/* Extra stamps */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {["THEY ARE EVERYWHERE.", "STAY VIGILANT.", "REPORT SIGHTINGS."].map((text) => (
            <span key={text} className="stamp text-xs">
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

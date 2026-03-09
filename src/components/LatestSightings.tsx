"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SIGHTINGS = [
  { image: "/gnome on shroom.png", caption: "Seen perched atop a toadstool near the village well, October 1897." },
  { image: "/gnomeland.png", caption: "A small company observed crossing the meadow at first light, May 1893." },
  { image: "/hidinggnomes.png", caption: "Discovered sheltering beneath ivy during a summer shower, July 1895." },
  { image: "/gnomes watching.png", caption: "Seen watching a family picnic from behind the hedge, June 1897." },
  { image: "/campfire.png", caption: "A small group drawn to the warmth of a human campfire, autumn 1894." },
  { image: "/fishing.png", caption: "Observed along the riverbank, studying a fisherman with quiet curiosity, spring 1896." },
  { image: "/gnomes comic.png", caption: "An unusually bold individual observed inspecting a gardener's wheelbarrow, April 1898." },
  { image: "/gnomes text.png", caption: "Archival entry recovered from the Thornberry estate library, date unknown." },
];

export default function LatestSightings() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextSighting = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SIGHTINGS.length);
      setFade(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSighting, 8000);
    return () => clearInterval(interval);
  }, [nextSighting]);

  const current = SIGHTINGS[currentIndex];

  return (
    <section
      id="sightings"
      className="relative py-20 px-4 md:px-8 overflow-hidden parchment-page paper-texture"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 100px rgba(122, 90, 68, 0.12)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="botanical-divider">
          <svg className="w-8 h-8 text-faded-brown/60" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="0.8" />
            <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="0.8" />
            <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="text-center mb-12">
          <p className="font-handwritten text-faded-brown text-lg mb-2">Appendix</p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink mb-4">
            Latest Sightings
          </h2>
          <p className="font-body text-ink/60 max-w-lg mx-auto">
            Recent reports from our network of field correspondents.
          </p>
        </div>

        {/* Sighting display */}
        <div className="max-w-2xl mx-auto">
          <div
            className="flex flex-col items-center transition-opacity duration-400"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {/* Illustrated plate */}
            <div className="w-full max-w-[520px] mx-auto plate-frame mb-6" style={{ transform: "rotate(-0.8deg)" }}>
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <Image
                  src={current.image}
                  alt={current.caption}
                  fill
                  className="object-cover"
                  sizes="520px"
                />
              </div>
            </div>

            {/* Caption */}
            <div className="text-center max-w-lg">
              <p className="font-handwritten text-ink/70 text-xl leading-relaxed">
                &ldquo;{current.caption}&rdquo;
              </p>
              <p className="font-body text-faded-brown/60 text-xs mt-3 tracking-wider uppercase">
                Sighting {currentIndex + 1} of {SIGHTINGS.length}
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {SIGHTINGS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentIndex(i);
                    setFade(true);
                  }, 400);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-rust scale-125"
                    : "bg-faded-brown/30 hover:bg-faded-brown/50"
                }`}
                aria-label={`View sighting ${i + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <div className="text-center mt-6">
            <button onClick={nextSighting} className="btn-tag text-sm">
              Next Sighting &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

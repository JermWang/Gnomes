"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ENCOUNTERS = [
  {
    image: "/gnomes watching.png",
    caption: "Often curious about human rituals. Observed peering from behind a garden fence during a summer gathering.",
    note: "Subjects maintained a safe distance of approximately twelve paces.",
    rotation: -1.5,
  },
  {
    image: "/campfire.png",
    caption: "A small group gathered near a human campfire at twilight. They appeared drawn to the warmth and the sound of conversation.",
    note: "They kept to the shadows but watched with unmistakable fascination.",
    rotation: 2,
  },
  {
    image: "/fishing.png",
    caption: "Observed along the riverbank while a fisherman cast his line. The gnomes appeared to be studying his technique with great interest.",
    note: "One specimen was seen mimicking the casting motion with a small twig.",
    rotation: -0.5,
  },
];

export default function HumanEncounters() {
  return (
    <section
      id="encounters"
      className="relative py-20 px-4 md:px-8 overflow-hidden bg-aged-paper ink-speckle"
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 120px rgba(122, 90, 68, 0.1)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="botanical-divider">
          <svg className="w-8 h-8 text-faded-brown/60" viewBox="0 0 40 40">
            <path d="M8,32 C12,20 20,10 32,8" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M12,32 C16,22 22,14 32,12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-handwritten text-faded-brown text-lg mb-2">Chapter IV</p>
          <h2 className="font-heading text-4xl md:text-6xl text-ink mb-4">
            Human Encounters
          </h2>
          <p className="font-body text-ink/60 max-w-xl mx-auto">
            Documented instances where gnomes have been observed in proximity to human activity.
            Their curiosity about our kind appears boundless.
          </p>
        </motion.div>

        {/* Encounter entries — alternating layout */}
        <div className="space-y-20">
          {ENCOUNTERS.map((enc, i) => (
            <motion.div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Image */}
              <div className="flex-1 max-w-lg w-full">
                <div
                  className="taped-photo"
                  style={{ transform: `rotate(${enc.rotation}deg)` }}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-warm-cream">
                    <Image
                      src={enc.image}
                      alt={enc.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 45vw"
                      loading="lazy"
                    />
                    {/* Sepia overlay */}
                    <div className="absolute inset-0 bg-amber-900/[0.05] mix-blend-multiply pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 max-w-lg">
                <p className="font-handwritten text-faded-brown text-sm mb-2">
                  Encounter No. {i + 1} — {["June 1894", "August 1895", "April 1896"][i]}
                </p>

                <p className="font-body text-ink/80 text-lg leading-relaxed mb-4">
                  &ldquo;{enc.caption}&rdquo;
                </p>

                <div className="field-note" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                  <span className="text-rust font-semibold">Observer&apos;s note:</span>{" "}
                  {enc.note}
                </div>

                {/* Small decorative element */}
                <div className="mt-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-moss/40" viewBox="0 0 24 24">
                    <path d="M12,3 C8,6 4,10 6,16 C8,14 10,10 12,7 C14,10 16,14 18,16 C20,10 16,6 12,3" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <div className="h-px flex-1 bg-faded-brown/20" />
                  <svg className="w-5 h-5 text-moss/40" viewBox="0 0 24 24">
                    <path d="M12,3 C8,6 4,10 6,16 C8,14 10,10 12,7 C14,10 16,14 18,16 C20,10 16,6 12,3" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Observation {
  id: string;
  image: string;
  caption: string;
  plate: string;
  rotation: number;
  style: "plate" | "taped" | "pinned";
}

const OBSERVATIONS: Observation[] = [
  {
    id: "o1",
    image: "/gnomes playing.png",
    caption: "A lively group observed at play in the meadow, wholly unaware of the observer's presence.",
    plate: "Plate II",
    rotation: -1.5,
    style: "plate",
  },
  {
    id: "o2",
    image: "/campfire.png",
    caption: "A campfire gathering observed from the tree line. The warmth draws them near.",
    plate: "Plate III",
    rotation: 2,
    style: "taped",
  },
  {
    id: "o3",
    image: "/fishing.png",
    caption: "Spotted along the riverbank at dawn, observing a fisherman with quiet curiosity.",
    plate: "Plate IV",
    rotation: -0.5,
    style: "plate",
  },
  {
    id: "o4",
    image: "/gnomeland.png",
    caption: "A gathering observed from behind the hedgerow. Remarkable social behavior.",
    plate: "Plate V",
    rotation: 1.5,
    style: "pinned",
  },
  {
    id: "o5",
    image: "/gnomes comic.png",
    caption: "Sketched from memory after a brief encounter along the garden path.",
    plate: "Plate VI",
    rotation: -2,
    style: "taped",
  },
  {
    id: "o6",
    image: "/gnomes text.png",
    caption: "Ancient manuscript references discovered in the university archives.",
    plate: "Plate VII",
    rotation: 1,
    style: "plate",
  },
];

export default function FieldObservations() {
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);

  return (
    <>
      <section
        id="observations"
        className="relative py-20 px-4 md:px-8 overflow-hidden bg-aged-paper paper-texture ink-speckle"
      >
        {/* Aged vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 100px rgba(122, 90, 68, 0.1)" }}
        />

        {/* Section header */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="botanical-divider">
            <svg className="w-8 h-8 text-faded-brown/60" viewBox="0 0 40 40">
              <path d="M20,5 C10,12 5,20 10,30 C15,25 18,18 20,12 C22,18 25,25 30,30 C35,20 30,12 20,5"
                fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-handwritten text-faded-brown text-lg mb-2">Chapter II</p>
            <h2 className="font-heading text-4xl md:text-6xl text-ink mb-4">
              Field Observations
            </h2>
            <p className="font-body text-ink/60 max-w-xl mx-auto">
              A collection of documented sightings gathered over several seasons of patient fieldwork in the countryside.
            </p>
          </motion.div>

          {/* Observation grid */}
          <div className="observation-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {OBSERVATIONS.map((obs, i) => (
              <motion.div
                key={obs.id}
                className={`relative cursor-pointer group ${
                  obs.style === "taped" ? "taped-photo" : obs.style === "plate" ? "plate-frame" : ""
                }`}
                style={{ transform: `rotate(${obs.rotation}deg)` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.2 } }}
                onClick={() => setSelectedObs(obs)}
              >
                {/* Pinned style gets a tack */}
                {obs.style === "pinned" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 35% 30%, #d4a574 0%, #8b6544 50%, #5a3d28 100%)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,220,180,0.3)",
                      }}
                    />
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-warm-cream">
                  <Image
                    src={obs.image}
                    alt={obs.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 80vw, 33vw"
                    loading="lazy"
                  />
                  {/* Subtle sepia overlay */}
                  <div className="absolute inset-0 bg-amber-900/[0.04] mix-blend-multiply pointer-events-none" />
                </div>

                {/* Caption */}
                <div className="mt-3 px-1">
                  <p className="font-heading text-sm text-faded-brown font-semibold">{obs.plate}</p>
                  <p className="font-handwritten text-base text-ink/70 mt-1 leading-snug">
                    &ldquo;{obs.caption}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {selectedObs && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                onClick={() => setSelectedObs(null)}
              />
              <motion.div
                className="relative parchment-page p-6 sm:p-10 max-w-3xl w-full z-10 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <button
                  onClick={() => setSelectedObs(null)}
                  className="absolute top-3 right-4 text-faded-brown hover:text-rust text-2xl font-heading transition-colors"
                >
                  &times;
                </button>

                <p className="font-handwritten text-faded-brown text-lg mb-2">{selectedObs.plate}</p>

                <div className="plate-frame mb-6">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={selectedObs.image}
                      alt={selectedObs.caption}
                      fill
                      className="object-contain"
                      sizes="80vw"
                    />
                  </div>
                </div>

                <p className="font-body text-ink/80 text-lg leading-relaxed">
                  &ldquo;{selectedObs.caption}&rdquo;
                </p>
                <p className="font-handwritten text-faded-brown mt-3 text-sm">
                  Documented with care by the Gnome Studies Society
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

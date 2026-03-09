"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ANNOTATIONS = [
  { label: "Pointed Cap", description: "Traditionally red, serves as camouflage among toadstools", x: "48%", y: "8%", lineEndX: "62%", lineEndY: "18%", rotation: -3 },
  { label: "Keen Eyes", description: "Excellent night vision for subterranean navigation", x: "70%", y: "22%", lineEndX: "58%", lineEndY: "28%", rotation: 2 },
  { label: "Magnificent Beard", description: "Length indicates wisdom and age, often braided", x: "72%", y: "38%", lineEndX: "58%", lineEndY: "40%", rotation: -1 },
  { label: "Sturdy Belt", description: "Contains miniature tools and seed pouches", x: "25%", y: "52%", lineEndX: "42%", lineEndY: "55%", rotation: 3 },
  { label: "Earthen Boots", description: "Specially crafted for silent movement through gardens", x: "30%", y: "78%", lineEndX: "45%", lineEndY: "80%", rotation: -2 },
  { label: "Garden Tools", description: "Hand-forged implements for tending underground gardens", x: "72%", y: "65%", lineEndX: "60%", lineEndY: "65%", rotation: 1 },
];

export default function AnatomyOfAGnome() {
  return (
    <section
      id="anatomy"
      className="relative py-20 px-4 md:px-8 overflow-hidden parchment-page paper-texture"
    >
      {/* Inner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 120px rgba(122, 90, 68, 0.12)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="botanical-divider">
          <svg className="w-8 h-8 text-faded-brown/60" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="0.5" />
            <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-handwritten text-faded-brown text-lg mb-2">Chapter III</p>
          <h2 className="font-heading text-4xl md:text-6xl text-ink mb-4">
            Anatomy of a Gnome
          </h2>
          <p className="font-body text-ink/60 max-w-xl mx-auto">
            A detailed anatomical study based on years of careful observation and scholarly comparison.
          </p>
        </motion.div>

        {/* Diagram layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-start max-w-5xl mx-auto">

          {/* Left annotations */}
          <div className="flex flex-col gap-6 lg:gap-10 lg:pt-12">
            {ANNOTATIONS.filter((_, i) => i % 2 === 0).map((ann, i) => (
              <motion.div
                key={ann.label}
                className="text-right lg:text-right"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="inline-block" style={{ transform: `rotate(${ann.rotation}deg)` }}>
                  <p className="font-handwritten text-rust text-xl md:text-2xl leading-tight">{ann.label}</p>
                  <p className="font-body text-ink/60 text-sm mt-1 max-w-[250px] ml-auto">{ann.description}</p>
                  {/* Arrow pointing right */}
                  <svg className="w-20 h-6 ml-auto mt-1 text-rust/60 hidden lg:block" viewBox="0 0 80 24">
                    <path d="M5,12 C20,12 40,8 60,12 C65,12 70,12 75,12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M68,7 L76,12 L68,17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center — gnome illustration */}
          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="plate-frame" style={{ width: "clamp(260px, 30vw, 380px)" }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/gnome on shroom.png"
                  alt="Anatomical study of the common garden gnome"
                  fill
                  className="object-cover"
                  sizes="380px"
                  loading="lazy"
                />
              </div>
              <p className="font-handwritten text-center text-faded-brown text-sm mt-2">
                Fig. 1 — Gnomeus domesticus
              </p>
            </div>

            {/* SVG annotation lines overlay — desktop only */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
              {ANNOTATIONS.map((ann, i) => (
                <line
                  key={i}
                  x1={ann.lineEndX}
                  y1={ann.lineEndY}
                  x2={i % 2 === 0 ? "2%" : "98%"}
                  y2={ann.lineEndY}
                  stroke="#9b4b3f"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  opacity="0.4"
                />
              ))}
            </svg>

            {/* Small magnifying glass decoration */}
            <div className="absolute -bottom-6 -right-6 hidden md:block">
              <svg className="w-16 h-16 text-faded-brown/25" viewBox="0 0 60 60" style={{ transform: "rotate(25deg)" }}>
                <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="35" y1="35" x2="55" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              </svg>
            </div>
          </motion.div>

          {/* Right annotations */}
          <div className="flex flex-col gap-6 lg:gap-10 lg:pt-20">
            {ANNOTATIONS.filter((_, i) => i % 2 === 1).map((ann, i) => (
              <motion.div
                key={ann.label}
                className="text-left"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="inline-block" style={{ transform: `rotate(${ann.rotation}deg)` }}>
                  {/* Arrow pointing left */}
                  <svg className="w-20 h-6 mb-1 text-rust/60 hidden lg:block" viewBox="0 0 80 24">
                    <path d="M75,12 C60,12 40,16 20,12 C15,12 10,12 5,12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M12,7 L4,12 L12,17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-handwritten text-rust text-xl md:text-2xl leading-tight">{ann.label}</p>
                  <p className="font-body text-ink/60 text-sm mt-1 max-w-[250px]">{ann.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom field note */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="field-note" style={{ transform: "rotate(0.3deg)" }}>
            Note: The above diagram represents the most common variety, <em>Gnomeus domesticus</em>.
            Regional variations have been documented across the Alpine, Nordic, and British Isles populations.
            Further study is required to classify the deep-forest subspecies.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

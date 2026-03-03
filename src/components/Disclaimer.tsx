"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Meter {
  label: string;
  value: number;
  max: number;
  color: string;
}

export default function Disclaimer() {
  const [meters, setMeters] = useState<Meter[]>([
    { label: "SUBTERRANEAN ACTIVITY DETECTED", value: 72, max: 99, color: "#ff2b2b" },
    { label: "GNOME PRESENCE NEAR YOU", value: 19, max: 99, color: "#7b3cff" },
  ]);
  const [toast, setToast] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState([0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedValues(meters.map((m) => m.value));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, meters]);

  const incrementMeter = (index: number) => {
    setMeters((prev) => {
      const updated = [...prev];
      if (updated[index].value < updated[index].max) {
        updated[index] = { ...updated[index], value: updated[index].value + 1 };
        setAnimatedValues((av) => {
          const newAv = [...av];
          newAv[index] = updated[index].value;
          return newAv;
        });
      }
      return updated;
    });
    setToast("*data updated*");
    setTimeout(() => setToast(null), 2000);
  };

  const renderBar = (value: number, color: string) => {
    const filled = Math.round((value / 99) * 20);
    const empty = 20 - filled;
    return (
      <span className="font-mono text-sm">
        [<span style={{ color }}>{"\u2588".repeat(filled)}</span>
        <span className="text-gray-600">{"-".repeat(empty)}</span>] {value}%
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="disclaimer"
      className="relative py-20 px-4 md:px-8 bg-gnome-dark border-t-2 border-b-2 border-gnome-red/20"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <p className="font-impact text-3xl md:text-5xl text-gnome-red">
            THIS IS NOT FINANCIAL ADVICE.
          </p>
          <p className="font-impact text-3xl md:text-5xl text-gnome-purple-light">
            THIS IS FOLKLORE.
          </p>
          <p className="font-mono text-gnome-yellow text-sm tracking-widest">
            WE ARE JUST REPORTING THE EVIDENCE.
          </p>
        </motion.div>

        {/* Meters */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {meters.map((meter, i) => (
            <div key={i} className="text-left">
              <button
                onClick={() => incrementMeter(i)}
                className="font-mono text-xs tracking-widest mb-2 block hover:text-gnome-yellow transition-colors cursor-pointer"
                style={{ color: meter.color }}
              >
                {meter.label}:
              </button>
              <div className="transition-all duration-500">
                {renderBar(animatedValues[i], meter.color)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-gnome-dark border border-gnome-red px-4 py-2 font-mono text-xs text-gnome-yellow toast-pop">
            {toast}
          </div>
        )}

        {/* Extra stamps */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {["STAY AWAKE.", "IT WAS $GNOMES.", "LOOK CLOSER."].map((text) => (
            <span
              key={text}
              className="stamp text-xs"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

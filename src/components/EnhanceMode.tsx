"use client";
import { useState, useEffect, useCallback } from "react";

export default function EnhanceMode() {
  const [active, setActive] = useState(false);
  const [magnifier, setMagnifier] = useState({ x: 0, y: 0, visible: false, bgX: 0, bgY: 0, src: "" });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!active) return;
      const target = e.target as HTMLElement;
      const img = target.closest("img") || target.querySelector("img");
      if (img && img instanceof HTMLImageElement) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;
        setMagnifier({ x, y, visible: true, bgX: relX, bgY: relY, src: img.src });
      } else {
        setMagnifier((prev) => ({ ...prev, visible: false }));
      }
    },
    [active]
  );

  useEffect(() => {
    if (active) {
      document.body.classList.add("enhance-cursor");
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      document.body.classList.remove("enhance-cursor");
      setMagnifier((prev) => ({ ...prev, visible: false }));
    }
    return () => {
      document.body.classList.remove("enhance-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active, handleMouseMove]);

  return (
    <>
      {/* Toggle button — fixed top-right */}
      <button
        onClick={() => setActive(!active)}
        className={`fixed top-4 right-4 z-40 font-mono text-xs px-3 py-2 border transition-colors ${
          active
            ? "bg-gnome-red text-white border-gnome-red"
            : "bg-gnome-dark text-gnome-red border-gnome-red/50 hover:bg-gnome-red hover:text-white"
        }`}
      >
        🔍 ENHANCE {active ? "ON" : "OFF"}
      </button>

      {/* Magnifier circle */}
      {active && magnifier.visible && (
        <div
          className="fixed z-50 pointer-events-none rounded-full border-4 border-gnome-red overflow-hidden"
          style={{
            width: 150,
            height: 150,
            left: magnifier.x - 75,
            top: magnifier.y - 75,
            backgroundImage: `url(${magnifier.src})`,
            backgroundSize: "400%",
            backgroundPosition: `${magnifier.bgX}% ${magnifier.bgY}%`,
            boxShadow: "0 0 20px rgba(255,43,43,0.5)",
          }}
        >
          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gnome-red/50" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-[1px] bg-gnome-red/50" />
          </div>
        </div>
      )}
    </>
  );
}

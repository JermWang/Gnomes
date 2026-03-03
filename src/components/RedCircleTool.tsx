"use client";
import { useState, useCallback, useEffect, useRef } from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  arrowAngle: number;
}

export default function RedCircleTool() {
  const [active, setActive] = useState(false);
  const [circles, setCircles] = useState<Circle[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!active) return;
      // Don't place circles on UI buttons
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("[data-no-circle]")) return;

      const id = idRef.current++;
      const size = 60 + Math.random() * 80;
      const arrowAngle = Math.random() * 360;
      setCircles((prev) => [
        ...prev,
        { id, x: e.clientX + window.scrollX, y: e.clientY + window.scrollY, size, arrowAngle },
      ]);
    },
    [active]
  );

  useEffect(() => {
    if (active) {
      window.addEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [active, handleClick]);

  return (
    <>
      {/* Controls — fixed bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 flex gap-2" data-no-circle>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActive(!active);
          }}
          className={`font-mono text-xs px-3 py-2 border transition-colors ${
            active
              ? "bg-gnome-red text-white border-gnome-red"
              : "bg-gnome-dark text-gnome-red border-gnome-red/50 hover:bg-gnome-red hover:text-white"
          }`}
          data-no-circle
        >
          ⭕ DRAW {active ? "ON" : "OFF"}
        </button>
        {circles.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCircles([]);
            }}
            className="font-mono text-xs px-3 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors"
            data-no-circle
          >
            CLEAR ({circles.length})
          </button>
        )}
      </div>

      {/* Rendered circles */}
      {circles.map((c) => (
        <div
          key={c.id}
          className="absolute pointer-events-none z-30"
          style={{
            left: c.x - c.size / 2,
            top: c.y - c.size / 2,
            width: c.size,
            height: c.size,
          }}
        >
          {/* Red circle */}
          <div
            className="w-full h-full rounded-full border-[3px] border-gnome-red"
            style={{ opacity: 0.8 }}
          />
          {/* Arrow */}
          <div
            className="absolute text-gnome-red text-2xl font-bold"
            style={{
              left: "50%",
              top: "-20px",
              transform: `rotate(${c.arrowAngle}deg)`,
              transformOrigin: "center center",
            }}
          >
            ←
          </div>
        </div>
      ))}
    </>
  );
}

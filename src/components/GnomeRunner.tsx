"use client";
import { useState, useRef, useCallback, useEffect } from "react";

export default function GnomeRunner() {
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState({ x: 20, y: 0 });
  const [direction, setDirection] = useState(1);
  const [bounced, setBounced] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  const frameRef = useRef<number>(0);
  const trailId = useRef(0);
  const buttonY = useRef(0);

  const startRun = useCallback(() => {
    if (running) return;
    setRunning(true);
    setBounced(false);
    setDirection(1);
    const startY = window.innerHeight - 80;
    buttonY.current = startY;
    setPos({ x: -40, y: startY });

    let x = -40;
    let dir = 1;
    let hasBounced = false;
    let frame = 0;

    const animate = () => {
      x += dir * 8;
      frame++;

      // Spawn smoke trail every 3 frames
      if (frame % 3 === 0) {
        const id = trailId.current++;
        setTrails((prev) => [...prev.slice(-15), { id, x, y: startY }]);
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id));
        }, 600);
      }

      // Bounce off right edge
      if (x > window.innerWidth - 40 && !hasBounced) {
        dir = -1;
        hasBounced = true;
      }

      // Disappear off left edge after bounce
      if (hasBounced && x < -60) {
        setRunning(false);
        setTrails([]);
        return;
      }

      // Disappear off right edge if no bounce needed (safety)
      if (!hasBounced && x > window.innerWidth + 60) {
        setRunning(false);
        setTrails([]);
        return;
      }

      setPos({ x, y: startY });
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [running]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      {/* Trigger button — fixed bottom-left */}
      <button
        onClick={startRun}
        className="fixed bottom-4 left-4 z-40 bg-gnome-dark border border-gnome-purple/50 text-gnome-purple font-mono text-xs px-3 py-2 hover:bg-gnome-purple hover:text-white transition-colors"
        title="Release the gnome"
      >
        🏃 GNOME
      </button>

      {/* Smoke trail particles */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="smoke-particle"
          style={{ left: t.x, top: t.y + 10 }}
        />
      ))}

      {/* Running gnome sprite */}
      {running && (
        <div
          className="fixed z-50 pointer-events-none select-none"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `scaleX(${pos.x > 0 && direction === -1 ? -1 : 1})`,
            fontSize: "36px",
            transition: "none",
          }}
        >
          🏃
        </div>
      )}
    </>
  );
}

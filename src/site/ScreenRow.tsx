import { useEffect, useRef, useState } from "react";
import { Screen, type ScreenKind } from "./screens";

// The hero signature: a row of narrow portrait Timex windows receding to the
// right edge under a gradient mask, auto-advancing like a queue every 4s.
// Seamless loop by recycling the exited node to the tail on transitionend.

const W = 340;
const GAP = 20;
const STEP = W + GAP;
const INTERVAL = 4000;
const SLIDE_MS = 700;

const CYCLE: ScreenKind[] = ["timeline", "stats", "export", "project"];
const NODES = 6; // enough to always fill the faded tail

function initialOrder(): ScreenKind[] {
  return Array.from({ length: NODES }, (_, i) => CYCLE[i % CYCLE.length]);
}

export function ScreenRow() {
  const [items, setItems] = useState<ScreenKind[]>(initialOrder);
  const [shift, setShift] = useState(0);
  const [anim, setAnim] = useState(false);
  const pausedRef = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setAnim(true);
      setShift(-STEP);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const onEnd = () => {
    // Recycle the exited front node to the tail, snap back with no transition.
    setAnim(false);
    setItems((prev) => [...prev.slice(1), prev[0]]);
    setShift(0);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="relative"
        style={{
          height: W * 1.6,
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 34%, transparent 92%)",
          maskImage: "linear-gradient(to right, black 0%, black 34%, transparent 92%)",
          overflow: "visible",
        }}
      >
        <div
          className="absolute left-0 top-0 flex"
          style={{
            gap: GAP,
            transform: `translateX(${shift}px)`,
            transition: anim ? `transform ${SLIDE_MS}ms cubic-bezier(.4,0,0,1)` : "none",
          }}
          onTransitionEnd={onEnd}
        >
          {items.map((kind, i) => (
            <div
              key={`${kind}-${i}`}
              style={{
                width: W,
                flex: "0 0 auto",
                transform: `scale(${1 - Math.min(i, 4) * 0.015})`,
                transformOrigin: "top center",
              }}
            >
              <Screen kind={kind} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

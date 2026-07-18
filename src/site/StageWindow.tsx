import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Presents a fixed-size Timex window as a premium object on a lit stage:
// dead-on 0deg, the WHOLE window uniformly scaled to fit (never clipped, never
// height-capped), seated on a recessed plinth with a two-layer contact shadow
// and one faint amber glow. This is the terminal-presentation contract.
export function StageWindow({ children, iw = 420, ih = 680, pad = 56 }: { children: ReactNode; iw?: number; ih?: number; pad?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [effPad, setEffPad] = useState(pad);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const p = Math.min(pad, Math.max(16, el.clientWidth * 0.07));
      const avail = el.clientWidth - p * 2;
      setEffPad(p);
      setScale(Math.max(0.2, Math.min(1, avail / iw)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [iw, pad]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[22px]"
      style={{ background: "var(--plinth)", border: "1px solid var(--hair)", padding: effPad }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(48% 42% at 50% 40%, rgba(232,165,93,0.11), transparent 72%)" }}
      />
      <div
        className="relative mx-auto"
        style={{ width: iw * scale, height: ih * scale, boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 44px 90px rgba(0,0,0,0.55)", borderRadius: 12 * scale }}
      >
        <div style={{ width: iw, height: ih, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

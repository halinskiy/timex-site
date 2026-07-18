import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { TimexWindow } from "./timex/TimexWindow";
import { TimexTerminal } from "./timex/TimexTerminal";
import { useTimex } from "./timex/useTimex";
import { ReportFrame } from "./site/ReportFrame";

const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";
const BASE = import.meta.env.BASE_URL;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
// Piecewise-linear map with clamped ends.
function mapRange(x: number, xs: number[], ys: number[]): number {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * ((x - xs[i - 1]) / (xs[i] - xs[i - 1]));
  }
  return ys[ys.length - 1];
}
// Trapezoid: 0 → up over [a,b] → 1 → down over [c,d] → 0.
const band = (x: number, a: number, b: number, c: number, d: number) =>
  Math.max(0, Math.min(clamp01((x - a) / (b - a)), 1 - clamp01((x - c) / (d - c))));
const rampDown = (x: number, a: number, b: number) => 1 - clamp01((x - a) / (b - a));
const rampUp = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));

function LiveClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return <span className="tabular-nums">{`${p(t.getHours())}:${p(t.getMinutes())}:${p(t.getSeconds())}`}</span>;
}

function Editorial({ op, eyebrow, title, body }: { op: number; eyebrow: string; title: string; body: string }) {
  return (
    <div
      style={{ opacity: op, transition: "opacity 0.12s linear", visibility: op < 0.01 ? "hidden" : "visible" }}
      className="pointer-events-none absolute left-[6vw] top-1/2 z-10 max-w-[400px] -translate-y-1/2"
    >
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.22em]" style={{ color: "#8a8073" }}>{eyebrow}</p>
      <h2 className="font-sans text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]" style={{ color: "#f4f1ea" }}>{title}</h2>
      <p className="mt-5 text-[1.02rem] leading-relaxed" style={{ color: "#a49b8d" }}>{body}</p>
    </div>
  );
}

export default function App() {
  const tx = useTimex({ autoplay: true });
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setP);

  // Window position/size along the morph.
  const winX = mapRange(p, [0, 0.3, 0.5, 0.6], [220, 220, 80, 0]);
  const winW = mapRange(p, [0.46, 0.6], [440, 860]);
  const winH = mapRange(p, [0.46, 0.6], [560, 620]);
  const winOp = rampDown(p, 0.88, 0.965);
  const winScale = 1 - 0.06 * rampUp(p, 0.88, 0.99);

  // Crossfades.
  const termO = rampDown(p, 0.44, 0.54);
  const reportO = band(p, 0.5, 0.6, 0.86, 0.93);
  const heroO = rampDown(p, 0.06, 0.12);
  const p1O = band(p, 0.15, 0.21, 0.28, 0.33);
  const p2O = band(p, 0.35, 0.41, 0.47, 0.52);
  const ctaO = rampUp(p, 0.9, 0.98);
  const pe = (o: number): "auto" | "none" => (o > 0.5 ? "auto" : "none");

  return (
    <div className="relative" style={{ background: "#0b0a09" }}>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.22em]" style={{ color: "#8a8073" }}>
        <a href={BASE} className="flex items-center gap-2.5 normal-case tracking-normal">
          <img src={`${BASE}timex-logo.svg`} alt="" className="size-6 rounded-[7px]" />
          <span className="font-sans text-[15px] font-semibold" style={{ color: "#f4f1ea" }}>Timex</span>
        </a>
        <span className="hidden font-mono sm:inline"><LiveClock /> · Leicester</span>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="font-mono hover:text-neutral-300">GitHub ↗</a>
      </header>

      <div ref={wrapRef} className="relative" style={{ height: "520vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(55% 45% at 82% 6%, rgba(232,165,93,0.08), transparent 60%),radial-gradient(60% 55% at 10% 96%, rgba(120,110,100,0.10), transparent 62%)" }} />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

          <Editorial op={heroO} eyebrow="Time tracker · macOS" title="Track hours. Send a link a client can read." body="A minimal, keyboard-driven tracker that turns a week of work into one page worth sending. Scroll." />
          <Editorial op={p1O} eyebrow="It types itself" title="A terminal, in a native window." body="Name what you are doing and it logs it, as fast as you can type. No Electron, no browser, no account." />
          <Editorial op={p2O} eyebrow="Never loses an hour" title="Snapshotted, always recoverable." body="Every project is saved before anything can erase it. A wrong keystroke is never the end of your hours." />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div
              style={{
                width: winW,
                height: winH,
                maxWidth: "92vw",
                maxHeight: "82vh",
                opacity: winOp,
                transform: `translateX(${winX}px) scale(${winScale})`,
                visibility: winOp < 0.01 ? "hidden" : "visible",
              }}
            >
              <TimexWindow className="h-full w-full">
                <div className="relative h-full w-full">
                  <div style={{ opacity: termO, pointerEvents: pe(termO) }} className="absolute inset-0">
                    <TimexTerminal tx={tx} />
                  </div>
                  <div style={{ opacity: reportO, pointerEvents: pe(reportO), visibility: reportO < 0.01 ? "hidden" : "visible" }} className="absolute inset-0 overflow-hidden">
                    <ReportFrame />
                  </div>
                </div>
              </TimexWindow>
            </div>
          </div>

          <div style={{ opacity: ctaO, pointerEvents: pe(ctaO), transform: `translateY(${24 * (1 - ctaO)}px)`, visibility: ctaO < 0.01 ? "hidden" : "visible" }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.24em]" style={{ color: "#8a8073" }}>Your hours, worth sending</p>
            <h2 className="mb-10 max-w-2xl font-sans text-[clamp(2.4rem,5.5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]" style={{ color: "#f4f1ea" }}>Download Timex.</h2>
            <a href={DOWNLOAD} className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold transition-transform hover:-translate-y-0.5" style={{ background: "#f4f1ea", color: "#111" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download for Mac
            </a>
            <p className="mt-6 font-mono text-[12px]" style={{ color: "#5f584e" }}>Signed &amp; notarized · macOS 12+ · free</p>
          </div>

          <div style={{ opacity: heroO, color: "#5f584e", visibility: heroO < 0.01 ? "hidden" : "visible" }} className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.24em]">scroll ↓</div>
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-between border-t px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: "#1c1a17", color: "#5f584e", background: "#0b0a09" }}>
        <span>© 2026 Timex · by 3mpq</span>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-neutral-300">Source ↗</a>
      </footer>
    </div>
  );
}

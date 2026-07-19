import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Screen, type ScreenKind } from "./screens";

// The morph block, in the spirit of Corder's HowItWorks: ONE Timex window that
// travels down the page, snapping between left/right slots as you scroll and
// swapping its screen at each stop — always on screen, always doing something.

type Row = { screen: ScreenKind; n: string; eyebrow: string; title: string; body: string };

const ROWS: Row[] = [
  { screen: "timeline", n: "01", eyebrow: "The interface", title: "Everything is a keystroke.", body: "Type a line and the clock runs against that project. Type another and it switches. No forms, no timer to babysit, no browser tab." },
  { screen: "stats", n: "02", eyebrow: "On the record", title: "Every hour, accounted for.", body: "See your time by project, day and week with /stats. Every project is snapshotted as you work, so a wrong keystroke never costs you an afternoon." },
  { screen: "export", n: "03", eyebrow: "The handoff", title: "A report in four seconds.", body: "Pick a day, a week or a month. Timex builds a clean, shareable page you hand a client as a single link, the Excel workbook tucked inside." },
  { screen: "project", n: "04", eyebrow: "Your projects", title: "Switch context in a keystroke.", body: "Every client is its own project, with its own history and total. Create, rename and switch without your hands leaving the keys." },
];

const N = ROWS.length;
const ROW_VH = 92;
const SPRING = { stiffness: 90, damping: 22, mass: 0.7 };
const WIN_W = 36; // % of track
const rightX = ((100 - WIN_W) / WIN_W) * 100; // translateX % (own width) to reach right slot

// Step-function breakpoints over scroll progress p (transitions in narrow bands).
const BP = [0, 0.22, 0.28, 0.47, 0.53, 0.72, 0.78, 1];
const centre = (i: number) => (i + 0.5) * ROW_VH;
const TOP_OUT = [centre(0), centre(0), centre(1), centre(1), centre(2), centre(2), centre(3), centre(3)];
// even rows → window RIGHT, odd → LEFT
const side = (i: number) => (i % 2 === 0 ? rightX : 0);
const X_OUT = [side(0), side(0), side(1), side(1), side(2), side(2), side(3), side(3)];
const LIFT = [0, 1, 0, 0, 1, 0, 0, 1, 0];
const LIFT_BP = [0.22, 0.25, 0.28, 0.47, 0.5, 0.53, 0.72, 0.75, 0.78];

function TerminalObject({ screen }: { screen: ScreenKind }) {
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={screen}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Screen kind={screen} className="h-full w-full" />
      </motion.div>
    </AnimatePresence>
  );
}

function Ghost() {
  return (
    <div className="w-[36%]" style={{ aspectRatio: "420 / 680" }}>
      <div className="h-full w-full rounded-[12px]" style={{ border: "1px dashed var(--rule)" }} />
    </div>
  );
}

export default function MorphTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const [row, setRow] = useState(0);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const topRaw = useTransform(p, BP, TOP_OUT);
  const xRaw = useTransform(p, BP, X_OUT);
  const liftRaw = useTransform(p, LIFT_BP, LIFT);
  const top = useSpring(topRaw, SPRING);
  const x = useSpring(xRaw, SPRING);
  const scale = useTransform(liftRaw, [0, 1], [1, 1.03]);
  const transform = useTransform([x, top, scale], ([xv, tv, sv]: number[]) => `translate(${xv}%, calc(${tv}vh - 50% + 24px)) scale(${sv})`);

  useMotionValueEvent(p, "change", (v) => {
    const r = Math.max(0, Math.min(N - 1, Math.floor(v * N)));
    setRow((cur) => (cur === r ? cur : r));
  });

  if (!desktop) {
    // Mobile: static stacked rows, window full-width above each block.
    return (
      <div className="page-container">
        {ROWS.map((r) => (
          <div key={r.n} className="border-t py-16" style={{ borderColor: "var(--rule)" }}>
            <p className="eyebrow">{r.n} · {r.eyebrow}</p>
            <h2 className="heading mt-4">{r.title}</h2>
            <p className="subhead">{r.body}</p>
            <div className="mx-auto mt-10 w-full max-w-[380px]" style={{ aspectRatio: "420 / 680", boxShadow: "0 30px 60px -24px rgba(20,20,15,0.35)" }}>
              <Screen kind={r.screen} className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="page-container relative" style={{ height: `${N * ROW_VH}vh` }}>
      {/* the one travelling window, absolutely positioned; snaps between slots */}
      <motion.div
        className="absolute left-0 top-0 z-10 w-[36%]"
        style={{ transform, aspectRatio: "420 / 680", boxShadow: "0 40px 80px -28px rgba(20,20,15,0.4), 0 4px 12px rgba(20,20,15,0.12)", borderRadius: 12, willChange: "transform" }}
      >
        <div className="relative h-full w-full">
          <TerminalObject screen={ROWS[row].screen} />
        </div>
      </motion.div>

      {/* the rows: text on one side, a ghost slot on the other for the window to land on */}
      {ROWS.map((r, i) => {
        const windowRight = i % 2 === 0;
        return (
          <div key={r.n} className="relative flex items-center justify-between" style={{ height: `${ROW_VH}vh` }}>
            {windowRight ? (
              <>
                <div className="w-[48%]"><RowText row={r} /></div>
                <Ghost />
              </>
            ) : (
              <>
                <Ghost />
                <div className="w-[48%]"><RowText row={r} /></div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RowText({ row }: { row: Row }) {
  return (
    <div>
      <p className="eyebrow">{row.n} · {row.eyebrow}</p>
      <h2 className="heading mt-5" style={{ fontSize: "clamp(34px,3.4vw,56px)" }}>{row.title}</h2>
      <p className="subhead" style={{ maxWidth: "40ch" }}>{row.body}</p>
    </div>
  );
}

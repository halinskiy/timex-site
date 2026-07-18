import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { TimexEngine, type TxSnapshot } from "./engine";

// Autonomous demo director: types commands/tasks on its own so an untouched
// window keeps doing something. Any interaction hands control to the visitor;
// after a quiet spell it restarts the reel from scratch.

type Step =
  | { t: "wait"; ms: number }
  | { t: "type"; text: string; cps: number }
  | { t: "submit" };

const SCRIPT: Step[] = [
  { t: "wait", ms: 1100 },
  { t: "type", text: "/start", cps: 22 }, { t: "wait", ms: 260 }, { t: "submit" },
  { t: "wait", ms: 850 },
  { t: "type", text: "Wiring the scroll morph", cps: 27 }, { t: "wait", ms: 300 }, { t: "submit" },
  { t: "wait", ms: 5200 },
  { t: "type", text: "Redrawing the report in code", cps: 27 }, { t: "wait", ms: 300 }, { t: "submit" },
  { t: "wait", ms: 4800 },
  { t: "type", text: "/pause", cps: 22 }, { t: "wait", ms: 240 }, { t: "submit" },
  { t: "wait", ms: 1700 },
  { t: "type", text: "/resume", cps: 22 }, { t: "wait", ms: 240 }, { t: "submit" },
  { t: "wait", ms: 3600 },
  { t: "type", text: "Polishing the hero copy", cps: 27 }, { t: "wait", ms: 300 }, { t: "submit" },
  { t: "wait", ms: 3200 },
  { t: "type", text: "/stats", cps: 22 }, { t: "wait", ms: 220 }, { t: "submit" },
  { t: "wait", ms: 3400 },
  { t: "type", text: "/back", cps: 22 }, { t: "wait", ms: 200 }, { t: "submit" },
  { t: "wait", ms: 900 },
  { t: "type", text: "/export", cps: 24 }, { t: "wait", ms: 220 }, { t: "submit" },
  { t: "wait", ms: 3600 },
  { t: "type", text: "/back", cps: 22 }, { t: "wait", ms: 200 }, { t: "submit" },
  { t: "wait", ms: 900 },
  { t: "type", text: "/help", cps: 22 }, { t: "wait", ms: 220 }, { t: "submit" },
  { t: "wait", ms: 3200 },
  { t: "type", text: "/back", cps: 22 }, { t: "wait", ms: 200 }, { t: "submit" },
  { t: "wait", ms: 900 },
  { t: "type", text: "/new", cps: 22 }, { t: "wait", ms: 240 }, { t: "submit" },
  { t: "wait", ms: 2600 },
];

const TICK_MS = 40;
const IDLE_RESUME_MS = 7000;

export interface UseTimexResult {
  snap: TxSnapshot;
  suggestion: string;
  hints: { matches: string[]; noMatch: boolean } | null;
  autopilot: boolean;
  onInputChange: (v: string) => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
  markInteract: () => void;
}

export function useTimex(opts: { autoplay?: boolean } = {}): UseTimexResult {
  const autoplay = opts.autoplay ?? true;
  const [, setTick] = useState(0);
  const force = useCallback(() => setTick((t) => t + 1), []);

  const engineRef = useRef<TimexEngine | null>(null);
  if (engineRef.current === null) engineRef.current = new TimexEngine();
  const engine = engineRef.current;

  const autopilotRef = useRef(autoplay);
  const stepIdxRef = useRef(0);
  const stepStartRef = useRef(0);
  const lastTickRef = useRef(0);
  const lastInteractRef = useRef(0);

  // Take control away from the director (visitor focused / clicked / typed).
  const markInteract = useCallback(() => {
    lastInteractRef.current = performance.now();
    if (autopilotRef.current) {
      autopilotRef.current = false;
      engine.setInput("");
      force();
    }
  }, []);

  const onInputChange = useCallback((v: string) => {
    lastInteractRef.current = performance.now();
    autopilotRef.current = false;
    engine.setInput(v);
    force();
  }, []);

  const onKeyDown = useCallback((e: ReactKeyboardEvent<HTMLInputElement>) => {
    lastInteractRef.current = performance.now();
    autopilotRef.current = false;
    const eng = engine;
    if (e.key === "Enter") {
      e.preventDefault();
      eng.submit(eng.snapshot().input);
      force();
    } else if (e.key === "Tab") {
      const sug = eng.suggestion(eng.snapshot().input);
      if (sug) {
        e.preventDefault();
        eng.setInput(sug);
        force();
      }
    }
  }, []);

  useEffect(() => {
    lastTickRef.current = performance.now();
    stepStartRef.current = performance.now();

    const restartReel = () => {
      engine.reset();
      stepIdxRef.current = 0;
      stepStartRef.current = performance.now();
      autopilotRef.current = true;
    };

    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      engine.tick(dt, now);

      // Resume the reel after a quiet spell.
      if (autoplay && !autopilotRef.current && now - lastInteractRef.current > IDLE_RESUME_MS) {
        restartReel();
      }

      // Drive the director.
      if (autopilotRef.current) {
        const eng = engine;
        let guard = 0;
        while (guard++ < 8) {
          const step = SCRIPT[stepIdxRef.current];
          if (!step) {
            restartReel();
            break;
          }
          const elapsed = now - stepStartRef.current;
          if (step.t === "wait") {
            if (elapsed >= step.ms) {
              stepIdxRef.current++;
              stepStartRef.current = now;
              continue;
            }
            break;
          }
          if (step.t === "type") {
            const chars = Math.floor((elapsed / 1000) * step.cps);
            eng.setInput(step.text.slice(0, Math.min(chars, step.text.length)));
            if (chars >= step.text.length) {
              stepIdxRef.current++;
              stepStartRef.current = now;
              continue;
            }
            break;
          }
          // submit
          eng.submit(eng.snapshot().input);
          stepIdxRef.current++;
          stepStartRef.current = now;
          continue;
        }
      }

      force();
    }, TICK_MS);

    return () => clearInterval(id);
  }, [autoplay]);

  const eng = engineRef.current;
  const snap = eng.snapshot();
  return {
    snap,
    suggestion: eng.suggestion(snap.input),
    hints: eng.hints(snap.input),
    autopilot: autopilotRef.current,
    onInputChange,
    onKeyDown,
    markInteract,
  };
}

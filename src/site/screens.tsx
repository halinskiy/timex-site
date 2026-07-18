import { TimexWindow } from "../timex/TimexWindow";
import { TimexTerminal } from "../timex/TimexTerminal";
import type { TxSnapshot, TxTask, TxView } from "../timex/engine";
import type { UseTimexResult } from "../timex/useTimex";

// Static, frozen Timex screens for the marketing page. The window is drawn 1:1
// by the real components (TimexTerminal/views), just fed a fixed snapshot and
// no-op handlers instead of the live engine, so it renders crisp at any size.

const AT = (h: number, m: number) => new Date(2026, 6, 18, h, m, 0);

const TASKS: TxTask[] = [
  { name: "Acme: landing hero", wallStart: AT(14, 0), activeStart: 0, activeEnd: 1520 },
  { name: "Client feedback pass", wallStart: AT(14, 25), activeStart: 1520, activeEnd: 2600 },
  { name: "Wiring the export view", wallStart: AT(14, 43), activeStart: 2600, activeEnd: null },
];
const ACTIVE = 2969; // current task running for 6m09s

const VIEW_TITLE: Record<TxView, string> = {
  timeline: "Timeline",
  export: "Export",
  help: "Help",
  stats: "Statistics",
  project: "Projects",
  date: "History",
  edit: "Edit Tasks",
  notification: "Notifications",
};

function makeSnap(view: TxView): TxSnapshot {
  return {
    state: "running",
    tasks: TASKS,
    lastSessionTasks: [],
    active: ACTIVE,
    input: "",
    placeholder: view === "timeline" ? "  What are you working on?  " : "  /back to return",
    toast: null,
    now: AT(14, 48),
    view,
    viewTitle: VIEW_TITLE[view],
    editIndex: 0,
  };
}

function staticTx(snap: TxSnapshot): UseTimexResult {
  return {
    snap,
    suggestion: "",
    hints: null,
    autopilot: false,
    onInputChange: () => {},
    onKeyDown: () => {},
    markInteract: () => {},
  };
}

export type ScreenKind = "timeline" | "stats" | "export" | "project";

export function Screen({ kind, className = "", title = "Timex" }: { kind: ScreenKind; className?: string; title?: string }) {
  const snap = makeSnap(kind as TxView);
  return (
    <TimexWindow className={className} title={title}>
      <TimexTerminal tx={staticTx(snap)} />
    </TimexWindow>
  );
}

// Timex behaviour engine — an in-memory mirror of the app's timeline logic,
// enough to make the code-drawn window genuinely usable in the browser.
// Source refs (timex.py): STATE_COMMANDS (l.133), CommandSuggester (l.140),
// _on_submit / command resolution (l.1128), _render_timer/_render_tasks (l.694/825).
// Not persisted, no projects/sub-views — those arrive in the morph phase.

export type TxState = "idle" | "running" | "paused";

export interface TxTask {
  name: string;
  wallStart: Date;
  activeStart: number; // active seconds elapsed at task start
  activeEnd: number | null; // active seconds at task end (null = current)
}

export const STATE_COMMANDS: Record<TxState, string[]> = {
  idle: ["/start", "/new", "/date", "/stats", "/export", "/edit", "/help", "/notification", "/project"],
  running: ["/pause", "/add", "/remove", "/reset", "/new", "/date", "/stats", "/export", "/edit", "/help", "/notification", "/project"],
  paused: ["/resume", "/add", "/remove", "/reset", "/new", "/date", "/stats", "/export", "/edit", "/help", "/notification", "/project"],
};

const IDLE_PLACEHOLDER = "  What are you working on?  (/start to begin)";
const RUN_PLACEHOLDER = "  What are you working on?  ";

export interface TxSnapshot {
  state: TxState;
  tasks: TxTask[];
  lastSessionTasks: TxTask[];
  active: number;
  input: string;
  placeholder: string;
  toast: string | null;
  now: Date;
}

export class TimexEngine {
  private state: TxState = "idle";
  private tasks: TxTask[] = [];
  private lastSession: TxTask[] = [];
  private active = 0; // accumulated active seconds
  private input = "";
  private toast: string | null = null;
  private toastUntil = 0;
  private clock = new Date();

  // ── clock ────────────────────────────────────────────────────────────
  /** Advance simulated time by dt seconds (drives the timer + task duration). */
  tick(dt: number, wall: number): void {
    if (this.state === "running") this.active += dt;
    if (this.toast && wall >= this.toastUntil) this.toast = null;
    this.clock = new Date();
  }

  snapshot(): TxSnapshot {
    return {
      state: this.state,
      tasks: this.tasks,
      lastSessionTasks: this.lastSession,
      active: this.active,
      input: this.input,
      placeholder: this.state === "idle" ? IDLE_PLACEHOLDER : RUN_PLACEHOLDER,
      toast: this.toast,
      now: this.clock,
    };
  }

  reset(): void {
    this.state = "idle";
    this.tasks = [];
    this.lastSession = [];
    this.active = 0;
    this.input = "";
    this.toast = null;
  }

  setInput(v: string): void {
    this.input = v;
  }

  // ── suggester + hints (mirror CommandSuggester / _command_hints) ───────
  suggestion(value: string): string {
    if (!value.startsWith("/")) return "";
    const val = value.toLowerCase();
    for (const c of STATE_COMMANDS[this.state]) {
      if (c.startsWith(val) && c !== val) return c;
    }
    return "";
  }

  hints(value: string): { matches: string[]; noMatch: boolean } | null {
    if (value.length < 2 || !value.startsWith("/")) return null;
    const val = value.toLowerCase();
    const matches = STATE_COMMANDS[this.state].filter((c) => c.startsWith(val));
    if (matches.length === 0) return { matches: [], noMatch: true };
    return { matches: matches.slice().sort(), noMatch: false };
  }

  private resolvePartial(raw: string): string {
    if (raw.startsWith("/") && !raw.includes(" ")) {
      const val = raw.toLowerCase();
      for (const c of STATE_COMMANDS[this.state]) {
        if (c.startsWith(val) && c !== val) return c;
      }
    }
    return raw;
  }

  // ── submit ─────────────────────────────────────────────────────────────
  submit(rawInput: string): void {
    const raw = this.resolvePartial(rawInput.trim());
    this.input = "";
    if (!raw) return;
    const cmd = raw.toLowerCase();

    if (cmd === "/start") return this.start();
    if (cmd === "/pause") return this.pause();
    if (cmd === "/resume") return this.resume();
    if (cmd === "/new") return this.newSession();
    if (cmd.startsWith("/")) {
      // Sub-views (/stats, /export, /help …) are drawn later in the scroll.
      this.setToast(`${cmd} opens further down the page`);
      return;
    }
    this.logTask(raw);
  }

  private setToast(msg: string): void {
    this.toast = msg;
    this.toastUntil = performance.now() + 3000;
  }

  private start(): void {
    if (this.state !== "idle") return;
    this.state = "running";
  }

  private pause(): void {
    if (this.state === "running") this.state = "paused";
  }

  private resume(): void {
    if (this.state === "paused") this.state = "running";
  }

  private newSession(): void {
    if (this.tasks.length) {
      this.closeCurrent();
      this.lastSession = this.tasks;
    }
    this.tasks = [];
    this.active = 0;
    this.state = "idle";
  }

  private closeCurrent(): void {
    const last = this.tasks[this.tasks.length - 1];
    if (last && last.activeEnd === null) last.activeEnd = this.active;
  }

  private logTask(name: string): void {
    if (this.state === "idle") this.state = "running";
    if (this.state === "paused") this.state = "running";
    this.closeCurrent();
    this.tasks.push({
      name,
      wallStart: new Date(),
      activeStart: this.active,
      activeEnd: null,
    });
  }
}

export function taskDuration(t: TxTask, currentActive: number): number {
  const end = t.activeEnd !== null ? t.activeEnd : currentActive;
  return Math.max(0, end - t.activeStart);
}

import { TX } from "./tokens";
import { fmtTime, fmtDuration, fmtStart } from "./format";
import { taskDuration, type TxSnapshot } from "./engine";

const G = TX.glyph;

// Sub-views redrawn 1:1 from timex.py: _render_export (l.1463), _render_help
// (l.2236), _render_stats (l.2885). See TIMEX-REPLICA.md.

const C = TX.color;
const AUTHOR = "Kostiantyn Halynskyi";
const PROJECT = "One Page";

function Sep() {
  return <div className="my-2" style={{ borderTop: `1px solid ${C.separator}` }} />;
}

const EXPORT_PERIODS: [string, string][] = [
  ["today", "Today"],
  ["week", "This week"],
  ["month", "This month"],
  ["range", "Custom range"],
];

export function ExportView({ snap }: { snap: TxSnapshot }) {
  const total = snap.active;
  const tasks = snap.tasks.length || snap.lastSessionTasks.length;
  const selected = "week";
  return (
    <div className="px-1">
      <div>
        <span style={{ color: C.accent, fontWeight: 600 }}>Report on Hours</span>
        <span style={{ color: C.dim }}> / {AUTHOR} for</span> <span style={{ color: C.text }}>{PROJECT}</span>
      </div>
      <Sep />
      <div><span style={{ color: C.dim }}>Period:</span>{"  "}<span style={{ color: C.text }}>This week</span></div>
      <div><span style={{ color: C.dim }}>Days:</span>{"    "}<span style={{ color: C.text }}>1</span></div>
      <div><span style={{ color: C.dim }}>Tasks:</span>{"   "}<span style={{ color: C.text }}>{tasks}</span></div>
      <div>
        <span style={{ color: C.dim }}>Total:</span>{"   "}
        <span style={{ color: C.text }} className="tabular-nums">{fmtTime(total)}</span>
        <span style={{ color: C.dim }} className="tabular-nums">{"  "}({(total / 3600).toFixed(2)} h)</span>
      </div>
      {EXPORT_PERIODS.map(([key, label], i) => (
        <div key={key}>
          <Sep />
          <div className="flex justify-between">
            <span>
              <span style={{ color: C.accent, fontWeight: 600 }}>{i + 1}.</span>{" "}
              <span style={{ color: C.text }}>{label}</span>
              {key === selected && <span style={{ color: C.accent }}> •</span>}
            </span>
            {key !== "range" && (
              <span className="tabular-nums" style={{ color: total ? C.text : C.dim }}>
                {total ? fmtTime(total) : "—"}
              </span>
            )}
          </div>
        </div>
      ))}
      <Sep />
      <div><span style={{ color: C.accent, fontWeight: 600 }}>5.</span> <span style={{ color: C.text }}>Share a link</span></div>
      <Sep />
      <div><span style={{ color: C.accent, fontWeight: 600 }}>6.</span> <span style={{ color: C.text }}>Export to Excel (.xlsx)</span></div>
    </div>
  );
}

const HELP_COMMANDS: [string, string][] = [
  ["/start", "Start the timer"],
  ["/pause", "Pause the timer"],
  ["/resume", "Resume paused timer"],
  ["/new", "Stop timer, save session, start fresh day"],
  ["/add <time>", "Add time manually (e.g. /add 10m, /add 1h)"],
  ["/remove <time>", "Remove time (e.g. /remove 10m, /remove 1h)"],
  ["/edit", "Edit task names in timeline"],
  ["/date", "Browse past sessions by date"],
  ["/stats", "Weekly and monthly statistics"],
  ["/export", "Report a period: visual .html page or .xlsx"],
  ["/notification", "Set reminder interval"],
  ["/reset", "Reset session (discard without saving)"],
  ["/project", "Switch project"],
  ["/help", "Show this help"],
  ["/back", "Return to previous view"],
];

export function HelpView() {
  return (
    <div className="px-1">
      {HELP_COMMANDS.map(([cmd, desc], i) => (
        <div key={cmd}>
          {i > 0 && <Sep />}
          <div style={{ color: C.accent, fontWeight: 600 }}>{cmd}</div>
          <div style={{ color: C.dim }}>{desc}</div>
        </div>
      ))}
    </div>
  );
}

export function StatsView({ snap }: { snap: TxSnapshot }) {
  const total = snap.active;
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIdx = (snap.now.getDay() + 6) % 7; // Mon=0
  const barWidth = 30;
  const tasks = snap.tasks.length ? snap.tasks : snap.lastSessionTasks;
  const ranked = tasks
    .map((t) => ({ name: t.name, secs: taskDuration(t, snap.active) }))
    .filter((x) => x.secs > 0)
    .sort((a, b) => b.secs - a.secs)
    .slice(0, 4);
  const widest = Math.max(1, ...ranked.map((r) => r.secs));

  return (
    <div className="px-1">
      <div className="flex justify-between">
        <span style={{ color: C.text, fontWeight: 600 }}>Last 7 days</span>
        <span className="tabular-nums" style={{ color: C.accent, fontWeight: 600 }}>{fmtTime(total)}</span>
      </div>
      <div style={{ color: C.dim }}>Avg/day  {fmtTime(total / 7)}  ·  Sessions  1</div>
      <div className="h-3" />
      <div className="flex justify-between">
        <span style={{ color: C.text, fontWeight: 600 }}>Last 30 days</span>
        <span className="tabular-nums" style={{ color: C.accent, fontWeight: 600 }}>{fmtTime(total)}</span>
      </div>
      <div style={{ color: C.dim }}>Avg/day  {fmtTime(total / 30)}  ·  Sessions  1</div>
      <Sep />
      {dayNames.map((d, i) => {
        const secs = i === todayIdx ? total : 0;
        const filled = secs > 0 ? Math.max(1, Math.round((secs / (total || 1)) * barWidth)) : 0;
        return (
          <div key={d} className="mt-1 flex justify-between">
            <span className="whitespace-pre">
              <span style={{ color: C.dim }}>{d}</span>
              {"    "}
              <span style={{ color: C.accent }}>{"█".repeat(filled)}</span>
              <span style={{ color: C.dim }}>{"░".repeat(barWidth - filled)}</span>
            </span>
            <span className="tabular-nums" style={{ color: secs ? C.text : C.dim }}>{secs ? fmtTime(secs) : "—"}</span>
          </div>
        );
      })}
      {ranked.length > 0 && (
        <>
          <Sep />
          <div style={{ color: C.text, fontWeight: 600 }}>Longest tasks (30 days)</div>
          {ranked.map((r, i) => (
            <div key={i} className="mt-2">
              <div className="flex justify-between">
                <span className="truncate" style={{ color: C.text }}>{r.name}</span>
                <span className="tabular-nums" style={{ color: C.dim }}>{fmtDuration(r.secs)}</span>
              </div>
              <div className="mt-1 h-[6px] rounded-sm" style={{ background: C.separator }}>
                <div className="h-full rounded-sm" style={{ width: `${(r.secs / widest) * 100}%`, background: C.accent }} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── /project (timex.py _render_project, l.2537) ──────────────────────────────
const DEMO_PROJECTS = ["Corder landing", "One Page", "Internal ops"];
const ACTIVE_PROJECT = "One Page";

export function ProjectView() {
  return (
    <div className="px-1">
      <div style={{ color: C.text, fontWeight: 600 }}>Current: {ACTIVE_PROJECT}</div>
      {DEMO_PROJECTS.map((name, i) => (
        <div key={name}>
          <Sep />
          <div className="flex justify-between">
            <span>
              <span style={{ color: C.accent, fontWeight: 600 }}>{i + 1}.</span>{" "}
              <span style={{ color: C.text }}>{name}</span>
              {name === ACTIVE_PROJECT && <span style={{ color: C.accent }}> •</span>}
            </span>
            <span style={{ color: C.dim }}>{G.idle} IDLE</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── /notification (timex.py _render_notification, l.2273) ────────────────────
const NOTIF_PRESETS = ["10m", "15m", "20m", "30m", "45m", "1h", "2h"];
const NOTIF_CURRENT = "30m";

export function NotificationView() {
  return (
    <div className="px-1">
      <div style={{ color: C.text, fontWeight: 600 }}>Current: every {NOTIF_CURRENT}</div>
      <Sep />
      <div>
        <span style={{ color: C.accent, fontWeight: 600 }}>1.</span> <span style={{ color: C.text }}>Off</span>
      </div>
      {NOTIF_PRESETS.map((label, i) => (
        <div key={label}>
          <Sep />
          <div>
            <span style={{ color: C.accent, fontWeight: 600 }}>{i + 2}.</span>{" "}
            <span style={{ color: C.text }}>Every {label}</span>
            {label === NOTIF_CURRENT && <span style={{ color: C.accent }}> •</span>}
          </div>
        </div>
      ))}
      <div className="mt-2" style={{ color: C.dim }}>{"  "}Or type custom interval (e.g. 25m, 1h30m)</div>
    </div>
  );
}

// ── /date (timex.py _render_dates_list, l.858) ───────────────────────────────
const DEMO_DATES: [string, string, number][] = [
  ["Fri, Jul 17 2026", "8:32:10", 5],
  ["Tue, Jul 14 2026", "6:19:52", 9],
  ["Mon, Jul 07 2026", "3:48:20", 4],
];

export function DatesView() {
  return (
    <div className="px-1">
      {DEMO_DATES.map(([date, total, n], i) => (
        <div key={date}>
          {i > 0 && <Sep />}
          <div className="flex justify-between">
            <span style={{ color: C.text, fontWeight: 600 }}>{i + 1}. {date}</span>
            <span className="tabular-nums" style={{ color: C.accent }}>{total}</span>
          </div>
          <div style={{ color: C.dim }}>{"   "}{n} task{n !== 1 ? "s" : ""}</div>
        </div>
      ))}
      <div className="mt-2" style={{ color: C.dim }}>{"  "}Enter number to view · /back to return</div>
    </div>
  );
}

// ── /edit (timex.py _render_edit, l.2397) ────────────────────────────────────
export function EditView({ snap }: { snap: TxSnapshot }) {
  const tasks = snap.tasks.length ? snap.tasks : snap.lastSessionTasks;
  if (!tasks.length) {
    return <div className="px-1 py-3" style={{ color: C.white }}>{"  "}No tasks to edit yet</div>;
  }
  return (
    <div className="px-1">
      {tasks.map((t, i) => {
        const selected = i === snap.editIndex;
        const current = snap.tasks.length > 0 && i === tasks.length - 1 && t.activeEnd === null;
        return (
          <div key={i}>
            {i > 0 && <Sep />}
            <div className="flex justify-between">
              <span style={{ color: C.dim }}>{fmtStart(t.wallStart)}</span>
              <span className="tabular-nums" style={{ color: C.paused }}>{fmtDuration(taskDuration(t, snap.active))}</span>
            </div>
            {selected ? (
              <div style={{ color: C.accent, fontWeight: 600 }}>{"► "}{t.name}</div>
            ) : (
              <div style={{ color: C.text }}>{"  "}{t.name}</div>
            )}
            {current && null}
          </div>
        );
      })}
    </div>
  );
}

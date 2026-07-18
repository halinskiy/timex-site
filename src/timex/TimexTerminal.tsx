import { useState } from "react";
import { TX } from "./tokens";
import { Panel } from "./Panel";
import { fmtTime, fmtDuration, fmtStart, fmtFooterDate } from "./format";
import { taskDuration, type TxSnapshot, type TxTask } from "./engine";
import type { UseTimexResult } from "./useTimex";
import { ExportView, HelpView, StatsView } from "./views";

const C = TX.color;
const G = TX.glyph;

function StatusLine({ snap }: { snap: TxSnapshot }) {
  const time = fmtTime(snap.active);
  let indicator: string;
  let color: string;
  if (snap.state === "running") {
    indicator = `${G.rec} REC`;
    color = C.accent;
  } else if (snap.state === "paused") {
    indicator = `${G.pause} PAUSED`;
    color = C.paused;
  } else {
    indicator = `${G.idle}  IDLE`;
    color = C.dim;
  }
  return (
    <div className="flex justify-center py-2 font-semibold tracking-tight" style={{ color }}>
      <span className="whitespace-pre">{indicator}</span>
      <span className="whitespace-pre">{"    "}</span>
      <span className="whitespace-pre tabular-nums">{time}</span>
    </div>
  );
}

function TaskRow({ task, active, current, first }: { task: TxTask; active: number; current: boolean; first: boolean }) {
  const dur = fmtDuration(taskDuration(task, active));
  const thinking = task.name.startsWith(G.thinking);
  return (
    <div style={first ? undefined : { borderTop: `1px solid ${C.separator}` }} className={first ? "" : "mt-2 pt-2"}>
      <div className="flex justify-between">
        <span style={{ color: C.dim }}>{fmtStart(task.wallStart)}</span>
        <span className="tabular-nums" style={{ color: current ? C.accent : C.paused, fontWeight: current ? 600 : 400 }}>
          {current ? `${dur} ${G.arrow}` : dur}
        </span>
      </div>
      <div
        style={{
          color: thinking ? C.dim : C.text,
          fontStyle: thinking ? "italic" : "normal",
          fontWeight: current && !thinking ? 600 : 400,
        }}
      >
        {task.name}
      </div>
    </div>
  );
}

function Timeline({ snap }: { snap: TxSnapshot }) {
  const tasks = snap.tasks.length ? snap.tasks : snap.lastSessionTasks;
  if (!tasks.length) {
    const msg =
      snap.state === "running"
        ? "Type what you’re working on"
        : snap.state === "paused"
        ? "Timer paused — /resume to continue"
        : "Type a task name to start";
    return (
      <div className="px-1 py-3" style={{ color: C.white }}>
        {"  " + msg}
      </div>
    );
  }
  const lastIdx = tasks.length - 1;
  return (
    <div className="px-1 py-1">
      {tasks.map((t, i) => (
        <TaskRow
          key={i}
          task={t}
          active={snap.active}
          current={snap.tasks.length > 0 && i === lastIdx && t.activeEnd === null}
          first={i === 0}
        />
      ))}
    </div>
  );
}

function Footer({ snap, hints }: { snap: TxSnapshot; hints: UseTimexResult["hints"] }) {
  let content;
  if (!hints) {
    content = <span style={{ color: C.dim }}>{fmtFooterDate(snap.now)}</span>;
  } else if (hints.noMatch) {
    content = <span style={{ color: C.dim }}>{`no command matches ${snap.input}`}</span>;
  } else {
    const pre = snap.input.length;
    content = (
      <span className="whitespace-pre">
        {hints.matches.map((c, i) => (
          <span key={c}>
            {i > 0 ? "   " : ""}
            <span style={{ color: C.accent }}>{c.slice(0, pre)}</span>
            <span style={{ color: C.text }}>{c.slice(pre)}</span>
          </span>
        ))}
      </span>
    );
  }
  return <div className="flex h-5 items-center justify-center text-center">{content}</div>;
}

function CommandInput({ tx }: { tx: UseTimexResult }) {
  const [focused, setFocused] = useState(false);
  const { snap, suggestion } = tx;
  const ghost =
    suggestion && suggestion.toLowerCase().startsWith(snap.input.toLowerCase()) && snap.input
      ? suggestion.slice(snap.input.length)
      : "";
  return (
    <div
      className="relative rounded-[5px]"
      style={{
        background: C.inputBg,
        border: `2px solid ${focused ? C.accent : C.panelBorder}`,
        transition: "border-color 220ms ease",
      }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center whitespace-pre px-3">
        {snap.input ? (
          <>
            <span style={{ color: C.text }}>{snap.input}</span>
            {ghost && <span style={{ color: C.dim }}>{ghost}</span>}
          </>
        ) : (
          <span style={{ color: C.dim }}>{snap.placeholder}</span>
        )}
      </div>
      <input
        className="relative w-full bg-transparent px-3 py-2 outline-none"
        style={{ color: "transparent", caretColor: C.accent }}
        value={snap.input}
        spellCheck={false}
        autoComplete="off"
        aria-label="Timex command input"
        onChange={(e) => tx.onInputChange(e.target.value)}
        onKeyDown={tx.onKeyDown}
        onFocus={() => {
          setFocused(true);
          tx.markInteract();
        }}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export function TimexTerminal({ tx }: { tx: UseTimexResult }) {
  const { snap } = tx;
  return (
    <div
      className="flex h-full flex-col gap-5 px-3 pb-3 pt-4 text-[13px] leading-[1.5]"
      style={{ background: TX.color.bg, fontFamily: TX.font }}
      onMouseDown={tx.markInteract}
    >
      <Panel title={`${G.clock}  Timex`} titleColor={C.accent} bodyClassName="px-4">
        <StatusLine snap={snap} />
      </Panel>

      <Panel title={snap.viewTitle} titleColor={C.text} className="min-h-0 flex-1 overflow-hidden" bodyClassName="h-full overflow-y-auto px-2 pb-2 pt-3">
        {snap.view === "export" ? (
          <ExportView snap={snap} />
        ) : snap.view === "help" ? (
          <HelpView />
        ) : snap.view === "stats" ? (
          <StatsView snap={snap} />
        ) : (
          <Timeline snap={snap} />
        )}
      </Panel>

      <div className="h-5 px-2 text-center" style={{ color: C.text }}>
        {snap.toast ?? ""}
      </div>

      <CommandInput tx={tx} />
      <Footer snap={snap} hints={tx.hints} />
    </div>
  );
}

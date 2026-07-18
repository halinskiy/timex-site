import type { ReactNode } from "react";
import { Nav } from "./site/Nav";
import { Screen } from "./site/screens";
import { StageWindow } from "./site/StageWindow";
import { TimexWindow } from "./timex/TimexWindow";
import { TimexTerminal } from "./timex/TimexTerminal";
import { useTimex } from "./timex/useTimex";
import { Reveal, SectionHead, DownloadButton, GhostButton, BrowserFrame } from "./site/ui";

const GITHUB = "https://github.com/halinskiy/timex";

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`page-container ${className}`} style={{ paddingBlock: "clamp(96px,12vw,190px)" }}>
      {children}
    </section>
  );
}
const Divider = () => <div className="page-container"><hr className="rule" /></div>;

// Fixed instrument corner marks — the page reads as calibrated equipment.
function Hud() {
  const mark = "pointer-events-none fixed z-40 h-4 w-4";
  const b = "1px solid var(--hair)";
  return (
    <>
      <div className={`${mark} left-3 top-3`} style={{ borderLeft: b, borderTop: b }} />
      <div className={`${mark} right-3 top-3`} style={{ borderRight: b, borderTop: b }} />
      <div className={`${mark} bottom-3 left-3`} style={{ borderLeft: b, borderBottom: b }} />
      <div className={`${mark} bottom-3 right-3`} style={{ borderRight: b, borderBottom: b }} />
    </>
  );
}

function LiveTerminal({ iw = 420, ih = 700 }: { iw?: number; ih?: number }) {
  const tx = useTimex({ autoplay: !new URLSearchParams(window.location.search).has("noauto") });
  return (
    <StageWindow iw={iw} ih={ih}>
      <TimexWindow className="h-full w-full">
        <TimexTerminal tx={tx} />
      </TimexWindow>
    </StageWindow>
  );
}

function StaticStage({ kind, iw = 420, ih = 680 }: { kind: "timeline" | "export" | "stats" | "project"; iw?: number; ih?: number }) {
  return (
    <StageWindow iw={iw} ih={ih}>
      <Screen kind={kind} className="h-full w-full" />
    </StageWindow>
  );
}

export default function App() {
  return (
    <div id="top" style={{ background: "var(--canvas)" }}>
      <Hud />
      <Nav />

      {/* ── 01 · Hero ─────────────────────────────────────────── */}
      <Section className="pt-[124px]">
        <div className="u-grid items-center gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <Reveal><p className="eyebrow">macOS · Keyboard-first · v1.4.3</p></Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-6" style={{ fontSize: "clamp(48px,7vw,104px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
                Type. The hour logs itself.
                <span className="ml-2 inline-block align-[-0.06em]" style={{ width: "0.42em", height: "0.82em", background: "var(--amber)", animation: "caret-blink 1s steps(1) infinite" }} />
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 text-[18px] leading-[1.6]" style={{ color: "var(--body)", maxWidth: "38ch" }}>
                A keyboard-first time tracker that lives in a real terminal window. Name what you're working on and it's logged. When the week is done, hand your client one link.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <DownloadButton />
                <GhostButton>View on GitHub</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="eyebrow mt-9" style={{ letterSpacing: "0.1em" }}>Free · Signed &amp; notarized by Apple · macOS 12+</p>
            </Reveal>
          </div>
          <div className="col-span-12 min-w-0 lg:col-span-7">
            <Reveal delay={0.1}><LiveTerminal /></Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 02 · Interface (window left / copy right) ─────────── */}
      <Section id="interface">
        <div className="u-grid items-center gap-y-16">
          <div className="col-span-12 min-w-0 lg:col-span-6">
            <Reveal><StaticStage kind="timeline" /></Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <SectionHead
              eyebrow="The interface"
              heading={<>Everything is a keystroke.</>}
              subhead="No browser, no Electron. Type a line and the clock runs against that project. Type another and it switches. Everything else is one slash-command away."
            />
            <Reveal delay={0.1}>
              <ul className="mono mt-10 text-[14px]" style={{ color: "var(--body)" }}>
                {[["type a line", "clock starts"], ["type again", "project switches"], ["return", "tucks to the menu bar"], ["/export", "one link for the client"]].map(([a, b]) => (
                  <li key={a} className="flex items-center justify-between border-t py-4" style={{ borderColor: "var(--rule)" }}>
                    <span style={{ color: "var(--amber)" }}>{a}</span>
                    <span style={{ color: "var(--muted)" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 03 · The report — the one light moment ────────────── */}
      <Section id="report">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-8">
            <SectionHead
              eyebrow="The handoff"
              heading={<>Hand over a link, not a spreadsheet.</>}
              subhead="Pick a day, a week, or a month and Timex builds a clean, shareable web page with the full Excel workbook embedded inside it. Send one link. It looks like you spent an afternoon on it. You spent four seconds."
            />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:self-end">
            <Reveal delay={0.1}>
              <a href="https://halinskiy.github.io/timex-reports/r/5ec5c1575234/" target="_blank" rel="noreferrer" className="mono inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] lg:float-right" style={{ border: "1px solid var(--hair)", color: "var(--amber)" }}>
                share.link ↗
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-14"><BrowserFrame /></Reveal>
      </Section>

      <Divider />

      {/* ── 04 · Stats & snapshots (copy left / window right) ─── */}
      <Section id="stats">
        <div className="u-grid items-center gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead
              eyebrow="On the record"
              heading={<>Nothing you tracked slips away.</>}
              subhead="See hours by project, day and week with /stats. Every project is snapshotted as you work, saved to a folder on your own Mac, so a wrong keystroke never costs you an afternoon."
            />
          </div>
          <div className="col-span-12 min-w-0 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}><StaticStage kind="stats" /></Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 05 · Private by design (mono, minimal) ────────────── */}
      <Section id="privacy">
        <div className="u-grid gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHead
              eyebrow="Private by design"
              heading={<>It watches the clock, never you.</>}
              subhead="No account to create, no server to trust. Your history is a set of plain files that never leave your machine. Timex measures time, and nothing else about you."
            />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.1}>
              <ul className="mono text-[15px]" style={{ color: "var(--body)" }}>
                {["No screenshots, ever", "No window snooping, no keystroke logging", "No account, no sign-in, no cloud sync", "Your data stays on your Mac"].map((it) => (
                  <li key={it} className="flex items-center gap-3 border-t py-4" style={{ borderColor: "var(--rule)" }}>
                    <span style={{ color: "var(--amber)" }}>—</span>{it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 06 · Finale ───────────────────────────────────────── */}
      <Section>
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-10">
            <Reveal>
              <h2 className="display" style={{ fontSize: "clamp(44px,6.4vw,108px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                Start keeping honest time.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="subhead" style={{ maxWidth: "52ch" }}>Download Timex, press your shortcut, and type your first line before this page finishes scrolling. When the month closes, you will already have a link ready to send.</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <DownloadButton label="Download for Mac" />
                <GhostButton>View source on GitHub</GhostButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <footer className="page-container flex flex-col items-start justify-between gap-3 border-t py-8 text-[13px] sm:flex-row sm:items-center" style={{ borderColor: "var(--rule)", color: "var(--faint)" }}>
        <span className="mono tracking-[0.14em]" style={{ color: "var(--ink)" }}>TIMEX</span>
        <span className="mono">macOS 12+ · Free · Signed · Notarized</span>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="mono hover:underline">GitHub ↗</a>
      </footer>
    </div>
  );
}

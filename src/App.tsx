import type { ReactNode } from "react";
import { Nav } from "./site/Nav";
import MorphTrack from "./site/MorphTrack";
import { Reveal, SectionHead, DownloadButton, GhostButton, BrowserFrame } from "./site/ui";

const GITHUB = "https://github.com/halinskiy/timex";

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`page-container ${className}`} style={{ paddingBlock: "clamp(96px,12vw,180px)" }}>
      {children}
    </section>
  );
}
const Divider = () => <div className="page-container"><hr className="rule" /></div>;

export default function App() {
  return (
    <div id="top" style={{ background: "var(--bg)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section className="pt-[132px]">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-9">
            <Reveal><p className="eyebrow">macOS · Keyboard-first · v1.4.3</p></Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-6" style={{ fontSize: "clamp(48px,7vw,104px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}>
                Type. The hour logs itself.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 text-[19px] leading-[1.6]" style={{ color: "var(--body)", maxWidth: "44ch" }}>
                A keyboard-first time tracker that lives in a real terminal window on your Mac. Name what you're working on and it's logged. When the week is done, hand your client one link.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <DownloadButton />
                <GhostButton>View on GitHub</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="eyebrow mt-9" style={{ letterSpacing: "0.12em" }}>Free · Signed &amp; notarized by Apple · macOS 12+</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── The morph block: one window travelling the page ──── */}
      <MorphTrack />

      <Divider />

      {/* ── The report (the payoff) ───────────────────────────── */}
      <Section id="report">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-8">
            <SectionHead
              eyebrow="The report"
              heading={<>Hand over a link, not a spreadsheet.</>}
              subhead="The report Timex builds is a real web page: your client opens the hours, the breakdown by project and the totals in the browser, or pulls the raw Excel in a single click. It looks like you spent an afternoon on it."
            />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:self-end">
            <Reveal delay={0.1}>
              <a href="https://halinskiy.github.io/timex-reports/r/5ec5c1575234/" target="_blank" rel="noreferrer" className="mono inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] lg:float-right" style={{ border: "1px solid var(--rule)", color: "var(--ink)" }}>
                open a live report ↗
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-14"><BrowserFrame /></Reveal>
      </Section>

      <Divider />

      {/* ── Privacy (strict, minimal) ─────────────────────────── */}
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
                    <span style={{ color: "var(--muted)" }}>—</span>{it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Finale ────────────────────────────────────────────── */}
      <Section>
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-10">
            <Reveal>
              <h2 className="display" style={{ fontSize: "clamp(44px,6.4vw,104px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
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

      <footer className="page-container flex flex-col items-start justify-between gap-3 border-t py-8 text-[13px] sm:flex-row sm:items-center" style={{ borderColor: "var(--rule)", color: "var(--muted)" }}>
        <span className="mono tracking-[0.14em]" style={{ color: "var(--ink)" }}>TIMEX</span>
        <span className="mono">macOS 12+ · Free · Signed · Notarized</span>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="mono hover:underline">GitHub ↗</a>
      </footer>
    </div>
  );
}

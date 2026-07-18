import type { ReactNode } from "react";
import { Nav } from "./site/Nav";
import { Screen } from "./site/screens";
import { Reveal, SectionHead, DownloadButton, GhostButton, BrowserFrame } from "./site/ui";

const GITHUB = "https://github.com/halinskiy/timex";

function Section({ id, bg = "bg", children }: { id?: string; bg?: "bg" | "surface"; children: ReactNode }) {
  return (
    <section id={id} style={{ background: bg === "surface" ? "var(--surface)" : "var(--bg)" }} className="py-[clamp(88px,10vw,152px)]">
      <div className="page-container">{children}</div>
    </section>
  );
}

const Divider = () => <hr className="section-divider" />;

// A framed Timex window, sized generously so all content is always visible.
function Window({ kind, width = 400, height = 680, className = "" }: { kind: "timeline" | "export" | "stats" | "project"; width?: number; height?: number; className?: string }) {
  return (
    <div className={className} style={{ width, height, maxWidth: "100%", filter: "drop-shadow(0 50px 90px rgba(20,20,15,0.20))" }}>
      <Screen kind={kind} className="h-full w-full" />
    </div>
  );
}

export default function App() {
  return (
    <div id="top" style={{ background: "var(--bg)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section bg="bg">
        <div className="u-grid items-center gap-y-16 pt-24">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <h1 className="display font-semibold" style={{ fontSize: "clamp(44px,6vw,88px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
                Keep time without breaking focus.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 text-[clamp(18px,1.4vw,22px)] leading-[1.55]" style={{ color: "var(--muted)", maxWidth: "36ch" }}>
                A keyboard-first time tracker for macOS. Type what you're working on, and the hour is logged. When the week is done, hand your client a single link.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <DownloadButton />
                <GhostButton>View on GitHub</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-8 text-[15px]" style={{ color: "var(--faint)" }}>Free · Signed &amp; notarized by Apple · macOS 12+</p>
            </Reveal>
          </div>
          <div className="col-span-12 min-w-0 lg:col-span-6">
            <Reveal delay={0.12}>
              <Window kind="timeline" width={410} height={700} className="mx-auto lg:ml-auto lg:mr-0" />
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Interface ─────────────────────────────────────────── */}
      <Section id="interface" bg="surface">
        <div className="u-grid items-center gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead
              heading={<>Everything is a keystroke.</>}
              subhead="Timex is a terminal in a small native window, not a browser, not Electron. Type a line and the clock runs against that project. Type another and it switches. Everything else is one slash-command away."
            />
            <Reveal delay={0.1}>
              <ul className="mt-12">
                {["Type a line, the clock starts", "Type again, Timex switches the project", "Press return, the window tucks away", "Back from the menu bar in milliseconds"].map((it) => (
                  <li key={it} className="border-t py-5 text-[17px]" style={{ borderColor: "var(--border)", color: "var(--ink)" }}>{it}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="col-span-12 min-w-0 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.12}>
              <Window kind="export" width={400} height={660} className="mx-auto lg:ml-auto lg:mr-0" />
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── The report ────────────────────────────────────────── */}
      <Section id="report" bg="bg">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-9">
            <SectionHead
              heading={<>Hand over a link, not a spreadsheet.</>}
              subhead="Pick a day, a week, or a month and Timex builds a clean, shareable web page with the full Excel workbook embedded inside it. Send one link. It looks like you spent an afternoon on it. You spent four seconds."
            />
          </div>
        </div>
        <Reveal delay={0.1} className="mt-16">
          <BrowserFrame />
        </Reveal>
        <div className="u-grid mt-16">
          {["One link, nothing to install or sign into", "The real .xlsx embedded, not stapled to an email", "Grouped by project, with pie and bar breakdowns", "Any range: a day, a sprint, or a whole quarter"].map((it) => (
            <Reveal key={it} className="col-span-12 md:col-span-6 lg:col-span-3">
              <p className="border-t pt-5 text-[16px]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{it}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── How it works ──────────────────────────────────────── */}
      <Section id="how" bg="surface">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-9">
            <SectionHead heading={<>Three keystrokes from idle to invoice.</>} subhead="No onboarding, no setup wizard. Install it, and the same three moves cover a Tuesday afternoon and a month-end handoff." />
          </div>
        </div>
        <div className="u-grid mt-16">
          {[
            { n: "01", t: "Open", d: "Tap your shortcut. The window is already focused and waiting." },
            { n: "02", t: "Type", d: "Write the task as one line. Return starts the clock; another line switches it." },
            { n: "03", t: "Share", d: "Run /export, pick your range, and hand over the link. That is the invoice, ready." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="col-span-12 md:col-span-4">
              <div className="border-t pt-7" style={{ borderColor: "var(--ink)" }}>
                <div className="flex items-baseline gap-4">
                  <span className="display text-[42px] font-semibold" style={{ color: "var(--ink)" }}>{s.n}</span>
                  <span className="text-[20px] font-semibold" style={{ color: "var(--ink)" }}>{s.t}</span>
                </div>
                <p className="mt-4 text-[17px] leading-[1.5]" style={{ color: "var(--muted)", maxWidth: "32ch" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Commands ──────────────────────────────────────────── */}
      <Section id="commands" bg="bg">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-9">
            <SectionHead heading={<>Six commands, one language.</>} subhead="Type a slash and a focused sub-screen slides in on the same dark surface, then snaps back to the clock. Nothing is buried three menus deep, because there are no menus." />
          </div>
        </div>
        <div className="u-grid mt-16">
          {[
            { c: "/export", d: "Build a shareable report for any date range." },
            { c: "/stats", d: "Hours by project, day and week, at a glance." },
            { c: "/project", d: "Create, rename, merge and archive projects." },
            { c: "/edit", d: "Correct any entry, time or session by hand." },
            { c: "/notification", d: "Gentle nudges so a timer never runs overnight." },
            { c: "/help", d: "Every command and shortcut, on one screen." },
          ].map((cmd, i) => (
            <Reveal key={cmd.c} delay={(i % 3) * 0.05} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="border-t pt-8" style={{ borderColor: "var(--border)" }}>
                <span className="font-mono text-[20px] font-medium" style={{ color: "var(--ink)" }}>{cmd.c}</span>
                <p className="mt-4 text-[16px] leading-[1.5]" style={{ color: "var(--muted)", maxWidth: "30ch" }}>{cmd.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Privacy ───────────────────────────────────────────── */}
      <Section id="privacy" bg="surface">
        <div className="u-grid gap-y-14">
          <div className="col-span-12 lg:col-span-6">
            <SectionHead heading={<>It watches the clock, never you.</>} subhead="Most trackers earn their keep by spying: screenshots, keystroke counts, which window is in front. Timex does none of it. No account, no server, your history is a set of plain files that never leave your machine." />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.1}>
              <ul>
                {["No screenshots, ever", "No window snooping, no keystroke logging", "No account, no sign-in, no cloud sync", "Your data stays on your Mac"].map((it) => (
                  <li key={it} className="border-t py-5 text-[18px]" style={{ borderColor: "var(--border-strong)", color: "var(--ink)" }}>{it}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Fine print ────────────────────────────────────────── */}
      <Section id="specs" bg="bg">
        <div className="u-grid gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <SectionHead heading={<>Signed, notarized, and free.</>} subhead="A native macOS app, signed and notarized by Apple, so it opens without a fight. Small, quiet, and free, with the full source on GitHub." />
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:self-end">
            {[
              ["Interface", "Native window, not Electron"],
              ["Distribution", "Signed & notarized by Apple"],
              ["Requires", "macOS 12+ · Apple Silicon & Intel"],
              ["Price", "Free — no account, no trial, no upsell"],
              ["Source", "Open source on GitHub"],
              ["Footprint", "Lives in the menu bar, opens in milliseconds"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.04}>
                <div className="u-grid border-t py-5" style={{ borderColor: "var(--border)" }}>
                  <span className="col-span-4 text-[15px]" style={{ color: "var(--faint)" }}>{k}</span>
                  <span className="col-span-8 text-[18px]" style={{ color: "var(--ink)" }}>{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <Section id="get" bg="surface">
        <div className="u-grid">
          <div className="col-span-12 lg:col-span-10">
            <Reveal>
              <h2 className="display font-semibold" style={{ fontSize: "clamp(40px,5.5vw,92px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
                Start keeping honest time.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="section-subhead">Download Timex, press your shortcut, and type your first line before this page finishes scrolling. When the month closes, you will already have a link ready to send.</p>
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

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="py-10" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="page-container flex flex-col items-start justify-between gap-4 text-[15px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span className="font-display font-semibold" style={{ color: "var(--ink)" }}>Timex</span>
          <span>macOS 12+ · Free · Signed · Notarized</span>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>
        </div>
      </footer>
    </div>
  );
}

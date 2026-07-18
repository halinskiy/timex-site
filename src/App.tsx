import type { ReactNode } from "react";
import { Nav } from "./site/Nav";
import { ScreenRow } from "./site/ScreenRow";
import { Screen } from "./site/screens";
import { Reveal, Eyebrow, Rule, DownloadButton, GhostLink, BrowserFrame } from "./site/ui";

const GITHUB = "https://github.com/halinskiy/timex";

function Section({ id, ground = "paper", children, className = "" }: { id?: string; ground?: "paper" | "snow"; children: ReactNode; className?: string }) {
  return (
    <section
      id={id}
      className={`relative px-6 ${className}`}
      style={{ background: ground === "snow" ? "var(--snow)" : "var(--paper)", paddingTop: "clamp(90px,11vw,168px)", paddingBottom: "clamp(90px,11vw,168px)" }}
    >
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}

function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display font-semibold leading-[1.02] ${className}`} style={{ color: "var(--ink)", fontSize: "clamp(2.1rem,4.6vw,4rem)" }}>
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[19px] leading-[1.62] ${className}`} style={{ color: "var(--graphite)", maxWidth: "62ch" }}>
      {children}
    </p>
  );
}

function MonoList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[16px]" style={{ color: "var(--ink)" }}>
          <span className="mt-[9px] h-px w-4 shrink-0" style={{ background: "var(--mist)" }} />
          <span style={{ color: "var(--graphite)" }}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <div id="top" style={{ background: "var(--paper)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[94vh] items-center overflow-hidden px-6 pt-28">
        <div className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block" style={{ left: "55vw", width: "62vw" }}>
          <ScreenRow />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div className="max-w-[40rem]">
            <Reveal><Eyebrow>For macOS · Keyboard-first</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display font-semibold leading-[1.0]" style={{ color: "var(--ink)", fontSize: "clamp(2.8rem,6.2vw,5.4rem)", letterSpacing: "-0.03em" }}>
                Keep time without breaking focus.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 text-[19px] leading-[1.6]" style={{ color: "var(--graphite)", maxWidth: "40ch" }}>
                Timex lives in your menu bar and opens in a keystroke. Type what you're working on, press return, and the hour is logged. No timer to babysit, no forms, no browser tab. When the week is done, hand your client a single link.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <DownloadButton />
                <GhostLink>GitHub</GhostLink>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-8 font-mono-label text-[11px]" style={{ color: "var(--mist)" }}>Signed &amp; notarized · macOS 12+ · free</p>
            </Reveal>
          </div>
          {/* mobile screen row */}
          <div className="mt-14 overflow-hidden lg:hidden" style={{ marginRight: "-1.5rem" }}>
            <ScreenRow />
          </div>
        </div>
      </section>

      {/* ── 01 Philosophy ─────────────────────────────────────── */}
      <Section id="why" ground="paper" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-[6vw] top-2 select-none font-display font-semibold leading-none" style={{ color: "var(--hairline)", fontSize: "clamp(7rem,20vw,17rem)" }}>
          Timex
        </div>
        <div className="relative">
          <Rule className="mb-12 w-full" />
          <Reveal><Eyebrow>(01) Why Timex</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <Heading className="mt-5 max-w-[16ch]">A tracker should cost you seconds, not attention.</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <Body className="mt-8">
              Most time trackers make you stop working to prove you were working: timers you forget to start, dashboards you tidy up on a Friday, a browser tab that quietly grows a to-do list of its own. Timex takes the opposite view. The log should be faster than the thought behind it. You open it, type a line, and you're already back to work.
            </Body>
          </Reveal>
        </div>
      </Section>

      {/* ── 02 Interface ──────────────────────────────────────── */}
      <Section id="interface" ground="snow">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <Reveal><Eyebrow>(02) The interface</Eyebrow></Reveal>
            <Reveal delay={0.06}><Heading className="mt-5">Everything is a keystroke.</Heading></Reveal>
            <Reveal delay={0.12}>
              <Body className="mt-8">
                Timex is a terminal in a small native window, not a browser, not Electron, and it drops out of the menu bar in milliseconds. Type a line like <span className="font-mono text-[16px]" style={{ color: "var(--ink)" }}>Acme: landing hero</span> and the clock is running against that project. Type another and it switches. Everything else is one slash-command away, so your hands never leave the keys and your head never leaves the work.
              </Body>
            </Reveal>
            <Reveal delay={0.16}>
              <MonoList items={["Type a line, the clock starts", "Type again, Timex switches the project", "Press return, the window tucks itself away", "Shortcut from the menu bar, back in milliseconds"]} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="justify-self-center lg:justify-self-end">
            <div style={{ width: 320, filter: "drop-shadow(0 40px 70px rgba(23,25,27,0.22))" }}>
              <Screen kind="timeline" className="h-[512px] w-full" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 03 The handoff (report) ───────────────────────────── */}
      <Section id="report" ground="paper">
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal><Eyebrow>(03) The handoff</Eyebrow></Reveal>
          <Reveal delay={0.06}><Heading className="mx-auto mt-5">Hand over a link, not a spreadsheet.</Heading></Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 text-[19px] leading-[1.62]" style={{ color: "var(--graphite)" }}>
              Pick a day, a week, or a month and Timex builds a clean, self-contained report: a shareable web page with the full Excel workbook embedded right inside it. Send one link. It looks like you spent an afternoon on it. You spent four seconds.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative mx-auto mt-16 max-w-[960px]">
          <BrowserFrame />
          <div className="absolute -bottom-10 -left-6 hidden w-[210px] sm:block" style={{ filter: "drop-shadow(0 30px 50px rgba(23,25,27,0.28))" }}>
            <Screen kind="export" className="h-[336px] w-full" title="Timex" />
          </div>
          <div className="absolute -bottom-4 left-52 hidden font-mono-label text-[10px] sm:block" style={{ color: "var(--mist)" }}>
            REPORT.URL → CLIENT
          </div>
        </Reveal>
        <div className="mx-auto mt-24 grid max-w-[900px] gap-x-12 gap-y-6 sm:grid-cols-2">
          {["One link, nothing for them to install or sign into", "The real .xlsx embedded in the page, not stapled to an email", "Grouped by project, with pie and bar breakdowns", "Any range: /export a day, a sprint, or a whole quarter"].map((it, i) => (
            <Reveal key={it} delay={i * 0.04}>
              <div className="flex gap-3 border-t pt-5 text-[16px]" style={{ borderColor: "var(--hairline)", color: "var(--graphite)" }}>
                <span className="font-mono text-[13px]" style={{ color: "var(--mist)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{it}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 04 How it works ───────────────────────────────────── */}
      <Section id="how" ground="snow">
        <Reveal><Eyebrow>(04) How it works</Eyebrow></Reveal>
        <Reveal delay={0.06}><Heading className="mt-5 max-w-[18ch]">Three keystrokes from idle to invoice.</Heading></Reveal>
        <Reveal delay={0.12}><Body className="mt-8">There's no onboarding and no setup wizard. Install it, and the loop is immediate: the same three moves cover a Tuesday afternoon and a month-end handoff.</Body></Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {[
            { n: "01", k: "timeline" as const, t: "Open", d: "Tap your shortcut. The window is already focused and blinking amber." },
            { n: "02", k: "timeline" as const, t: "Type", d: "Write the task as one line. Return starts the clock; another line switches it." },
            { n: "03", k: "export" as const, t: "Share", d: "Run /export, pick your range, and hand over the link. That's the invoice, ready." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[54px] font-semibold leading-none" style={{ color: "var(--ink)" }}>{s.n}</span>
                  <span className="font-mono-label text-[11px]" style={{ color: "var(--mist)" }}>{s.t}</span>
                </div>
                <p className="mt-4 text-[16px] leading-[1.55]" style={{ color: "var(--graphite)", maxWidth: "34ch" }}>{s.d}</p>
                <div className="mx-auto mt-8" style={{ width: 240, filter: "drop-shadow(0 26px 44px rgba(23,25,27,0.18))" }}>
                  <Screen kind={s.k} className="h-[384px] w-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 05 Commands ───────────────────────────────────────── */}
      <Section id="commands" ground="paper">
        <div className="max-w-[640px]">
          <Reveal><Eyebrow>(05) Slash commands</Eyebrow></Reveal>
          <Reveal delay={0.06}><Heading className="mt-5">Six commands, one language.</Heading></Reveal>
          <Reveal delay={0.12}><Body className="mt-8">Every part of Timex speaks the same terse, legible dialect. Type a slash and a focused sub-screen slides in on the same dark surface, then snaps back to the clock. Nothing is buried three menus deep, because there are no menus.</Body></Reveal>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--hairline)", border: "1px solid var(--hairline)" }}>
          {[
            { c: "/export", i: "01", d: "Build a shareable report for any date range." },
            { c: "/stats", i: "02", d: "Hours by project, day and week, at a glance." },
            { c: "/project", i: "03", d: "Create, rename, merge and archive projects." },
            { c: "/edit", i: "04", d: "Correct any entry, time or session by hand." },
            { c: "/notification", i: "05", d: "Gentle nudges so a timer never runs overnight." },
            { c: "/help", i: "06", d: "Every command and shortcut, on one screen." },
          ].map((cmd, i) => (
            <Reveal key={cmd.c} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col justify-between p-7" style={{ background: "var(--snow)" }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[16px] font-medium" style={{ color: "var(--ink)" }}>{cmd.c}</span>
                  <span className="font-mono-label text-[11px]" style={{ color: "var(--mist)" }}>{cmd.i}</span>
                </div>
                <p className="mt-10 text-[15px] leading-[1.5]" style={{ color: "var(--graphite)" }}>{cmd.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 06 Safety net ─────────────────────────────────────── */}
      <Section id="snapshots" ground="snow">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>(06) Safety net</Eyebrow></Reveal>
            <Reveal delay={0.06}><Heading className="mt-5 max-w-[16ch]">A wrong keystroke never costs you hours.</Heading></Reveal>
            <Reveal delay={0.12}><Body className="mt-8">Timex quietly snapshots every project as you work, so the record behind you is always intact. Fat-finger a delete, rename the wrong task, close it in a hurry: the earlier version is still there, saved to a backups folder on your own Mac. Roll a project back to any earlier state and pick up exactly where it stood.</Body></Reveal>
            <Reveal delay={0.16}><MonoList items={["Automatic snapshots, no button to remember", "Every project versioned as you go", "Restore by putting a folder back into place", "Local files you actually own"]} /></Reveal>
          </div>
          <Reveal delay={0.1} className="justify-self-center">
            <div className="relative" style={{ width: 340, height: 420 }}>
              <div className="absolute left-10 top-0 w-[280px] opacity-40" style={{ filter: "grayscale(0.2)" }}>
                <Screen kind="timeline" className="h-[380px] w-full" />
              </div>
              <div className="absolute left-5 top-5 w-[280px] opacity-70">
                <Screen kind="timeline" className="h-[380px] w-full" />
              </div>
              <div className="absolute left-0 top-10 w-[280px]" style={{ filter: "drop-shadow(0 34px 56px rgba(23,25,27,0.24))" }}>
                <Screen kind="timeline" className="h-[380px] w-full" />
              </div>
              <div className="absolute -right-2 top-2 font-mono-label text-[10px]" style={{ color: "var(--mist)" }}>RESTORE · 14:20</div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 07 Privacy ────────────────────────────────────────── */}
      <Section id="privacy" ground="paper">
        <div className="mx-auto max-w-[680px] text-center">
          <Reveal><Eyebrow>(07) Privacy</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <Heading className="mx-auto mt-5">It watches the clock,<br />never <span style={{ boxShadow: "inset 0 0 0 1.5px var(--ink)", padding: "0 0.2em", borderRadius: 2 }}>you</span>.</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 text-[19px] leading-[1.62]" style={{ color: "var(--graphite)" }}>
              Most trackers earn their keep by spying: screenshots, keystroke counts, which window is in front. Timex does none of it. No account to create, no server to trust, your history is a set of plain files that never leave your machine. Privacy here isn't a setting you switch on; it's simply how the app is built.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mx-auto mt-10 inline-flex flex-col items-start gap-3">
              {["No screenshots, ever", "No window snooping, no keystroke logging", "No account, no sign-in, no surprise cloud sync", "Your data stays on your Mac"].map((it) => (
                <li key={it} className="flex items-center gap-3 font-mono text-[14px]" style={{ color: "var(--graphite)" }}>
                  <span style={{ color: "var(--mist)" }}>✓</span>{it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ── 08 Fine print ─────────────────────────────────────── */}
      <Section id="specs" ground="snow">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>(08) The fine print</Eyebrow></Reveal>
            <Reveal delay={0.06}><Heading className="mt-5">Signed, notarized, and free.</Heading></Reveal>
            <Reveal delay={0.12}><Body className="mt-8">A native macOS app, signed and notarized by Apple, so it opens without a fight on a clean install. Small, quiet, and free, with the full source on GitHub if you want to read every line before you trust it with your hours.</Body></Reveal>
          </div>
          <div className="self-end">
            {[
              ["Interface", "Native window, not Electron"],
              ["Distribution", "Signed & notarized by Apple"],
              ["Requires", "macOS 12+ · Apple Silicon & Intel"],
              ["Price", "Free, no account, no trial, no upsell"],
              ["Source", "Open source on GitHub"],
              ["Footprint", "Lives in the menu bar, opens in milliseconds"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.04}>
                <div className="grid grid-cols-[130px_1fr] gap-4 border-t py-4" style={{ borderColor: "var(--hairline)" }}>
                  <span className="font-mono-label text-[11px]" style={{ color: "var(--mist)" }}>{k}</span>
                  <span className="text-[16px]" style={{ color: "var(--ink)" }}>{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 09 CTA ────────────────────────────────────────────── */}
      <Section id="get" ground="paper" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-[6vw] bottom-0 select-none font-display font-semibold leading-none" style={{ color: "var(--hairline)", fontSize: "clamp(7rem,20vw,17rem)" }}>
          Timex
        </div>
        <div className="relative">
          <Rule className="mb-12 w-full" />
          <Reveal><Eyebrow>(09) Get Timex</Eyebrow></Reveal>
          <Reveal delay={0.06}><Heading className="mt-5 max-w-[14ch]">Start keeping honest time.</Heading></Reveal>
          <Reveal delay={0.12}>
            <Body className="mt-8">Download Timex, press your shortcut, and type your first line before this page finishes scrolling. When the month closes, you'll already have a link ready to send instead of a spreadsheet to build.</Body>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <DownloadButton label="Download for Mac" />
              <GhostLink>View source on GitHub</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="px-6 py-8" style={{ background: "var(--snow)", borderTop: "1px solid var(--hairline)" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 font-mono-label text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--mist)" }}>
          <span style={{ color: "var(--ink)" }}>Timex</span>
          <span>macOS 12+ · Free · Signed · Notarized</span>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:underline">Source ↗</a>
        </div>
      </footer>
    </div>
  );
}

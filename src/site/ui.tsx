import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ReportFrame } from "./ReportFrame";

const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";
const EASE = [0.22, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ heading, subhead }: { heading: ReactNode; subhead?: ReactNode }) {
  return (
    <Reveal>
      <h2 className="section-heading">{heading}</h2>
      {subhead && <p className="section-subhead">{subhead}</p>}
    </Reveal>
  );
}

function AppleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 2.98-.75.84-1.98 1.49-3.02 1.41-.13-1.13.44-2.31 1.09-3.05.73-.83 2.02-1.45 3.04-1.34ZM20.6 17.02c-.55 1.27-.82 1.84-1.53 2.96-1 1.56-2.4 3.51-4.14 3.52-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.78-4.07-3.34C-.13 17.7-.42 12.6 1.32 9.95c1.06-1.62 2.74-2.57 4.32-2.57 1.6 0 2.6 1.02 3.92 1.02 1.28 0 2.06-1.02 3.91-1.02 1.4 0 2.88.76 3.94 2.08-3.46 1.9-2.9 6.84.19 8.56Z" />
    </svg>
  );
}

export function DownloadButton({ label = "Download for Mac" }: { label?: string }) {
  return (
    <a
      href={DOWNLOAD}
      className="inline-flex h-[54px] items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: "var(--amber)", color: "var(--amber-ink)" }}
    >
      <AppleMark size={18} />
      {label}
    </a>
  );
}

export function GhostButton({ href = GITHUB, children = <>View on GitHub</> }: { href?: string; children?: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      className="inline-flex h-[54px] items-center gap-2 rounded-full px-8 text-[16px] font-medium transition-colors duration-200"
      style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--ink)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </a>
  );
}

// Light macOS browser chrome around the real report — proof it's a web page.
export function BrowserFrame({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[12px] ${className}`}
      style={{ background: "#ffffff", border: "1px solid var(--border)", boxShadow: "0 50px 90px -40px rgba(20,20,15,0.28)" }}
    >
      <div className="flex h-12 items-center gap-3 px-4" style={{ background: "#f3f3f1", borderBottom: "1px solid var(--border)" }}>
        <div className="flex gap-2">
          <span className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="size-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="size-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex h-8 max-w-[420px] flex-1 items-center gap-2 rounded-md px-3 text-[13px]" style={{ background: "#ffffff", border: "1px solid var(--border)", color: "var(--muted)" }}>
          <span style={{ color: "var(--faint)" }}>🔒</span>
          halinskiy.github.io/timex-reports/r/…
        </div>
      </div>
      <div style={{ height: 560 }}>
        <ReportFrame />
      </div>
    </div>
  );
}

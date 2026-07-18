import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ReportFrame } from "./ReportFrame";

const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";
const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, className = "", y = 14 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono-label text-[11px] ${className}`} style={{ color: "var(--mist)" }}>
      {children}
    </span>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ height: 1, background: "var(--hairline)", transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
    />
  );
}

export function AppleMark({ size = 18 }: { size?: number }) {
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
      className="group inline-flex h-[52px] items-center gap-2.5 rounded-full px-7 text-[16px] font-medium transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <AppleMark size={18} />
      {label}
    </a>
  );
}

export function GhostLink({ href = GITHUB, children = <>GitHub</> }: { href?: string; children?: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group inline-flex h-[52px] items-center gap-1.5 text-[16px] font-medium"
      style={{ color: "var(--ink)" }}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </a>
  );
}

// Light macOS browser chrome around the shared report page — the proof it's a
// real web page, not a dark screenshot.
export function BrowserFrame({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] ${className}`}
      style={{ background: "#ffffff", border: "1px solid var(--hairline)", boxShadow: "0 40px 80px -32px rgba(23,25,27,0.22)" }}
    >
      <div className="flex h-11 items-center gap-3 px-4" style={{ background: "#f3f4f3", borderBottom: "1px solid var(--hairline)" }}>
        <div className="flex gap-2">
          <span className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="size-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="size-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md px-3 font-mono text-[12px]" style={{ background: "#ffffff", border: "1px solid var(--hairline)", color: "var(--graphite)" }}>
          <span style={{ color: "var(--mist)" }}>🔒</span>
          halinskiy.github.io/timex-reports/r/…
        </div>
      </div>
      <div style={{ height: 520 }}>
        <ReportFrame />
      </div>
    </div>
  );
}

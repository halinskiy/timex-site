import { useEffect, useState } from "react";

const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";

const LINKS = [
  { label: "Interface", href: "#interface" },
  { label: "Report", href: "#report" },
  { label: "Privacy", href: "#privacy" },
];

function Clock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return <span className="tnum">{`${p(t.getHours())}:${p(t.getMinutes())}:${p(t.getSeconds())}`}</span>;
}

function AppleMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 2.98-.75.84-1.98 1.49-3.02 1.41-.13-1.13.44-2.31 1.09-3.05.73-.83 2.02-1.45 3.04-1.34ZM20.6 17.02c-.55 1.27-.82 1.84-1.53 2.96-1 1.56-2.4 3.51-4.14 3.52-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.78-4.07-3.34C-.13 17.7-.42 12.6 1.32 9.95c1.06-1.62 2.74-2.57 4.32-2.57 1.6 0 2.6 1.02 3.92 1.02 1.28 0 2.06-1.02 3.91-1.02 1.4 0 2.88.76 3.94 2.08-3.46 1.9-2.9 6.84.19 8.56Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: 56, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid var(--hair)" }}
    >
      <div className="page-container flex h-full items-center justify-between">
        <a href="#top" className="mono text-[14px] font-medium tracking-[0.14em]" style={{ color: "var(--ink)" }}>TIMEX</a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[14px] transition-colors" style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>{l.label}</a>
          ))}
          <a href={GITHUB} target="_blank" rel="noreferrer" className="text-[14px] transition-colors" style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>GitHub</a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="mono hidden text-[13px] lg:inline" style={{ color: "var(--faint)" }}><Clock /></span>
          <span className="mono hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] lg:inline-flex" style={{ color: "var(--muted)" }}>
            <span className="inline-block size-1.5 rounded-full" style={{ background: "var(--amber)" }} />menu bar
          </span>
          <a href={DOWNLOAD} className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-semibold" style={{ background: "var(--ink)", color: "var(--bg)" }}>
            <AppleMark size={15} /><span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>
    </header>
  );
}

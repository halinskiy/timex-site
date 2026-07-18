import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;
const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";

const LINKS = [
  { label: "Interface", href: "#interface" },
  { label: "The report", href: "#report" },
  { label: "Commands", href: "#commands" },
  { label: "Privacy", href: "#privacy" },
];

function AppleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 2.98-.75.84-1.98 1.49-3.02 1.41-.13-1.13.44-2.31 1.09-3.05.73-.83 2.02-1.45 3.04-1.34ZM20.6 17.02c-.55 1.27-.82 1.84-1.53 2.96-1 1.56-2.4 3.51-4.14 3.52-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.78-4.07-3.34C-.13 17.7-.42 12.6 1.32 9.95c1.06-1.62 2.74-2.57 4.32-2.57 1.6 0 2.6 1.02 3.92 1.02 1.28 0 2.06-1.02 3.91-1.02 1.4 0 2.88.76 3.94 2.08-3.46 1.9-2.9 6.84.19 8.56Z" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className="pointer-events-auto flex w-full items-center justify-between gap-2 rounded-full pl-4 pr-2 md:w-auto"
        style={{
          height: 56,
          backgroundColor: scrolled ? "rgba(251,252,251,0.88)" : "rgba(251,252,251,0.72)",
          border: "1px solid rgba(23,25,27,0.08)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          boxShadow: scrolled ? "0 8px 26px rgba(23,25,27,0.09)" : "0 4px 14px rgba(23,25,27,0.05)",
          transition: "background-color 220ms cubic-bezier(.16,1,.3,1), box-shadow 220ms cubic-bezier(.16,1,.3,1)",
        }}
      >
        <a href="#top" aria-label="Timex, home" className="inline-flex items-center gap-2.5">
          <img src={`${BASE}timex-logo.svg`} alt="" width={28} height={28} className="rounded-[8px]" />
          <span className="font-display text-[18px] font-semibold" style={{ color: "var(--ink)" }}>Timex</span>
        </a>

        <span aria-hidden className="mx-2 hidden h-5 w-px md:block" style={{ backgroundColor: "rgba(23,25,27,0.1)" }} />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium transition-colors"
              style={{ color: "var(--graphite)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--graphite)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="ml-1 hidden items-center rounded-full px-3 py-2 text-[15px] font-medium transition-colors md:inline-flex"
          style={{ color: "var(--graphite)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--graphite)")}
        >
          GitHub
        </a>

        <a
          href={DOWNLOAD}
          className="ml-2 inline-flex h-10 items-center gap-2 rounded-full pl-3.5 pr-5 text-[15px] font-medium"
          style={{
            backgroundColor: scrolled ? "var(--ink)" : "transparent",
            color: scrolled ? "var(--paper)" : "var(--ink)",
            border: scrolled ? "1px solid var(--ink)" : "1px solid rgba(23,25,27,0.18)",
            transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
          }}
        >
          <AppleMark size={17} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>
    </header>
  );
}

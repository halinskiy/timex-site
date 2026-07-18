import { Navbar1 } from "@/components/sections/Navbar1";
import { Header1 } from "@/components/sections/Header1";
import { Layout303 } from "@/components/sections/Layout303";
import { Layout4 } from "@/components/sections/Layout4";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

const DOWNLOAD = "https://github.com/halinskiy/timex/releases/latest/download/Timex.dmg";
const GITHUB = "https://github.com/halinskiy/timex";
const BASE = import.meta.env.BASE_URL;

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

function Wordmark() {
  return (
    <a href={BASE} className="flex items-center gap-2.5">
      <img src={`${BASE}timex-logo.svg`} alt="" className="size-8 rounded-[9px]" />
      <span className="font-sans text-xl font-semibold tracking-tight text-scheme-text">Timex</span>
    </a>
  );
}

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),
    heading: "A terminal, in a native window",
    description:
      "A keyboard-driven interface in a real macOS window, not Electron and not a browser tab. It lives in the menu bar and opens in milliseconds.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
    heading: "A report a client can read",
    description:
      "Turn a day, a week or a month into one clean page: a summary, the longest tasks, hours per day. The Excel workbook rides along inside it.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    heading: "It never loses your hours",
    description:
      "Every project is snapshotted automatically, before anything that could erase it. A wrong keystroke is always recoverable.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    ),
    heading: "Nothing watches your screen",
    description:
      "Timex tracks the tasks you type, and only those. No screenshots, no window snooping, no account. Your data stays on your Mac.",
  },
];

export default function App() {
  return (
    <div className="bg-scheme-background text-scheme-text antialiased">
      <Navbar1
        logo={<Wordmark />}
        navLinks={[
          { title: "Features", url: "#features" },
          { title: "Report", url: "#report" },
          { title: "Source", url: GITHUB },
        ]}
        buttons={[
          { title: "Download", variant: "amber", size: "sm", href: DOWNLOAD, iconLeft: <DownloadIcon /> },
        ]}
      />

      <Header1
        eyebrow="Time tracker · macOS"
        heading="Track hours. Hand a client a report they can read."
        description="A minimal, keyboard-driven time tracker that lives in your menu bar, and turns a week of work into one link you can send."
        note="Signed & notarized · macOS 12+ · Apple Silicon & Intel"
        buttons={[
          { title: "Download for Mac", variant: "amber", href: DOWNLOAD, iconLeft: <DownloadIcon /> },
          { title: "Source on GitHub", variant: "secondary", href: GITHUB, target: "_blank", rel: "noreferrer" },
        ]}
        image={{
          src: `${BASE}app-window.png`,
          alt: "The Timex window: a dark terminal timer running, with a timeline of tracked tasks.",
        }}
      />

      <div id="features">
        <Layout303
          eyebrow="Why Timex"
          heading="A tracker that respects your time, and your privacy."
          sections={FEATURES}
        />
      </div>

      <div id="report">
        <Layout4
          tagline="The report"
          heading="Send a link, not a spreadsheet"
          description="One self-contained page: total tracked, the tasks that took the most time, hours per day. It opens offline, carries the Excel workbook inside it, and follows the reader's light or dark theme."
          subHeadings={[
            { title: "Any period", description: "A day, a week, a month or a custom range, chosen at export." },
            { title: "One file", description: "The Excel workbook is embedded, so a single link does both jobs." },
          ]}
          buttons={[{ title: "Get Timex", variant: "amber", href: DOWNLOAD, iconLeft: <DownloadIcon /> }]}
          image={{
            src: `${BASE}report.png`,
            alt: "A Timex report: summary tiles, the longest tasks as bars, and a full task table.",
          }}
          imageLeft
        />
      </div>

      <Cta
        heading="Your hours, finally worth showing."
        buttons={[{ title: "Download Timex", variant: "amber", href: DOWNLOAD, iconLeft: <DownloadIcon /> }]}
        note="Free · open source · signed & notarized by Apple"
      />

      <Footer
        logo={<Wordmark />}
        tagline="A time tracker for macOS that turns your hours into a report worth sending. Built by 3mpq."
        links={[
          { title: "Download", url: DOWNLOAD },
          { title: "GitHub", url: GITHUB },
          { title: "3mpq.studio", url: "https://halinskiy.github.io/3mpq-studio/" },
        ]}
        legal="© 2026 Timex · by 3mpq"
      />
    </div>
  );
}

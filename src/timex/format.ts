// Duration/clock formatters — ported 1:1 from timex.py.
// Source refs: TimexApp._fmt_time (l.604), TaskEntry.format_duration (l.117),
//              TaskEntry.format_start (l.127).

export function fmtTime(seconds: number): string {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(sec)}`;
}

export function fmtDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p2 = (n: number) => String(n).padStart(2, "0");
  if (h > 0) return `${h}h ${p2(m)}m ${p2(sec)}s`;
  if (m > 0) return `${m}m ${p2(sec)}s`;
  return `${sec}s`;
}

export function fmtStart(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

// Footer date: "Sat, Jul 18 2026"  (timex.py l.1093, "%a, %b %d %Y")
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtFooterDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${WD[d.getDay()]}, ${MO[d.getMonth()]} ${p(d.getDate())} ${d.getFullYear()}`;
}

import type { ReactNode } from "react";
import { TX } from "./tokens";

// macOS window chrome (traffic lights + centred title) around the terminal.
export function TimexWindow({
  children,
  title = "Timex",
  className = "",
  style,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[11px] ${className}`}
      style={{
        background: TX.color.bg,
        border: "1px solid #2a2a2a",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02)",
        ...style,
      }}
    >
      <div
        className="relative flex h-9 shrink-0 items-center px-4"
        style={{ background: "#202020", borderBottom: "1px solid #2a2a2a" }}
      >
        <div className="flex gap-2">
          <span className="size-3 rounded-full" style={{ background: "#ff5f57", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
          <span className="size-3 rounded-full" style={{ background: "#febc2e", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
          <span className="size-3 rounded-full" style={{ background: "#28c840", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
        </div>
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium"
          style={{ color: "#8a8a8a", fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {title}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

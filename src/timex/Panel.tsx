import type { ReactNode } from "react";
import { TX } from "./tokens";

// A Textual "round" panel: 1px rounded border with the title sitting centred
// on the top edge, the border visually broken behind it.
export function Panel({
  title,
  titleColor = TX.color.text,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: ReactNode;
  titleColor?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`relative rounded-[7px] border ${className}`}
      style={{ borderColor: TX.color.panelBorder }}
    >
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2 text-[0.92em] font-semibold"
        style={{ background: TX.color.bg, color: titleColor }}
      >
        {title}
      </span>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

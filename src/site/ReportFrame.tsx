import { useMemo } from "react";
import { buildReportHtml, SAMPLE_REPORT, type ReportData } from "../timex/report";

// The Timex report, rendered by its own markup/CSS/JS inside an isolated iframe
// so it is byte-for-byte what a client receives, and its styles never leak.
export function ReportFrame({ data = SAMPLE_REPORT, className = "" }: { data?: ReportData; className?: string }) {
  const html = useMemo(() => buildReportHtml(data), [data]);
  return (
    <iframe
      title="Timex report"
      srcDoc={html}
      className={className}
      style={{ border: 0, width: "100%", height: "100%", display: "block", background: "#eeece5" }}
      scrolling="no"
    />
  );
}

# Keeping the Timex replica in sync

The site redraws Timex in code (not screenshots), so when the real app changes,
these components must be re-synced by hand. This maps each replicated piece to
its source of truth in the app.

**Source of truth:** `/Applications/Timex.app/Contents/Resources/timex.py`
and `.../templates/app_index.html`. There is no separate repo; the bundle is the source.

## The terminal window (`src/timex/`)

| Replica file | What it mirrors | Source (timex.py) |
|---|---|---|
| `tokens.ts` | colors, glyphs, terminal font | `TimexApp.CSS` (~l.325), Constants (l.55-65), `app_index.html` (`Roboto Mono`, bg `#171717`) |
| `format.ts` | `HH:MM:SS`, durations, start time, footer date | `_fmt_time` (l.604), `TaskEntry.format_duration` (l.117), `format_start` (l.127), footer date (l.1093) |
| `engine.ts` | states, commands, suggester, submit/resolve | `STATE_COMMANDS` (l.133), `CommandSuggester` (l.140), `_on_submit` (l.1128), `_cmd_*` |
| `TimexTerminal.tsx` | timer line, timeline rows, input, footer hints | `_render_timer` (l.694), `_render_history`/`_render_tasks` (l.754/825), `_command_hints` (l.1098) |
| `TimexWindow.tsx` | macOS window chrome | native window (traffic lights + "Timex" title) |
| `useTimex.ts` | autonomous demo + interrupt/resume | not in the app; site-only demo driver |

**Colors (must match `timex.py` constants):** bg `#171717`, accent `#e8a55d`,
DIM `#555555`, DIMMER `#333333`, SEPARATOR `#222222`, TEXT `#d4d4d4`, input bg `#1e1e1e`.

**Not yet replicated (sub-views):** `/export`, `/stats`, `/help`, `/project`,
`/date`, `/edit`. When adding them, port `_render_export` (l.1463), `_render_stats`
(l.2862), `_render_help` (l.2213), `_render_project` (l.2508), `_render_dates_list`
(l.858), `_render_edit` (l.2368).

## The report (`src/timex/report.ts`)

`buildReportHtml()` ports the app's report markup, CSS and JS **verbatim** so the
page on the site is identical to what a client receives.

| Replica piece | Source (timex.py) |
|---|---|
| `REPORT_CSS` | `_REPORT_CSS` (l.1642) — black & white, forced light |
| `REPORT_JS` | `_REPORT_JS` (l.1721) — entrance animation, tile/bar reveal, hero count-up |
| `buildReportHtml` markup | `_report_html` (l.1917) |
| tiles / longest / days / rows data shape | `_report_html` tiles (l.1961), top tasks, `_export_by_day`, detail rows |

**When the report changes in the app:** copy the new `_REPORT_CSS` / `_REPORT_JS`
strings into `report.ts` and reconcile the markup in `buildReportHtml`. The sample
data in `SAMPLE_REPORT` is illustrative only.

## Shipped app version replicated against

Timex **1.4.1** (report is B&W/forced-light; `/export` → "Share a link" opens the
live URL instead of copying).

import { Line } from "./Line.jsx";

/**
 * The small numbered section label used throughout the site,
 * e.g. "01 / SELECTED WORK".
 */
export function SectionLabel({ index, label, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-xs tracking-widest2 text-accent font-tabular">
        {index}
      </span>
      <Line orientation="horizontal" animate={false} className="w-8 opacity-70" />
      <span className="text-xs uppercase tracking-widest2 text-muted">
        {label}
      </span>
    </div>
  );
}

/**
 * A small explicit status readout for admin save/delete actions — never
 * fail silently. status: "idle" | "saving" | "saved" | "error".
 */
export function SaveStatus({ status, error }) {
  if (status === "saving") return <span className="text-xs text-muted">Saving…</span>;
  if (status === "saved") return <span className="text-xs text-accent">Saved</span>;
  if (status === "error") {
    return <span className="text-xs text-red-400">Error{error ? `: ${error}` : ""}</span>;
  }
  return null;
}

export function AdminButton({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-accent text-bg hover:bg-accent/90",
    ghost: "border border-line/60 text-ink hover:border-accent/60",
    danger: "border border-red-900/60 text-red-400 hover:border-red-500",
  };
  return (
    <button
      type="button"
      className={`rounded px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

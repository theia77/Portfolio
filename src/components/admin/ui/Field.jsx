export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted/70">{hint}</span>}
    </label>
  );
}

const baseInput =
  "w-full rounded border border-line/60 bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent";

export function TextInput(props) {
  return <input {...props} className={`${baseInput} ${props.className || ""}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${baseInput} resize-y ${props.className || ""}`} />;
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" className="h-4 w-4 accent-accent" {...props} />
      {label}
    </label>
  );
}

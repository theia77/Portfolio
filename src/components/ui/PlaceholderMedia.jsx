/**
 * Fallback hero visual for a project with no image — an abstract technical
 * pattern in the site's palette rather than a broken image or stock photo.
 */
export function PlaceholderMedia({ label, className = "" }) {
  return (
    <div
      className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-line/40 bg-bg ${className}`}
    >
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full opacity-50" fill="none">
        <line x1="0" y1="30" x2="400" y2="30" stroke="#514D47" strokeWidth="1" />
        <line x1="0" y1="195" x2="400" y2="195" stroke="#514D47" strokeWidth="1" />
        <line x1="30" y1="0" x2="30" y2="225" stroke="#514D47" strokeWidth="1" />
        <line x1="370" y1="0" x2="370" y2="225" stroke="#514D47" strokeWidth="1" />
        <line x1="0" y1="0" x2="400" y2="225" stroke="#514D47" strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="112" r="60" stroke="#B8A88A" strokeWidth="1" />
        <circle cx="200" cy="112" r="3" fill="#C85C45" />
      </svg>
      {label && (
        <span className="relative text-xs uppercase tracking-widest2 text-muted">
          {label}
        </span>
      )}
    </div>
  );
}

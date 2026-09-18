/**
 * A quiet, abstract technical-diagram visual — not a particle field, not a
 * neural network. Thin lines, a slowly rotating ring, and a handful of
 * measurement-style points. Pure SVG + CSS animation (no JS loop), stays
 * out of the way of content, and is hidden below the lg breakpoint where
 * it would otherwise fight for space.
 */
export function BackgroundGeometry({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none hidden select-none lg:block ${className}`}
    >
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <g className="animate-slow-rotate" style={{ transformOrigin: "300px 300px" }}>
          <circle cx="300" cy="300" r="220" stroke="#514D47" strokeWidth="1" opacity="0.6" />
          <circle cx="300" cy="300" r="220" stroke="#514D47" strokeWidth="1" strokeDasharray="2 10" opacity="0.5" />
        </g>

        <g className="animate-slow-rotate-reverse" style={{ transformOrigin: "300px 300px" }}>
          <circle cx="300" cy="300" r="150" stroke="#514D47" strokeWidth="1" opacity="0.5" />
        </g>

        <line x1="80" y1="300" x2="520" y2="300" stroke="#514D47" strokeWidth="1" opacity="0.35" />
        <line x1="300" y1="80" x2="300" y2="520" stroke="#514D47" strokeWidth="1" opacity="0.35" />
        <line x1="150" y1="150" x2="450" y2="450" stroke="#514D47" strokeWidth="1" opacity="0.25" />

        <g className="animate-slow-rotate" style={{ transformOrigin: "300px 300px", animationDuration: "160s" }}>
          <circle cx="300" cy="80" r="3" fill="#C85C45" />
          <circle cx="520" cy="300" r="2" fill="#B8A88A" />
          <circle cx="300" cy="520" r="2" fill="#969189" />
          <circle cx="80" cy="300" r="2" fill="#969189" />
        </g>

        <path
          d="M170 430 L170 340 L260 340 L260 260 L340 260"
          stroke="#B8A88A"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="340" cy="260" r="3" fill="#C85C45" opacity="0.9" />
      </svg>
    </div>
  );
}

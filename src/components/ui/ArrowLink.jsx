import { Link } from "react-router-dom";

/**
 * The site's single understated call-to-action style — small uppercase
 * label with an arrow that nudges forward on hover/focus.
 */
export function ArrowLink({ to, href, onClick, download, children, direction = "right", className = "" }) {
  const isDown = direction === "down";
  const arrow = isDown ? "↓" : "→";
  const Component = onClick ? "button" : href ? "a" : Link;
  const linkProps = onClick
    ? { type: "button", onClick }
    : href
      ? {
          href,
          download,
          target: !download && href.startsWith("http") ? "_blank" : undefined,
          rel: !download && href.startsWith("http") ? "noreferrer" : undefined,
        }
      : { to };

  return (
    <Component
      {...linkProps}
      className={`group inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-ink transition-colors duration-300 hover:text-accent ${className}`}
    >
      <span>{children}</span>
      <span
        className={`inline-block transition-transform duration-300 ease-editorial ${
          isDown ? "group-hover:translate-y-1" : "group-hover:translate-x-1"
        }`}
      >
        {arrow}
      </span>
    </Component>
  );
}

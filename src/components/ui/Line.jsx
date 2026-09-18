import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * The signature recurring motif of the site — a thin terracotta line.
 * Reused, differently, as a divider, a timeline spine, a hover underline
 * and a page decoration. `animate` draws the line in once when it enters
 * the viewport; set it to false for a line that should simply be present.
 */
export function Line({
  orientation = "horizontal",
  animate = true,
  color = "accent",
  className = "",
  thickness = 1,
  delay = 0,
  duration = 0.9,
}) {
  const reduced = useReducedMotion();
  const isHorizontal = orientation === "horizontal";
  const colorClass = color === "accent" ? "bg-accent" : "bg-line";

  const base = isHorizontal
    ? { height: thickness }
    : { width: thickness };

  if (!animate || reduced) {
    return (
      <div
        aria-hidden="true"
        className={`${colorClass} ${className}`}
        style={{ ...base, ...(isHorizontal ? { width: "100%" } : { height: "100%" }) }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`${colorClass} ${className}`}
      style={{
        ...base,
        ...(isHorizontal ? { width: "100%" } : { height: "100%" }),
        transformOrigin: isHorizontal ? "left" : "top",
      }}
      initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

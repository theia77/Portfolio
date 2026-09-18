import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * Gentle fade + rise reveal used for headings and paragraphs as they
 * enter the viewport. Falls back to a static render when reduced motion
 * is requested.
 */
export function RevealText({
  children,
  as = "div",
  delay = 0,
  duration = 0.7,
  y = 16,
  once = true,
  className = "",
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * A thin terracotta line fixed to the right edge of the viewport that
 * fills top-to-bottom with scroll progress — the "line" motif read as a
 * scroll indicator. Desktop only; hidden on touch-scale viewports where
 * it would compete with content.
 */
export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-40 hidden h-screen w-px bg-line/40 lg:block"
    >
      <motion.div
        className="w-px bg-accent"
        style={{
          height: "100%",
          scaleY: reduced ? 0 : scrollYProgress,
          transformOrigin: "top",
        }}
      />
    </div>
  );
}

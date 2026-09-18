import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "../../hooks/useFinePointer.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * A small "VIEW" label that follows the cursor over project rows.
 * Purely additive — the native cursor is never hidden, so the site is
 * fully usable with a mouse, touch, or keyboard regardless of this
 * component. Only mounts on fine-pointer desktop devices.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (!fine) return undefined;

    function handleMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target.closest?.("[data-cursor-view]");
      setActive(Boolean(target));
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 -translate-x-1/2 -translate-y-1/2"
      style={{ x: springX, y: springY }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
      transition={reduced ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/60 bg-bg/80 text-[10px] uppercase tracking-widest2 text-accent">
        View
      </span>
    </motion.div>
  );
}

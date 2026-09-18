import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

const COLS = 10;
const ROWS = 6;
const WIDTH = 800;
const HEIGHT = 480;
const ACCENT_POINTS = [
  [3, 2],
  [7, 4],
];

function pointAt(col, row, t) {
  const x = (col / (COLS - 1)) * WIDTH;
  const baseY = (row / (ROWS - 1)) * HEIGHT;
  const wave =
    Math.sin(t * 0.6 + col * 0.55 + row * 0.35) * 26 +
    Math.sin(t * 0.35 + row * 0.8) * 14;
  return [x, baseY + wave];
}

function rowPath(row, t) {
  const pts = [];
  for (let col = 0; col < COLS; col++) pts.push(pointAt(col, row, t));
  return "M " + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
}

function colPath(col, t) {
  const pts = [];
  for (let row = 0; row < ROWS; row++) pts.push(pointAt(col, row, t));
  return "M " + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
}

/**
 * A code-generated "parametric geometry" visual for the About section —
 * a deforming wireframe grid, standing in for a fourth video that was
 * never provided. Plain SVG + requestAnimationFrame (no canvas, no
 * dependency), mutating path `d` attributes directly via refs rather
 * than React state so a smooth 60fps loop doesn't re-render the tree.
 */
export function ParametricGeometry({ sectionRef, maxOpacity = 0.5, className = "" }) {
  const reduced = useReducedMotion();
  const rowRefs = useRef([]);
  const colRefs = useRef([]);
  const dotRefs = useRef([]);
  const frameRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, maxOpacity, maxOpacity, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04]);

  useEffect(() => {
    let raf;
    const start = performance.now();

    function tick(now) {
      const t = (now - start) / 1000;
      rowRefs.current.forEach((el, row) => el?.setAttribute("d", rowPath(row, t)));
      colRefs.current.forEach((el, col) => el?.setAttribute("d", colPath(col, t)));
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const [col, row] = ACCENT_POINTS[i];
        const [x, y] = pointAt(col, row, t);
        el.setAttribute("cx", x.toFixed(1));
        el.setAttribute("cy", y.toFixed(1));
      });
      frameRef.current = requestAnimationFrame(tick);
    }

    if (reduced) {
      rowRefs.current.forEach((el, row) => el?.setAttribute("d", rowPath(row, 0)));
      colRefs.current.forEach((el, col) => el?.setAttribute("d", colPath(col, 0)));
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const [col, row] = ACCENT_POINTS[i];
        const [x, y] = pointAt(col, row, 0);
        el.setAttribute("cx", x.toFixed(1));
        el.setAttribute("cy", y.toFixed(1));
      });
      return undefined;
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf ?? frameRef.current);
  }, [reduced]);

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={reduced ? { opacity: maxOpacity * 0.8 } : { opacity, scale }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mix-blend-screen h-full w-full"
        fill="none"
      >
        {Array.from({ length: ROWS }, (_, row) => (
          <path
            key={`row-${row}`}
            ref={(el) => (rowRefs.current[row] = el)}
            stroke="#514D47"
            strokeWidth="1"
            opacity={0.55}
          />
        ))}
        {Array.from({ length: COLS }, (_, col) => (
          <path
            key={`col-${col}`}
            ref={(el) => (colRefs.current[col] = el)}
            stroke="#514D47"
            strokeWidth="1"
            opacity={0.35}
          />
        ))}
        {ACCENT_POINTS.map((_, i) => (
          <circle
            key={`dot-${i}`}
            ref={(el) => (dotRefs.current[i] = el)}
            r={4}
            fill={i === 0 ? "#C85C45" : "#B8A88A"}
          />
        ))}
      </svg>
      <div className="scene-video-vignette" />
    </motion.div>
  );
}

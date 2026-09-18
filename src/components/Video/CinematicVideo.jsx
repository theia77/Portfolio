import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * A large, full-bleed editorial motion layer — not a video "next to"
 * text, a video the text sits across. Opacity and scale are driven by
 * how far its section has scrolled through the viewport, so it emerges
 * and dissolves with the page rather than cutting in and out.
 *
 * `mode="hero"` additionally plays a one-time entrance (mount fade + a
 * scale-in) before scroll takes over, since the hero is already fully
 * visible at load — there is no "entering the viewport" to trigger on.
 * Every other section uses a symmetric scroll-linked fade in/out as it
 * transits the viewport, which is what gives adjacent sections their
 * crossfade overlap.
 */
export function CinematicVideo({
  sectionRef,
  src,
  poster,
  mode = "section",
  maxOpacity = 0.6,
  priority = false,
  boosted = false,
  className = "",
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    // A very slight playback-rate lift on hover (Work section) — never
    // enough to read as a jump cut, just a quiet responsiveness cue.
    el.playbackRate = boosted ? 1.15 : 1;
  }, [boosted, reduced]);

  const heroScroll = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sectionScroll = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 1], [maxOpacity, 0]);
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 1], [1, 1.06]);

  const sectionOpacity = useTransform(
    sectionScroll.scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, maxOpacity, maxOpacity, 0]
  );
  const sectionScale = useTransform(sectionScroll.scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.03]);

  const isHero = mode === "hero";
  const scrollOpacity = isHero ? heroOpacity : sectionOpacity;
  const scale = isHero ? heroScale : sectionScale;

  useEffect(() => {
    if (reduced) return undefined;
    const el = videoRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute overflow-hidden ${className}`}
        style={{ opacity: maxOpacity * 0.8 }}
      >
        <img src={poster} alt="" className="scene-video-blend" />
        <div className="scene-video-vignette" />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={{ opacity: scrollOpacity, scale }}
    >
      <motion.div
        className="h-full w-full"
        initial={isHero ? { opacity: 0, scale: 0.98 } : false}
        animate={isHero ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          ref={videoRef}
          className="scene-video-blend"
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="scene-video-vignette" />
      </motion.div>
    </motion.div>
  );
}

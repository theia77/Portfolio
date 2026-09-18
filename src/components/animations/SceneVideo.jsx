import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * A looping, silent scene video used as an editorial visual element
 * (construction / surveying / data motifs). Purely decorative — the
 * page works identically with it disabled.
 *
 * - Plays only while scrolled into view (IntersectionObserver), and
 *   pauses again once it leaves, so nothing plays off-screen.
 * - Respects prefers-reduced-motion by rendering a static poster frame
 *   instead of a <video> at all — no autoplay, no layout change.
 * - Blends into the page background: `mix-blend-mode: screen` drops out
 *   the video's near-black background, and a vignette overlay (painted in
 *   the page background colour) feathers the rectangular edges away, so
 *   it dissolves into the surrounding charcoal rather than sitting in a
 *   framed box.
 */
export function SceneVideo({ src, poster, className = "", priority = false, boosted = false }) {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    // A very slight playback-rate lift on hover (Work page) — never enough
    // to read as a jump cut, just a quiet responsiveness cue.
    el.playbackRate = boosted ? 1.15 : 1;
  }, [boosted, reduced]);

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
      { threshold: 0.2, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {reduced ? (
        <img src={poster} alt="" aria-hidden="true" className="scene-video-blend" />
      ) : (
        <video
          ref={videoRef}
          className="scene-video-blend"
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="scene-video-vignette" />
    </div>
  );
}

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most visible in the
 * viewport, for driving the navbar's active-link indicator on the single
 * continuous page. Returns null (nothing highlighted) until one of them
 * has actually been observed — e.g. while still scrolled up in the hero,
 * before "About" for real.
 */
export function useActiveSection(ids, options = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-15% 0px -55% 0px", ...options }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options]);

  return active;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A hash means we're navigating to a specific section (e.g. from a
    // project page back to /#contact) — leave scrolling to that anchor's
    // own handler instead of snapping to the top first.
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
}

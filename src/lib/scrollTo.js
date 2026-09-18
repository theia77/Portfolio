const NAVBAR_OFFSET = 80; // matches the sticky navbar's approximate height

/** Smoothly scrolls to a section by id, accounting for the sticky navbar. */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  window.scrollTo({ top, behavior });
}

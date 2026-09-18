import { useEffect } from "react";
import { site } from "../../content/site.js";

/**
 * Minimal document-title/meta-description setter — avoids pulling in a
 * dedicated head-management dependency for something this small.
 */
export function Helmet({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.displayName}` : site.displayName;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}

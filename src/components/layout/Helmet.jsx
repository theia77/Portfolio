import { useEffect } from "react";
import { usePortfolioData } from "../../hooks/usePortfolioData.jsx";
import { fallbackSite } from "../../content/site.js";

/**
 * Minimal document-title/meta-description setter — avoids pulling in a
 * dedicated head-management dependency for something this small.
 */
export function Helmet({ title, description }) {
  const { siteSettings } = usePortfolioData();
  const siteName = siteSettings?.name || fallbackSite.name;

  useEffect(() => {
    document.title = title ? `${title} — ${siteName}` : siteName;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description, siteName]);

  return null;
}

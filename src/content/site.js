// Structural, UI-only constants — everything that is actual content
// (name, tagline, email, socials, resume link...) now lives in Supabase
// (see src/services/) and is fetched at runtime via usePortfolioData().
//
// This file only defines *which* sections exist and in what order, since
// that's a layout decision, not content.

// Used only when the corresponding Supabase row is missing/unreachable,
// so the page never renders visibly blank — not real content, just the
// same "replace me" placeholder convention as the rest of the site.
export const fallbackSite = {
  name: "YOUR NAME",
  role: ["ENGINEERING", "DATA", "RESEARCH"],
  intro: "Exploring the intersection of engineering, computation and ideas.",
};

export const nav = [
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Work", id: "work" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

export const sectionIds = nav.map((item) => item.id);

// Global, site-wide content. Edit this file to change identity, navigation
// labels and footer/meta information. Nothing here should require touching
// any component.

export const site = {
  name: {
    first: "YOUR",
    last: "NAME",
  },
  displayName: "YOUR NAME",
  role: ["ENGINEERING", "DATA", "RESEARCH"],
  intro:
    "Exploring the intersection of engineering, computation and ideas.",
  location: "Based somewhere / working everywhere",
  email: "hello@example.com",
  year: new Date().getFullYear(),
};

// Primary navigation. Order here controls order everywhere it is rendered.
export const nav = [
  { label: "About", path: "/about" },
  { label: "Education", path: "/education" },
  { label: "Work", path: "/work" },
  { label: "Resume", path: "/resume" },
  { label: "Contact", path: "/contact" },
];

export const socials = [
  { label: "GitHub", url: "https://github.com/" },
  { label: "LinkedIn", url: "https://linkedin.com/" },
  { label: "Email", url: `mailto:${site.email}` },
];

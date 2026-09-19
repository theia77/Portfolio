import { Link } from "react-router-dom";
import { usePortfolioData } from "../../hooks/usePortfolioData.jsx";

const CARDS = [
  { to: "/admin/about", label: "About", count: (d) => (d.about ? 1 : 0), noun: "record" },
  { to: "/admin/education", label: "Education", count: (d) => d.education.length, noun: "entries" },
  { to: "/admin/projects", label: "Projects", count: (d) => d.projects.length, noun: "projects" },
  { to: "/admin/skills", label: "Skills", count: (d) => d.skillGroups.reduce((n, g) => n + g.items.length, 0), noun: "skills" },
  { to: "/admin/contact", label: "Contact / Socials", count: (d) => d.socialLinks.length, noun: "links" },
  { to: "/admin/resume", label: "Resume", count: (d) => (d.siteSettings?.resume_url ? 1 : 0), noun: "link set" },
  { to: "/admin/settings", label: "Site Settings", count: () => 1, noun: "record" },
];

export function AdminOverview() {
  const data = usePortfolioData();

  return (
    <div>
      <h1 className="text-xl text-ink">Overview</h1>
      <p className="mt-1 text-sm text-muted">
        Everything here reads from and writes to the same Supabase project the public site
        uses — a change you save appears on the site as soon as it reloads.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded border border-line/50 p-4 transition-colors hover:border-accent/60"
          >
            <p className="text-sm text-ink">{card.label}</p>
            <p className="mt-2 text-2xl text-accent">{card.count(data)}</p>
            <p className="text-xs text-muted">{card.noun}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

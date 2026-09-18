import { Link, useLocation, useNavigate } from "react-router-dom";
import { nav, fallbackSite } from "../../content/site.js";
import { usePortfolioData } from "../../hooks/usePortfolioData.jsx";
import { scrollToSection } from "../../lib/scrollTo.js";
import { Container } from "../ui/Container.jsx";
import { Line } from "../ui/Line.jsx";

export function Footer() {
  const { siteSettings, socialLinks } = usePortfolioData();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const displayName = siteSettings?.name || fallbackSite.name;

  function goToSection(id) {
    if (onHome) {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <footer className="mt-32 border-t border-line/40">
      <Container className="py-12">
        <Line animate={false} className="mb-12 opacity-30" />

        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              to="/"
              className="font-display text-2xl text-ink transition-colors hover:text-accent"
            >
              {displayName}
            </Link>
            {siteSettings?.intro && (
              <p className="mt-2 max-w-xs text-sm text-muted">{siteSettings.intro}</p>
            )}
          </div>

          <nav className="flex flex-col gap-2 sm:items-end" aria-label="Footer">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className="text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted sm:flex-row sm:items-center">
          <span>
            © {siteSettings?.copyright_year || new Date().getFullYear()} {displayName}
          </span>
          {socialLinks.length > 0 && (
            <div className="flex gap-5">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.url.startsWith("http") ? "_blank" : undefined}
                  rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                  className="uppercase tracking-widest2 transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}

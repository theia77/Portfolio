import { Link } from "react-router-dom";
import { site, nav, socials } from "../../content/site.js";
import { Container } from "../ui/Container.jsx";
import { Line } from "../ui/Line.jsx";

export function Footer() {
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
              {site.displayName}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted">{site.intro}</p>
          </div>

          <nav className="flex flex-col gap-2 sm:items-end" aria-label="Footer">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {site.year} {site.displayName}</span>
          <div className="flex gap-5">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                className="uppercase tracking-widest2 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

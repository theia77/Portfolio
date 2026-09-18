import { Link, useParams } from "react-router-dom";
import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Line } from "../components/ui/Line.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { PlaceholderMedia } from "../components/ui/PlaceholderMedia.jsx";
import { usePortfolioData } from "../hooks/usePortfolioData.jsx";

const SECTIONS = [
  ["overview", "Overview"],
  ["objective", "Objective"],
  ["approach", "Approach"],
  ["process", "Process"],
  ["outcome", "Result / Outcome"],
  ["learnings", "Learnings"],
];

export default function Project() {
  const { slug } = useParams();
  const { status, projects } = usePortfolioData();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];

  if (!project) {
    return (
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl text-ink">
          {status === "loading" ? "Loading…" : "Project not found"}
        </h1>
        {status !== "loading" && (
          <>
            <p className="mt-4 text-muted">
              This project may have moved or no longer exists.
            </p>
            <Link to="/#work" className="mt-8 inline-block text-xs uppercase tracking-widest2 text-accent">
              ← Back to work
            </Link>
          </>
        )}
      </Container>
    );
  }

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const sections = SECTIONS.filter(([key]) => project[key]);
  const links = [
    project.github_url && { label: "View repository", url: project.github_url },
    project.external_url && { label: "Visit link", url: project.external_url },
  ].filter(Boolean);

  return (
    <>
      <Helmet title={project.title} description={project.short_description} />

      <Container className="py-24 sm:py-32">
        <RevealText as="div" className="text-xs uppercase tracking-widest2 text-accent">
          {[project.category, project.year].filter(Boolean).join(" / ")}
        </RevealText>

        <RevealText as="h1" delay={0.05} className="mt-4 font-display text-5xl text-ink sm:text-6xl">
          {project.title}
        </RevealText>

        {project.description && (
          <RevealText delay={0.1} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted balance">
            {project.description}
          </RevealText>
        )}

        <RevealText delay={0.15} className="mt-12">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              loading="lazy"
              className="aspect-[16/9] w-full border border-line/40 object-cover"
            />
          ) : (
            <PlaceholderMedia label={project.title} />
          )}
        </RevealText>

        <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          <div className="space-y-16">
            {sections.map(([key, label]) => (
              <RevealText as="div" key={key}>
                <h2 className="text-xs uppercase tracking-widest2 text-accent">{label}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90">
                  {project[key]}
                </p>
              </RevealText>
            ))}
          </div>

          <aside className="space-y-10 lg:border-l lg:border-line/40 lg:pl-10">
            {project.tools?.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest2 text-accent">Tools</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.tools.join(" · ")}
                </p>
              </div>
            )}

            {links.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest2 text-accent">Links</h2>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <Line animate={false} className="mt-24 opacity-30" />

        <nav className="mt-10 flex items-center justify-between gap-6" aria-label="Adjacent projects">
          <Link
            to={`/work/${previous.slug}`}
            className="group flex items-center gap-3 text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>{previous.title}</span>
          </Link>
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center gap-3 text-right text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
          >
            <span>{next.title}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </nav>
      </Container>
    </>
  );
}

import { forwardRef, useMemo, useState } from "react";
import { Container } from "../ui/Container.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { ProjectFilter } from "../projects/ProjectFilter.jsx";
import { ProjectListItem } from "../projects/ProjectListItem.jsx";
import { CinematicVideo } from "../Video/CinematicVideo.jsx";
import dataVideo from "../../assets/animations/data-analysis.mp4";
import dataPoster from "../../assets/animations/data-analysis-poster.jpg";

export const Work = forwardRef(function Work({ projects, status }, ref) {
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects]
  );
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(false);

  const visible = active === "All"
    ? projects
    : projects.filter((project) => project.category === active);

  return (
    <section ref={ref} id="work" className="relative overflow-hidden py-32 sm:py-40">
      <CinematicVideo
        sectionRef={ref}
        src={dataVideo}
        poster={dataPoster}
        maxOpacity={hovered ? 0.62 : 0.48}
        boosted={hovered}
        className="inset-y-[2%] left-[8%] right-[-6%]"
      />

      <Container className="relative z-10">
        <SectionLabel index="03" label="Selected Work" />

        <RevealText as="h2" delay={0.05} className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Selected work
        </RevealText>

        {categories.length > 1 && (
          <RevealText delay={0.12} className="mt-10">
            <ProjectFilter categories={categories} active={active} onChange={setActive} />
          </RevealText>
        )}

        <div className="mt-8 max-w-3xl" onMouseLeave={() => setHovered(false)}>
          {status === "loading" && projects.length === 0 && (
            <p className="border-t border-line/40 py-16 text-sm text-muted">Loading…</p>
          )}
          {status === "ready" && projects.length === 0 && (
            <p className="border-t border-line/40 py-16 text-sm text-muted">
              Work will be added soon.
            </p>
          )}
          {visible.map((project, index) => (
            <div key={project.slug} onMouseEnter={() => setHovered(true)}>
              <ProjectListItem project={project} index={index} />
            </div>
          ))}
          {status === "ready" && projects.length > 0 && visible.length === 0 && (
            <p className="border-t border-line/40 py-16 text-sm text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
});

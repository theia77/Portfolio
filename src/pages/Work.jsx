import { useMemo, useState } from "react";
import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { ProjectFilter } from "../components/projects/ProjectFilter.jsx";
import { ProjectListItem } from "../components/projects/ProjectListItem.jsx";
import { SceneVideo } from "../components/animations/SceneVideo.jsx";
import { projects } from "../content/projects.js";
import dataVideo from "../assets/animations/data-analysis.mp4";
import dataPoster from "../assets/animations/data-analysis-poster.jpg";

export default function Work() {
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category).filter(Boolean))],
    []
  );
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(false);

  const visible = active === "All"
    ? projects
    : projects.filter((project) => project.category === active);

  return (
    <>
      <Helmet title="Work" description="Selected work across engineering, data, research and software." />

      <Container className="py-24 sm:py-32">
        <SectionLabel index="03" label="Selected Work" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-5xl text-ink sm:text-6xl">
          Selected work
        </RevealText>

        {categories.length > 1 && (
          <RevealText delay={0.12} className="mt-10">
            <ProjectFilter categories={categories} active={active} onChange={setActive} />
          </RevealText>
        )}

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
          <div onMouseLeave={() => setHovered(false)}>
            {visible.map((project, index) => (
              <div key={project.slug} onMouseEnter={() => setHovered(true)}>
                <ProjectListItem project={project} index={index} />
              </div>
            ))}
            {visible.length === 0 && (
              <p className="border-t border-line/40 py-16 text-sm text-muted">
                No projects in this category yet.
              </p>
            )}
          </div>

          <RevealText delay={0.18} className="order-first lg:sticky lg:top-28 lg:order-none">
            <div
              className={`mx-auto aspect-video w-full max-w-sm transition-all duration-700 ease-editorial lg:mx-0 lg:max-w-none ${
                hovered ? "translate-x-1 opacity-100" : "opacity-75"
              }`}
            >
              <SceneVideo src={dataVideo} poster={dataPoster} boosted={hovered} />
            </div>
          </RevealText>
        </div>
      </Container>
    </>
  );
}

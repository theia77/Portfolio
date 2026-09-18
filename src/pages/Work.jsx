import { useMemo, useState } from "react";
import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { ProjectFilter } from "../components/projects/ProjectFilter.jsx";
import { ProjectListItem } from "../components/projects/ProjectListItem.jsx";
import { projects } from "../content/projects.js";

export default function Work() {
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category).filter(Boolean))],
    []
  );
  const [active, setActive] = useState("All");

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

        <div className="mt-8">
          {visible.map((project, index) => (
            <ProjectListItem key={project.slug} project={project} index={index} />
          ))}
          {visible.length === 0 && (
            <p className="border-t border-line/40 py-16 text-sm text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}

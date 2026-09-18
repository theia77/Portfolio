import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Line } from "../components/ui/Line.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { ArrowLink } from "../components/ui/ArrowLink.jsx";
import { SceneVideo } from "../components/animations/SceneVideo.jsx";
import { ProjectListItem } from "../components/projects/ProjectListItem.jsx";
import { site } from "../content/site.js";
import { about } from "../content/about.js";
import { education } from "../content/education.js";
import { projects } from "../content/projects.js";
import buildingVideo from "../assets/animations/building-construction.mp4";
import buildingPoster from "../assets/animations/building-construction-poster.jpg";

export default function Home() {
  const featured = projects.slice(0, 4);
  const latestEducation = education[0];

  return (
    <>
      <Helmet description={site.intro} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="py-20 lg:min-h-[86vh] lg:py-0">
          <div className="hero-grid">
            <div className="hero-text max-w-2xl">
              <RevealText as="p" className="text-xs uppercase tracking-widest2 text-accent">
                {site.role.join(" / ")}
              </RevealText>

              <RevealText delay={0.08}>
                <h1 className="mt-6 font-display text-6xl leading-[0.95] text-ink sm:text-8xl">
                  {site.name.first}
                  <br />
                  {site.name.last}
                </h1>
              </RevealText>

              <RevealText delay={0.18} className="mt-8 max-w-md text-lg leading-relaxed text-muted balance">
                {site.intro}
              </RevealText>
            </div>

            <RevealText as="div" delay={0.2} className="hero-video">
              <div className="mx-auto aspect-[4/3] w-full max-w-sm lg:mx-0 lg:aspect-auto lg:h-[460px] lg:max-w-none">
                <SceneVideo src={buildingVideo} poster={buildingPoster} priority />
              </div>
            </RevealText>

            <RevealText delay={0.32} className="hero-cta">
              <ArrowLink to="/work">Explore work</ArrowLink>
            </RevealText>
          </div>
        </Container>
      </section>

      {/* 01 / Introduction */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel index="01" label="Introduction" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <RevealText as="h2" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              A running archive of engineering, data and research.
            </RevealText>
            <RevealText delay={0.1} className="max-w-2xl text-base leading-relaxed text-muted">
              {about.intro[0]}
            </RevealText>
          </div>
        </Container>
      </section>

      <Container>
        <Line animate={false} className="opacity-30" />
      </Container>

      {/* 02 / Selected Work */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionLabel index="02" label="Selected Work" />
            <ArrowLink to="/work" className="hidden sm:inline-flex">
              View all
            </ArrowLink>
          </div>

          <div className="mt-10">
            {featured.map((project, index) => (
              <ProjectListItem key={project.slug} project={project} index={index} />
            ))}
          </div>

          <ArrowLink to="/work" className="mt-8 inline-flex sm:hidden">
            View all work
          </ArrowLink>
        </Container>
      </section>

      <Container>
        <Line animate={false} className="opacity-30" />
      </Container>

      {/* 03 / Education */}
      {latestEducation && (
        <section className="py-24 sm:py-32">
          <Container>
            <SectionLabel index="03" label="Education" />
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <RevealText as="div">
                <p className="font-mono text-xs uppercase tracking-widest2 text-accent font-tabular">
                  {[latestEducation.startYear, latestEducation.endYear].filter(Boolean).join(" — ")}
                </p>
                <h3 className="mt-3 font-display text-3xl text-ink">
                  {latestEducation.institution}
                </h3>
                <p className="mt-1 text-sm text-muted">{latestEducation.degree}</p>
              </RevealText>
              <RevealText delay={0.1} className="flex flex-col justify-between gap-6">
                <p className="max-w-xl text-base leading-relaxed text-muted">
                  {latestEducation.description}
                </p>
                <ArrowLink to="/education">Full education history</ArrowLink>
              </RevealText>
            </div>
          </Container>
        </section>
      )}

      <Container>
        <Line animate={false} className="opacity-30" />
      </Container>

      {/* 04 / Currently */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel index="04" label="Currently" />
          <RevealText delay={0.1} className="mt-10 max-w-2xl font-display text-2xl leading-snug text-ink sm:text-3xl">
            {about.currently[0]}
          </RevealText>
        </Container>
      </section>

      {/* Contact teaser */}
      <section className="pb-32 pt-8">
        <Container>
          <div className="border-t border-line/40 pt-16">
            <RevealText as="h2" className="font-display text-4xl text-ink sm:text-5xl">
              Let&rsquo;s talk.
            </RevealText>
            <RevealText delay={0.1} className="mt-6">
              <ArrowLink to="/contact">Get in touch</ArrowLink>
            </RevealText>
          </div>
        </Container>
      </section>
    </>
  );
}

import { forwardRef } from "react";
import { Container } from "../ui/Container.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { ParametricGeometry } from "../Motion/ParametricGeometry.jsx";

export const About = forwardRef(function About({ about, status }, ref) {
  const hasContent = Boolean(about?.description?.length || about?.headline);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-32 sm:py-40">
      <Container>
        {/* Anchored to the same text grid as the copy below, not the
            full section width — a fixed right-hand gutter, desktop only. */}
        <div className="pointer-events-none absolute inset-y-[12%] right-6 hidden w-[34%] lg:block xl:right-16">
          <ParametricGeometry sectionRef={ref} maxOpacity={0.45} />
        </div>

        <div className="relative max-w-2xl">
          <SectionLabel index="01" label="About" />

          <RevealText as="h2" delay={0.05} className="mt-6 font-display text-4xl text-ink sm:text-5xl">
            {about?.headline || "About me"}
          </RevealText>

          {status === "loading" && !hasContent && (
            <p className="mt-10 max-w-xl text-sm text-muted">Loading…</p>
          )}

          {status === "ready" && !hasContent && (
            <p className="mt-10 max-w-xl text-sm text-muted">
              About content will be added soon.
            </p>
          )}

          {hasContent && (
            <div className="mt-10 max-w-xl space-y-6">
              {about.description.map((paragraph, i) => (
                <RevealText
                  key={i}
                  as="p"
                  delay={0.1 + i * 0.06}
                  className="text-lg leading-relaxed text-ink/90 balance"
                >
                  {paragraph}
                </RevealText>
              ))}

              {about.interests?.length > 0 && (
                <RevealText delay={0.2} className="pt-4">
                  <h3 className="text-xs uppercase tracking-widest2 text-accent">Interests</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {about.interests.join(" · ")}
                  </p>
                </RevealText>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
});

import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Line } from "../components/ui/Line.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { about } from "../content/about.js";
import { skills } from "../content/skills.js";

export default function About() {
  return (
    <>
      <Helmet title="About" description="About — background, interests and skills." />

      <Container className="py-24 sm:py-32">
        <SectionLabel index="01" label="About" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-5xl text-ink sm:text-6xl">
          About me
        </RevealText>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <div className="space-y-10">
            {about.image && (
              <RevealText as="div" className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-line/50">
                <img
                  src={about.image}
                  alt="Portrait"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </RevealText>
            )}

            <RevealText as="div">
              <h2 className="text-xs uppercase tracking-widest2 text-accent">Currently</h2>
              <div className="mt-4 space-y-3">
                {about.currently.map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted">
                    {line}
                  </p>
                ))}
              </div>
            </RevealText>

            {about.interests?.length > 0 && (
              <RevealText as="div">
                <h2 className="text-xs uppercase tracking-widest2 text-accent">Interests</h2>
                <ul className="mt-4 space-y-2">
                  {about.interests.map((interest) => (
                    <li key={interest} className="text-sm text-muted">
                      {interest}
                    </li>
                  ))}
                </ul>
              </RevealText>
            )}
          </div>

          <div className="space-y-8">
            {about.intro.map((paragraph, i) => (
              <RevealText
                key={i}
                as="p"
                delay={i * 0.06}
                className="max-w-2xl text-lg leading-relaxed text-ink/90 balance"
              >
                {paragraph}
              </RevealText>
            ))}

            <Line animate={false} className="my-4 max-w-2xl opacity-30" />

            <RevealText as="div">
              <h2 className="text-xs uppercase tracking-widest2 text-accent">Skills</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {skills.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-xs uppercase tracking-widest2 text-muted">
                      {group.group}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/90">
                      {group.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </RevealText>
          </div>
        </div>
      </Container>
    </>
  );
}

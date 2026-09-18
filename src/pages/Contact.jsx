import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { Line } from "../components/ui/Line.jsx";
import { contact } from "../content/contact.js";

export default function Contact() {
  return (
    <>
      <Helmet title="Contact" description="Get in touch." />

      <Container className="flex min-h-[75vh] flex-col justify-center py-24 sm:py-32">
        <SectionLabel index="05" label="Contact" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-6xl text-ink sm:text-7xl">
          {contact.heading}
        </RevealText>

        <RevealText delay={0.12} className="mt-6 max-w-md text-lg leading-relaxed text-muted balance">
          {contact.message}
        </RevealText>

        <RevealText delay={0.2} className="mt-12">
          <a
            href={`mailto:${contact.email}`}
            className="font-display text-3xl text-ink transition-colors hover:text-accent sm:text-4xl"
          >
            {contact.email}
          </a>
        </RevealText>

        <RevealText delay={0.28} className="mt-14 max-w-xs">
          <Line animate={false} className="mb-6 opacity-30" />
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {contact.socials.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                className="text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </RevealText>
      </Container>
    </>
  );
}

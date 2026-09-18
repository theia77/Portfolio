import { forwardRef } from "react";
import { Container } from "../ui/Container.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { Line } from "../ui/Line.jsx";
import { CinematicVideo } from "../Video/CinematicVideo.jsx";
import surveyingVideo from "../../assets/animations/surveying-contours.mp4";
import surveyingPoster from "../../assets/animations/surveying-contours-poster.jpg";

export const Contact = forwardRef(function Contact({ siteSettings, socialLinks }, ref) {
  const email = siteSettings?.email;

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-[70vh] items-center overflow-hidden py-28"
    >
      <CinematicVideo
        sectionRef={ref}
        src={surveyingVideo}
        poster={surveyingPoster}
        maxOpacity={0.16}
        className="inset-y-0 left-[10%] right-[10%]"
      />

      <Container className="relative z-10">
        <SectionLabel index="05" label="Contact" />

        <RevealText as="h2" delay={0.05} className="mt-6 font-display text-6xl text-ink sm:text-7xl">
          Let&rsquo;s talk.
        </RevealText>

        {email && (
          <RevealText delay={0.15} className="mt-12">
            <a
              href={`mailto:${email}`}
              className="font-display text-3xl text-ink transition-colors hover:text-accent sm:text-4xl"
            >
              {email}
            </a>
          </RevealText>
        )}

        {socialLinks.length > 0 && (
          <RevealText delay={0.22} className="mt-14 max-w-xs">
            <Line animate={false} className="mb-6 opacity-30" />
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
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
        )}
      </Container>
    </section>
  );
});

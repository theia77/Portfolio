import { forwardRef } from "react";
import { Container } from "../ui/Container.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { Timeline } from "../education/Timeline.jsx";
import { CinematicVideo } from "../Video/CinematicVideo.jsx";
import surveyingVideo from "../../assets/animations/surveying-contours.mp4";
import surveyingPoster from "../../assets/animations/surveying-contours-poster.jpg";

export const Education = forwardRef(function Education({ entries, status }, ref) {
  return (
    <section ref={ref} id="education" className="relative overflow-hidden py-32 sm:py-40">
      <CinematicVideo
        sectionRef={ref}
        src={surveyingVideo}
        poster={surveyingPoster}
        maxOpacity={0.4}
        className="inset-y-[5%] left-[10%] right-[5%] lg:right-[15%]"
      />

      <Container className="relative z-10">
        <SectionLabel index="02" label="Education" />

        <RevealText as="h2" delay={0.05} className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Education
        </RevealText>

        <div className="mt-20">
          {status === "loading" && entries.length === 0 && (
            <p className="text-sm text-muted">Loading…</p>
          )}
          {status === "ready" && entries.length === 0 && (
            <p className="text-sm text-muted">Education history will be added soon.</p>
          )}
          {entries.length > 0 && <Timeline entries={entries} />}
        </div>
      </Container>
    </section>
  );
});

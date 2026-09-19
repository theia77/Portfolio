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
      <Container>
        {/* Same right-hand gutter convention as About — anchored to the
            text grid, desktop only, well clear of the timeline column. */}
        <div className="pointer-events-none absolute inset-y-[14%] right-6 hidden w-[32%] lg:block xl:right-16">
          <CinematicVideo
            sectionRef={ref}
            src={surveyingVideo}
            poster={surveyingPoster}
            maxOpacity={0.4}
          />
        </div>

        <div className="relative max-w-2xl">
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
        </div>
      </Container>
    </section>
  );
});

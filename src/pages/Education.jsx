import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { Timeline } from "../components/education/Timeline.jsx";
import { SceneVideo } from "../components/animations/SceneVideo.jsx";
import { education } from "../content/education.js";
import surveyingVideo from "../assets/animations/surveying-contours.mp4";
import surveyingPoster from "../assets/animations/surveying-contours-poster.jpg";

export default function Education() {
  return (
    <>
      <Helmet title="Education" description="Education history and academic timeline." />

      <Container className="py-24 sm:py-32">
        <SectionLabel index="02" label="Education" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-5xl text-ink sm:text-6xl">
          Education
        </RevealText>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
          <Timeline entries={education} />

          <RevealText delay={0.15} className="lg:sticky lg:top-28">
            <div className="mx-auto aspect-video w-full max-w-sm lg:mx-0 lg:max-w-none">
              <SceneVideo src={surveyingVideo} poster={surveyingPoster} />
            </div>
          </RevealText>
        </div>
      </Container>
    </>
  );
}

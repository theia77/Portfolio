import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { Timeline } from "../components/education/Timeline.jsx";
import { education } from "../content/education.js";

export default function Education() {
  return (
    <>
      <Helmet title="Education" description="Education history and academic timeline." />

      <Container className="py-24 sm:py-32">
        <SectionLabel index="02" label="Education" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-5xl text-ink sm:text-6xl">
          Education
        </RevealText>

        <div className="mt-20">
          <Timeline entries={education} />
        </div>
      </Container>
    </>
  );
}

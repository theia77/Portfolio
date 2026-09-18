import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { SectionLabel } from "../components/ui/SectionLabel.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";
import { ArrowLink } from "../components/ui/ArrowLink.jsx";
import { resume } from "../content/resume.js";

export default function Resume() {
  return (
    <>
      <Helmet title="Resume" description="Curriculum vitae — education, experience and work." />

      <Container className="flex min-h-[70vh] flex-col justify-center py-24 sm:py-32">
        <SectionLabel index="04" label="Resume" />

        <RevealText as="h1" delay={0.05} className="mt-6 font-display text-5xl text-ink sm:text-6xl">
          Curriculum vitae
        </RevealText>

        <RevealText delay={0.12} className="mt-6 max-w-md text-lg leading-relaxed text-muted balance">
          {resume.summary}
        </RevealText>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <ArrowLink href={resume.pdfPath}>View resume</ArrowLink>
          <ArrowLink href={resume.pdfPath} download={resume.fileName} direction="down">
            Download PDF
          </ArrowLink>
        </div>
      </Container>
    </>
  );
}

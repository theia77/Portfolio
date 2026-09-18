import { forwardRef } from "react";
import { Container } from "../ui/Container.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { ArrowLink } from "../ui/ArrowLink.jsx";

export const Resume = forwardRef(function Resume({ siteSettings }, ref) {
  const resumeUrl = siteSettings?.resume_url;

  return (
    <section ref={ref} id="resume" className="py-28 sm:py-36">
      <Container>
        <SectionLabel index="04" label="Resume" />

        <RevealText as="h2" delay={0.05} className="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Curriculum vitae
        </RevealText>

        {siteSettings?.resume_summary && (
          <RevealText delay={0.12} className="mt-6 max-w-md text-lg leading-relaxed text-muted balance">
            {siteSettings.resume_summary}
          </RevealText>
        )}

        {resumeUrl ? (
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <ArrowLink href={resumeUrl}>View resume</ArrowLink>
            <ArrowLink
              href={resumeUrl}
              download={siteSettings?.resume_file_name || "resume.pdf"}
              direction="down"
            >
              Download PDF
            </ArrowLink>
          </div>
        ) : (
          <p className="mt-12 text-sm text-muted">Resume link coming soon.</p>
        )}
      </Container>
    </section>
  );
});

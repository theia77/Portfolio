import { useEffect, useRef } from "react";
import { Helmet } from "../components/layout/Helmet.jsx";
import { usePortfolioData } from "../hooks/usePortfolioData.jsx";
import { Hero } from "../components/Sections/Hero.jsx";
import { About } from "../components/Sections/About.jsx";
import { Education } from "../components/Sections/Education.jsx";
import { Work } from "../components/Sections/Work.jsx";
import { Currently } from "../components/Sections/Currently.jsx";
import { Resume } from "../components/Sections/Resume.jsx";
import { Contact } from "../components/Sections/Contact.jsx";

export default function Home() {
  const { status, siteSettings, about, education, projects, skillGroups, socialLinks } =
    usePortfolioData();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const workRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  // Anchor navigation from another route (e.g. /work/:slug -> /#contact)
  // lands here before the target section necessarily has its final
  // height, so scroll once after the first paint rather than relying on
  // the browser's native (pre-render) hash jump.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
  }, []);

  return (
    <>
      <Helmet description={siteSettings?.intro} />

      <Hero ref={heroRef} siteSettings={siteSettings} />
      <About ref={aboutRef} about={about} status={status} />
      <Education ref={educationRef} entries={education} status={status} />
      <Work ref={workRef} projects={projects} status={status} />
      <Currently about={about} skillGroups={skillGroups} />
      <Resume ref={resumeRef} siteSettings={siteSettings} />
      <Contact ref={contactRef} siteSettings={siteSettings} socialLinks={socialLinks} />
    </>
  );
}

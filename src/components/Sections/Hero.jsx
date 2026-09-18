import { forwardRef } from "react";
import { RevealText } from "../ui/RevealText.jsx";
import { ArrowLink } from "../ui/ArrowLink.jsx";
import { CinematicVideo } from "../Video/CinematicVideo.jsx";
import { scrollToSection } from "../../lib/scrollTo.js";
import { fallbackSite } from "../../content/site.js";
import buildingVideo from "../../assets/animations/building-construction.mp4";
import buildingPoster from "../../assets/animations/building-construction-poster.jpg";

function splitName(name) {
  const words = (name || "").trim().split(/\s+/);
  if (words.length <= 1) return [name || "", ""];
  return [words[0], words.slice(1).join(" ")];
}

export const Hero = forwardRef(function Hero({ siteSettings }, ref) {
  const settings = siteSettings || fallbackSite;
  const [first, last] = splitName(settings.name);
  const role = settings.role?.length ? settings.role.join(" / ") : "";

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 sm:pt-20"
    >
      <CinematicVideo
        sectionRef={ref}
        mode="hero"
        src={buildingVideo}
        poster={buildingPoster}
        maxOpacity={0.7}
        priority
        className="inset-y-[6%] left-[28%] right-[-8%] sm:left-[32%] lg:left-[38%]"
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          {role && (
            <RevealText as="p" className="text-xs uppercase tracking-widest2 text-accent">
              {role}
            </RevealText>
          )}

          <RevealText delay={0.08}>
            <h1 className="mt-6 font-display text-6xl leading-[0.95] text-ink sm:text-8xl">
              {first}
              {last && (
                <>
                  <br />
                  {last}
                </>
              )}
            </h1>
          </RevealText>

          {settings.intro && (
            <RevealText delay={0.18} className="mt-8 max-w-md text-lg leading-relaxed text-muted balance">
              {settings.intro}
            </RevealText>
          )}

          <RevealText delay={0.28} className="mt-10">
            <ArrowLink onClick={() => scrollToSection("work")}>Explore work</ArrowLink>
          </RevealText>
        </div>
      </div>
    </section>
  );
});

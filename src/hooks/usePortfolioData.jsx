import { createContext, useContext, useEffect, useState } from "react";
import { fetchSiteSettings } from "../services/siteService.js";
import { fetchAbout } from "../services/aboutService.js";
import { fetchEducation } from "../services/educationService.js";
import { fetchProjects } from "../services/projectService.js";
import { fetchSkillGroups } from "../services/skillsService.js";
import { fetchSocialLinks } from "../services/socialService.js";

const PortfolioDataContext = createContext(null);

const EMPTY_STATE = {
  status: "loading", // "loading" | "ready" | "error"
  siteSettings: null,
  about: null,
  education: [],
  projects: [],
  skillGroups: [],
  socialLinks: [],
  errors: {},
};

/**
 * Loads every piece of editable content from Supabase once, in parallel,
 * on mount. Each field fails independently — one missing/broken table
 * never blanks the rest of the page, it just leaves that section's data
 * empty so its own component can render a graceful fallback.
 */
export function PortfolioDataProvider({ children }) {
  const [state, setState] = useState(EMPTY_STATE);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [site, about, education, projects, skills, socials] = await Promise.all([
        fetchSiteSettings(),
        fetchAbout(),
        fetchEducation(),
        fetchProjects(),
        fetchSkillGroups(),
        fetchSocialLinks(),
      ]);

      if (cancelled) return;

      const errors = {};
      if (site.error) errors.siteSettings = site.error.message;
      if (about.error) errors.about = about.error.message;
      if (education.error) errors.education = education.error.message;
      if (projects.error) errors.projects = projects.error.message;
      if (skills.error) errors.skillGroups = skills.error.message;
      if (socials.error) errors.socialLinks = socials.error.message;

      setState({
        status: "ready",
        siteSettings: site.data,
        about: about.data,
        education: education.data,
        projects: projects.data,
        skillGroups: skills.data,
        socialLinks: socials.data,
        errors,
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioDataContext.Provider value={state}>{children}</PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    throw new Error("usePortfolioData must be used within PortfolioDataProvider");
  }
  return ctx;
}

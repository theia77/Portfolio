import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { nav, sectionIds, fallbackSite } from "../../content/site.js";
import { usePortfolioData } from "../../hooks/usePortfolioData.jsx";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { scrollToSection } from "../../lib/scrollTo.js";
import { Container } from "../ui/Container.jsx";
import { MobileMenu } from "./MobileMenu.jsx";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { siteSettings } = usePortfolioData();
  const activeId = useActiveSection(sectionIds);
  const displayName = siteSettings?.name || fallbackSite.name;
  const onHome = location.pathname === "/";

  function goToSection(id) {
    if (onHome) {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line/40 bg-bg/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-widest2 text-ink transition-colors hover:text-accent"
            onClick={() => setOpen(false)}
          >
            {displayName}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = onHome && activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="relative py-2 text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-ink"
                >
                  <span className="relative">
                    <span className={isActive ? "text-ink" : ""}>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-2 left-0 h-px w-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs uppercase tracking-widest2 text-ink md:hidden"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <MobileMenu
            onClose={() => setOpen(false)}
            activeId={onHome ? activeId : null}
            onNavigate={goToSection}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

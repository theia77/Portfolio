import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { nav } from "../../content/site.js";
import { Line } from "../ui/Line.jsx";

export function MobileMenu({ onClose, activeId, onNavigate }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-bg px-6 pt-6 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex h-10 items-center justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="text-xs uppercase tracking-widest2 text-ink"
        >
          Close
        </button>
      </div>

      <nav className="mt-10 flex flex-1 flex-col justify-center gap-2" aria-label="Primary">
        {nav.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className="flex w-full items-baseline gap-4 border-b border-line/30 py-4 text-left font-display text-4xl text-ink transition-colors hover:text-accent"
              >
                <span className="text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={isActive ? "text-accent" : ""}>{item.label}</span>
              </button>
            </motion.div>
          );
        })}
      </nav>

      <div className="pb-8">
        <Line animate={false} className="mb-4 opacity-40" />
        <p className="text-xs uppercase tracking-widest2 text-muted">
          A personal archive
        </p>
      </div>
    </motion.div>,
    document.body
  );
}

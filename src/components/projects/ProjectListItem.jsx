import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ProjectListItem({ project, index }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor-view
      className="group relative flex flex-col gap-3 border-b border-line/40 py-8 transition-colors first:border-t sm:flex-row sm:items-baseline sm:gap-8 sm:py-10"
    >
      <span className="w-10 shrink-0 font-mono text-xs text-muted font-tabular">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1">
        <motion.h3
          className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h3>
        <span className="mt-1 block h-px w-0 bg-accent transition-all duration-500 ease-editorial group-hover:w-16" />
        {project.short_description && (
          <p className="mt-3 max-w-lg text-sm text-muted">
            {project.short_description}
          </p>
        )}
      </div>

      <div className="shrink-0 text-xs uppercase tracking-widest2 text-muted transition-colors group-hover:text-ink sm:text-right">
        {[project.category, project.year].filter(Boolean).join(" / ")}
      </div>
    </Link>
  );
}

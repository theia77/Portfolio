export function ProjectFilter({ categories, active, onChange }) {
  const options = ["All", ...categories];

  return (
    <div
      className="flex flex-wrap gap-x-6 gap-y-2"
      role="group"
      aria-label="Filter projects by category"
    >
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={`text-xs uppercase tracking-widest2 transition-colors ${
              isActive ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

import { RevealText } from "../ui/RevealText.jsx";

export function TimelineItem({ entry }) {
  const range = [entry.start_year, entry.end_year].filter(Boolean).join(" — ");

  return (
    <RevealText as="div" className="relative pl-10 sm:pl-12">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-accent bg-bg" />

      {range && (
        <div className="font-mono text-xs uppercase tracking-widest2 text-accent font-tabular">
          {range}
        </div>
      )}

      <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
        {entry.institution}
      </h3>
      {entry.degree && <p className="mt-1 text-sm text-muted">{entry.degree}</p>}
      {entry.location && (
        <p className="mt-1 text-xs uppercase tracking-widest2 text-muted">
          {entry.location}
        </p>
      )}

      {entry.description && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/90">
          {entry.description}
        </p>
      )}

      {entry.interests?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {entry.interests.map((interest) => (
            <span key={interest} className="text-xs text-muted">
              {interest}
            </span>
          ))}
        </div>
      )}
    </RevealText>
  );
}

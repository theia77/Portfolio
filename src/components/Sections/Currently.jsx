import { Container } from "../ui/Container.jsx";
import { RevealText } from "../ui/RevealText.jsx";
import { Line } from "../ui/Line.jsx";

/**
 * A quiet coda after Work — no video, no section number. The page
 * calms down here on its way to Resume and Contact.
 */
export function Currently({ about, skillGroups }) {
  const currently = about?.currently?.[0];
  if (!currently && skillGroups.length === 0) return null;

  return (
    <section id="currently" className="relative py-28 sm:py-36">
      <Container>
        <Line animate={false} className="mb-20 opacity-30" />

        {currently && (
          <RevealText as="p" className="max-w-2xl font-display text-2xl leading-snug text-ink sm:text-3xl">
            {currently}
          </RevealText>
        )}

        {skillGroups.length > 0 && (
          <RevealText delay={0.1} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.group}>
                <h3 className="text-xs uppercase tracking-widest2 text-accent">{group.group}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </RevealText>
        )}
      </Container>
    </section>
  );
}

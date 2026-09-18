import { Line } from "../ui/Line.jsx";
import { TimelineItem } from "./TimelineItem.jsx";

/**
 * Renders any number of education entries automatically. The spine on the
 * left is the site's signature line, here interpreted as a timeline.
 */
export function Timeline({ entries }) {
  if (!entries?.length) return null;

  return (
    <div className="relative">
      <div className="absolute left-[5px] top-2 bottom-2 sm:left-[7px]">
        <Line orientation="vertical" className="opacity-70" duration={1.6} />
      </div>

      <div className="space-y-16 sm:space-y-20">
        {entries.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

import { profile } from "@/data/profile";
import { areaEvidence } from "@/data/projects";
import { Section } from "./Section";

export function About() {
  const evidence = areaEvidence();

  return (
    <Section id="about" title="About">
      <div className="max-w-3xl space-y-4">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <h3 className="mb-1 mt-12 text-lg font-semibold text-white">Where I have used what</h3>
      <p className="mb-5 text-sm text-quiet">
        Each bar shows how many of my {evidence[0]?.total ?? 0} listed projects use that area. It is a count, not a rating.
      </p>
      <ul className="max-w-3xl space-y-3">
        {evidence.map(({ area, label, count, total }) => (
          <li key={area} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[14rem_1fr_6rem]">
            <span className="text-sm text-white">{label}</span>
            <span className="text-right text-sm text-quiet sm:order-3">
              {count} of {total}
            </span>
            <span
              role="img"
              aria-label={`${count} of ${total} projects`}
              className="col-span-2 h-2 overflow-hidden rounded-full bg-panel sm:order-2 sm:col-span-1"
            >
              <span
                className="block h-full rounded-full bg-gradient-to-r from-royal to-brand"
                style={{ width: `${total === 0 ? 0 : Math.round((count / total) * 100)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

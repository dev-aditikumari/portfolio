import { experience } from "@/data/background";
import { Section } from "./Section";

export function Experience() {
  const work = experience.filter((item) => item.kind === "work");
  const other = experience.filter((item) => item.kind === "volunteer");

  return (
    <Section id="experience" title="Experience" tone="navy">
      <ul className="space-y-6">
        {work.map((item) => (
          <li key={`${item.organization}-${item.role}`} className="rounded-lg border border-edge bg-panel p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-xl font-semibold text-white">{item.role}</h3>
              <p className="text-sm text-quiet">{item.period}</p>
            </div>
            <p className="mb-3 text-sm text-quiet">
              {item.organization} / {item.location}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 mt-12 text-lg font-semibold text-white">Community</h3>
      <ul className="grid gap-6 md:grid-cols-2">
        {other.map((item) => (
          <li key={item.organization} className="border-l-2 border-brand pl-4">
            <p className="font-semibold text-white">
              {item.role}, {item.organization}
            </p>
            <p className="text-sm text-quiet">
              {item.period} / {item.location}
            </p>
            {item.points.map((point) => (
              <p key={point} className="mt-1 text-sm">
                {point}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </Section>
  );
}

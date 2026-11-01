import { achievements, education } from "@/data/background";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="grid gap-6 md:grid-cols-3">
        {education.map((item) => (
          <li key={item.degree} className="border-l-2 border-royal pl-4">
            <p className="font-semibold text-white">{item.institution}</p>
            <p className="text-sm">{item.degree}</p>
            <p className="text-sm text-quiet">
              {item.period} / {item.location} / {item.result}
            </p>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 mt-12 text-lg font-semibold text-white">Achievements</h3>
      <ul className="grid gap-4 md:grid-cols-3">
        {achievements.map((item) => (
          <li key={item.title} className="rounded-lg border border-edge bg-panel p-5">
            <p className="font-semibold text-white">{item.title}</p>
            <p className="text-sm text-quiet">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

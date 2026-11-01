import { education, experience } from "@/data/background";
import { Section } from "./Section";

export function Background() {
  return (
    <Section id="background" title="Experience and education">
      <h3 className="mb-3 text-lg font-semibold">Experience</h3>
      <ul className="mb-8 space-y-5">
        {experience.map((item) => (
          <li key={item.organization}>
            <p className="font-semibold">
              {item.role}, {item.organization}
            </p>
            <p className="text-sm text-muted">
              {item.period} / {item.location}
            </p>
            <p className="mt-1 max-w-2xl">{item.description}</p>
          </li>
        ))}
      </ul>
      <h3 className="mb-3 text-lg font-semibold">Education</h3>
      <ul className="space-y-5">
        {education.map((item) => (
          <li key={item.degree}>
            <p className="font-semibold">{item.institution}</p>
            <p>{item.degree}</p>
            <p className="text-sm text-muted">
              {item.period} / {item.location} / {item.result}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

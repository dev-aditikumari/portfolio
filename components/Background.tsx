import { education, experience } from "@/data/background";
import { Section } from "./Section";

export function Background() {
  return (
    <Section id="background" title="Background" tone="navy">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">Experience</h3>
          <ul className="space-y-6">
            {experience.map((item) => (
              <li key={item.organization} className="border-l-2 border-brand pl-4">
                <p className="font-semibold text-white">
                  {item.role}, {item.organization}
                </p>
                <p className="text-sm text-quiet">
                  {item.period} / {item.location}
                </p>
                <p className="mt-1 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">Education</h3>
          <ul className="space-y-6">
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
        </div>
      </div>
    </Section>
  );
}

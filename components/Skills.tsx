import { skillGroups, skillIcons } from "@/data/skills";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" tone="navy">
      <div className="grid gap-8 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <div key={group.name} role="group" aria-labelledby={`skills-group-${index}`}>
            <h3 id={`skills-group-${index}`} className="mb-3 text-lg font-semibold text-white">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 rounded border border-edge bg-panel px-3 py-2 text-sm text-white"
                >
                  <Icon name={skillIcons[skill] ?? "code"} className="h-4 w-4 text-quiet" />
                  {skill}
                </li>
              ))}
            </ul>
            {group.note && <p className="mt-2 text-sm text-quiet">{group.note}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

import { skillChips, skillGroups } from "@/data/skills";
import { Icon } from "./Icon";
import { Section } from "./Section";
import { SkillsList } from "./SkillsList";

export function Skills() {
  return (
    <Section id="skills" title="Skills" tone="navy">
      <ul aria-label="Tools and technologies I have used in my projects" className="flex flex-wrap gap-3">
        {skillChips.map((chip) => (
          <li
            key={chip.name}
            className="flex items-center gap-2 rounded border border-edge bg-panel px-3 py-2 text-sm text-white"
          >
            <Icon name={chip.icon} className="h-4 w-4 text-quiet" />
            {chip.name}
          </li>
        ))}
      </ul>
      <details className="mt-10 max-w-3xl">
        <summary className="cursor-pointer text-white underline underline-offset-4">Full skill list by area</summary>
        <div className="mt-5">
          <SkillsList groups={skillGroups} />
        </div>
      </details>
    </Section>
  );
}

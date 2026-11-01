import { skillGroups } from "@/data/skills";
import { Section } from "./Section";
import { SkillsList } from "./SkillsList";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <SkillsList groups={skillGroups} />
    </Section>
  );
}

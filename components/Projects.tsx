import { projects } from "@/data/projects";
import { ProjectGrid } from "./ProjectGrid";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ProjectGrid projects={projects} />
    </Section>
  );
}

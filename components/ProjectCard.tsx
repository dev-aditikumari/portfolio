import type { Project } from "@/data/types";

const linkClass = "font-medium text-accent underline underline-offset-2 hover:text-blue-900";

export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className="flex h-full flex-col rounded border border-line p-5">
      <h3 id={headingId} className="mb-2 text-lg font-bold">
        {project.name}
      </h3>
      <p className="mb-3">{project.summary}</p>
      {project.features && (
        <ul className="mb-3 list-disc pl-5 text-sm text-muted">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
      <ul aria-label={`${project.name} stack`} className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded border border-line bg-soft px-2 py-0.5 text-xs">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 text-sm">
        {project.liveUrl && (
          <a href={project.liveUrl} className={linkClass} target="_blank" rel="noopener noreferrer">
            Live demo<span className="sr-only"> of {project.name}</span>
          </a>
        )}
        <a href={project.codeUrl} className={linkClass} target="_blank" rel="noopener noreferrer">
          Source code<span className="sr-only"> of {project.name}</span>
        </a>
      </div>
    </article>
  );
}

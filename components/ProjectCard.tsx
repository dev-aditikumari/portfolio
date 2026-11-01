import Image from "next/image";
import type { Project } from "@/data/types";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-edge bg-panel"
    >
      {project.image ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.image.src}`}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          priority={priority}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[16/10] w-full items-center justify-center bg-navy text-4xl font-semibold tracking-wide text-quiet"
        >
          {project.name
            .split(/\s+/)
            .map((w) => w[0])
            .join("")
            .slice(0, 3)
            .toUpperCase()}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 id={headingId} className="mb-2 text-lg font-semibold text-white">
          {project.name}
        </h3>
        <p className="mb-3 text-sm">{project.summary}</p>
        {project.features && (
          <ul className="mb-3 list-disc pl-5 text-sm text-quiet">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
        <ul aria-label={`${project.name} stack`} className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded border border-edge px-2 py-0.5 text-xs text-quiet">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3">
          {project.codeUrl && (
            <a href={project.codeUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> repository of {project.name}</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="btn-solid" target="_blank" rel="noopener noreferrer">
              Live demo<span className="sr-only"> of {project.name}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

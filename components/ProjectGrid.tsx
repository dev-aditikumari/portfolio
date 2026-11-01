"use client";

import { useState } from "react";
import { categoryLabels } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/types";
import { ProjectCard } from "./ProjectCard";

type Filter = "latest" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "latest", label: "Latest" },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({ id, label: categoryLabels[id] })),
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("latest");
  const visible = filter === "latest" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id ? "bg-brand text-white" : "border border-edge text-copy hover:border-white hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {visible.length} of {projects.length} projects
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} priority={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

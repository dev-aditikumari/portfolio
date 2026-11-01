import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="mb-2 text-muted">{profile.role}</p>
      <h1 id="hero-title" className="mb-4 text-4xl font-bold sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mb-8 max-w-2xl text-lg text-muted">{profile.headline}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded border border-accent bg-accent px-4 py-2 font-medium text-white hover:bg-blue-800"
        >
          View projects
        </a>
        <a
          href={profile.resumePath}
          download
          className="rounded border border-ink px-4 py-2 font-medium hover:bg-soft"
        >
          Download resume
        </a>
      </div>
    </section>
  );
}

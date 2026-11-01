import { profile } from "@/data/profile";

export function AtAGlance() {
  return (
    <section aria-label="At a glance" className="bg-navy py-10">
      <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {profile.facts.map((fact) => (
          <div key={fact.label} className="border-l-2 border-brand pl-4">
            <dt className="text-xs uppercase tracking-wide text-quiet">{fact.label}</dt>
            <dd className="mt-1 font-medium text-white">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

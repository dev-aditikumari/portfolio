import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  tone?: "dark" | "navy";
  aside?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, tone = "dark", aside, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`py-16 sm:py-24 ${tone === "navy" ? "bg-navy" : "bg-night"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex items-center gap-4">
          <h2 id={`${id}-title`} className="text-4xl font-bold text-white sm:text-6xl">
            {title}
            <span aria-hidden="true" className="ml-1 inline-block h-2 w-2 rounded-full bg-brand" />
          </h2>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-brand to-royal sm:block" />
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}

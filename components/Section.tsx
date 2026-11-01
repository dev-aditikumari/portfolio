import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 id={`${id}-title`} className="mb-6 text-2xl font-bold">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

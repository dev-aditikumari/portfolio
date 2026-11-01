import { profile } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-4">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

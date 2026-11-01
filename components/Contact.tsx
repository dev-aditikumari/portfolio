import { profile } from "@/data/profile";
import { Section } from "./Section";

const linkClass = "font-medium text-accent underline underline-offset-2 hover:text-blue-900";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="mb-4 max-w-2xl">
        The best way to reach me is by email. I read every message.
      </p>
      <ul className="space-y-2">
        <li>
          Email:{" "}
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </li>
        {profile.links.map((link) => (
          <li key={link.url}>
            {link.label}:{" "}
            <a href={link.url} className={linkClass} target="_blank" rel="noopener noreferrer">
              {link.url.replace(/^https:\/\/(www\.)?/, "")}
            </a>
          </li>
        ))}
        <li>
          <a href={profile.resumePath} download className={linkClass}>
            Download resume (PDF)
          </a>
        </li>
      </ul>
    </Section>
  );
}

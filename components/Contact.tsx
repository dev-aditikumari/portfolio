import { profile } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";

const linkClass = "text-white underline underline-offset-4 hover:text-quiet";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Drop a comment</h3>
          <p className="mb-6 max-w-md">The best way to reach me is by email, or use the form.</p>
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
        </div>
        <ContactForm email={profile.email} />
      </div>
    </Section>
  );
}

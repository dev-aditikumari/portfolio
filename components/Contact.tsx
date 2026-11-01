import { profile } from "@/data/profile";
import { ResumeLinks } from "./ResumeLinks";
import { Availability } from "./Availability";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";

const linkClass = "text-white underline underline-offset-4 hover:text-quiet";

export function Contact() {
  return (
    <Section id="contact" title="Contact" tone="navy">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Hiring? Get in touch</h3>
          <div className="mb-4">
            <Availability />
          </div>
          <p className="mb-6 max-w-md">Available to join immediately. Email me, or use the form.</p>
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
          </ul>
          <h4 className="mb-2 mt-6 text-sm font-semibold text-white">Download resume (PDF)</h4>
          <ResumeLinks variant="text" linkClass={linkClass} />
        </div>
        <ContactForm email={profile.email} />
      </div>
    </Section>
  );
}

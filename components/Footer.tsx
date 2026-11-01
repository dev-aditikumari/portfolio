import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { Logo } from "./Logo";
import { ResumeLinks } from "./ResumeLinks";

const linkClass = "text-quiet hover:text-white";

export function Footer() {
  const github = profile.links.find((l) => l.label === "GitHub");

  return (
    <footer className="border-t border-edge bg-navy py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-lg font-medium text-white">Let&apos;s build together</p>
          <p className="mt-1 text-sm text-quiet">Available to join immediately</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Explore</h2>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Elsewhere</h2>
          <ul className="space-y-2 text-sm">
            {profile.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                Email
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Resumes</h2>
          <div className="text-sm">
            <ResumeLinks variant="text" linkClass={linkClass} />
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-sm text-quiet sm:px-6">
        &copy; {new Date().getFullYear()} {profile.name}.{" "}
        {github && (
          <a href={github.url} className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener noreferrer">
            github.com/dev-aditikumari
          </a>
        )}
      </p>
    </footer>
  );
}

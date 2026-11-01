import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { profile } from "@/data/profile";

const iconFor: Record<string, IconType> = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, LeetCode: SiLeetcode, CodeChef: SiCodechef };

export function SocialLinks() {
  const items = [
    ...profile.links.map((l) => ({ label: l.label, href: l.url, Icon: iconFor[l.label] ?? FaGithub, external: true })),
    { label: "Email", href: `mailto:${profile.email}`, Icon: FaEnvelope, external: false },
  ];

  return (
    <ul aria-label="Social links" className="flex gap-3">
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-quiet text-quiet hover:border-white hover:text-white"
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

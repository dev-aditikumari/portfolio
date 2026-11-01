import { profile } from "@/data/profile";

export function Logo() {
  return (
    <a href="#top" aria-label={`${profile.initials}, ${profile.name}, back to top`} className="text-xl font-bold tracking-wide text-white">
      {profile.initials}
    </a>
  );
}

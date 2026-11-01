import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-6 text-sm text-muted">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p>{profile.name}. Built with Next.js, TypeScript and Tailwind CSS.</p>
      </div>
    </footer>
  );
}

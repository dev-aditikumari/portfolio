import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-4xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a href="#top" className="font-bold">
          {profile.name}
        </a>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-block py-1 text-muted hover:text-ink hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

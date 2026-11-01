import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-edge/60 bg-night/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="order-3 w-full sm:order-2 sm:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-block py-1 text-quiet hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={profile.resumePath} download className="btn-outline order-2 sm:order-3">
          Download CV
        </a>
      </div>
    </header>
  );
}

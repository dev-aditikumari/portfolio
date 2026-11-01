import { profile } from "@/data/profile";
import { SocialLinks } from "./SocialLinks";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="px-4 pb-16 pt-36 sm:px-6 sm:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="text-2xl font-light text-white sm:text-4xl">
          I&apos;m <span className="font-medium">{profile.name}</span>
        </p>
        <h1 id="hero-title" className="gradient-text mt-2 text-5xl font-medium leading-tight sm:text-7xl lg:text-8xl">
          {profile.role}
        </h1>
        <div aria-hidden="true" className="gradient-text reflection -mt-2 select-none text-5xl font-medium leading-tight sm:text-7xl lg:text-8xl">
          {profile.role}
        </div>
        <p className="mt-6 max-w-2xl text-lg text-copy">{profile.headline}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <SocialLinks />
          <a href="#projects" className="btn-solid">
            View projects
          </a>
        </div>
      </div>
    </section>
  );
}

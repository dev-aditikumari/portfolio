import fs from "node:fs";
import path from "node:path";
import { education, experience } from "@/data/background";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { areaEvidence, categoryLabels, projects } from "@/data/projects";
import { skillChips, skillGroups } from "@/data/skills";
import { knownIcons } from "@/components/Icon";

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it.each(projects.map((p) => [p.name, p] as const))("%s has all required fields", (_name, project) => {
    expect(project.slug).toMatch(/^[a-z0-9-]+$/);
    expect(project.name.trim()).not.toBe("");
    expect(project.summary.trim()).not.toBe("");
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.stack.every((tech) => tech.trim() !== "")).toBe(true);
  });

  it.each(projects.map((p) => [p.name, p] as const))("%s has well-formed https URLs", (_name, project) => {
    if (project.codeUrl !== undefined) expect(isHttpsUrl(project.codeUrl)).toBe(true);
    if (project.liveUrl !== undefined) expect(isHttpsUrl(project.liveUrl)).toBe(true);
  });

  it.each(projects.map((p) => [p.name, p] as const))("%s has valid categories and areas", (_name, project) => {
    expect(project.categories.length).toBeGreaterThan(0);
    for (const c of project.categories) expect(Object.keys(categoryLabels)).toContain(c);
  });

  it("has an existing image file with alt text where an image is set", () => {
    for (const project of projects) {
      if (!project.image) continue;
      expect(fs.existsSync(path.join(process.cwd(), "public", project.image.src))).toBe(true);
      expect(project.image.alt.trim().length).toBeGreaterThan(5);
      expect(project.image.width).toBeGreaterThan(0);
      expect(project.image.height).toBeGreaterThan(0);
    }
  });

  it("includes every category in at least one project", () => {
    for (const c of Object.keys(categoryLabels)) {
      expect(projects.some((p) => p.categories.includes(c as never))).toBe(true);
    }
  });

  it("only lists the live demos that exist", () => {
    const live = projects.filter((p) => p.liveUrl).map((p) => p.slug).sort();
    expect(live).toEqual(["nextmeet", "skillora"]);
  });

  it("area evidence counts never exceed the number of projects", () => {
    for (const e of areaEvidence()) {
      expect(e.total).toBe(projects.length);
      expect(e.count).toBeGreaterThan(0);
      expect(e.count).toBeLessThanOrEqual(e.total);
    }
  });

  it("links only the projects whose repositories are public", () => {
    const withoutLink = projects.filter((p) => !p.codeUrl).map((p) => p.slug);
    expect(withoutLink).toEqual(["dsa-cpp"]);
  });

  it("keeps Zink and NextMeet as separate projects with their own repositories", () => {
    const zink = projects.find((p) => p.slug === "zink");
    const next = projects.find((p) => p.slug === "nextmeet");
    expect(zink?.codeUrl).toMatch(/Zink-Conferencing-Platform$/);
    expect(next?.codeUrl).toMatch(/Nextmeet$/);
    expect(zink?.liveUrl).toBeUndefined();
  });

  it("does not describe the DSA project as TypeScript", () => {
    const dsa = projects.find((p) => p.slug === "dsa-cpp");
    expect(dsa?.stack).toEqual(["C++"]);
    expect(JSON.stringify(dsa)).not.toMatch(/typescript/i);
  });

  it("uses unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("skills data", () => {
  it("has non-empty groups with non-empty skills", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.name.trim()).not.toBe("");
      expect(group.skills.length).toBeGreaterThan(0);
      expect(group.skills.every((s) => s.trim() !== "")).toBe(true);
    }
  });

  it("has an icon for every skill chip and no duplicate chips", () => {
    for (const chip of skillChips) expect(knownIcons).toContain(chip.icon);
    const names = skillChips.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has no duplicate skills inside a group", () => {
    for (const group of skillGroups) {
      expect(new Set(group.skills).size).toBe(group.skills.length);
    }
  });
});

describe("profile data", () => {
  it("points to a resume file that exists in public/", () => {
    const file = path.join(process.cwd(), "public", profile.resumePath);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.statSync(file).size).toBeGreaterThan(0);
  });

  it("has a valid email and https links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(isHttpsUrl(profile.siteUrl)).toBe(true);
    for (const link of profile.links) expect(isHttpsUrl(link.url)).toBe(true);
  });

  it("does not contain a phone number", () => {
    const text = collectStrings(profile).join(" ");
    expect(text).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });

  it("navigation targets are unique anchors", () => {
    const hrefs = navItems.map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href).toMatch(/^#[a-z-]+$/);
  });
});

describe("placeholder text", () => {
  it("does not appear in any data string", () => {
    const all = collectStrings([profile, projects, skillGroups, skillChips, education, experience, navItems]);
    expect(all.length).toBeGreaterThan(0);
    for (const text of all) {
      expect(text).not.toMatch(/lorem/i);
      expect(text).not.toMatch(/todo/i);
    }
  });
});

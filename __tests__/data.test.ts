import fs from "node:fs";
import path from "node:path";
import { education, experience } from "@/data/background";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

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
    expect(isHttpsUrl(project.codeUrl)).toBe(true);
    if (project.liveUrl !== undefined) expect(isHttpsUrl(project.liveUrl)).toBe(true);
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
    const all = collectStrings([profile, projects, skillGroups, education, experience, navItems]);
    expect(all.length).toBeGreaterThan(0);
    for (const text of all) {
      expect(text).not.toMatch(/lorem/i);
      expect(text).not.toMatch(/todo/i);
    }
  });
});

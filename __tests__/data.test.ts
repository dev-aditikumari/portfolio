import fs from "node:fs";
import path from "node:path";
import { achievements, education, experience } from "@/data/background";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { areaEvidence, categoryLabels, projects } from "@/data/projects";
import { skillGroups, skillIcons } from "@/data/skills";
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

  it("gives every project a GitHub link except the private work project", () => {
    expect(projects.filter((p) => !p.codeUrl).map((p) => p.slug)).toEqual(["traceability-report"]);
    const work = projects.find((p) => p.slug === "traceability-report");
    expect(work?.note).toBe("Built at work; source is private.");
    expect(work?.liveUrl).toBeUndefined();
    expect(work?.categories).toEqual(expect.arrayContaining(["work", "full-stack", "backend-data", "frontend"]));
    expect(projects.find((p) => p.slug === "dsa-cpp")?.codeUrl).toBe("https://github.com/dev-aditikumari/dsa-cpp");
  });

  it("lists the twelve projects in the intended order", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "traceability-report",
      "skillora",
      "nextmeet",
      "zink",
      "lets-talk",
      "shopper",
      "react-implementations",
      "devops-notes-service",
      "festival-sales",
      "academic-insight-engine",
      "sql-practice",
      "dsa-cpp",
    ]);
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
    expect(dsa?.summary).toBe("Data structures and algorithms in C++.");
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

  it("maps icons only to known icon keys and to skills that exist", () => {
    const all = skillGroups.flatMap((g) => g.skills);
    for (const [skill, icon] of Object.entries(skillIcons)) {
      expect(all).toContain(skill);
      expect(knownIcons).toContain(icon);
    }
  });

  it("has the seven groups in the intended order", () => {
    expect(skillGroups.map((g) => g.name)).toEqual([
      "Languages",
      "Frontend",
      "Backend & APIs",
      "Databases",
      "Cloud & Data",
      "Testing & DevOps",
      "Fundamentals",
    ]);
  });

  it("does not link work-only Azure and Spark skills to a project", () => {
    const cloud = skillGroups.find((g) => g.name === "Cloud & Data");
    expect(cloud?.note).toMatch(/not in my public repositories/);
    for (const skill of ["Azure Data Factory", "Microsoft Fabric", "PySpark"]) {
      expect(projects.some((p) => p.stack.includes(skill))).toBe(false);
    }
  });

  it("has no duplicate skills inside a group", () => {
    for (const group of skillGroups) {
      expect(new Set(group.skills).size).toBe(group.skills.length);
    }
  });
});

describe("profile data", () => {
  it("points to resume files that exist in public/", () => {
    for (const p of [profile.resumePath, ...profile.resumes.map((r) => r.path)]) {
      const file = path.join(process.cwd(), "public", p);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeGreaterThan(0);
    }
  });

  it("offers a UI-focused and a backend and data-focused resume", () => {
    expect(profile.resumes.map((r) => r.label)).toEqual(["Resume: UI-focused", "Resume: Backend & data-focused"]);
    expect(profile.resumes.map((r) => r.path)).toEqual([
      "/Aditi-Kumari-Resume-UI.pdf",
      "/Aditi-Kumari-Resume-Backend.pdf",
    ]);
  });

  it("uses the agreed tagline and avoids narrow job titles in copy", () => {
    expect(profile.headline).toBe(
      "I build across the stack: React interfaces, Node.js and REST APIs, SQL and data pipelines.",
    );
    const text = collectStrings([profile, projects, experience, achievements]).join(" ");
    expect(text).not.toMatch(/(front|back)end engineer|full[- ]stack (engineer|developer)|nexmeet/i);
    expect(text).not.toMatch(/\d+\s?%\s+(faster|reduc|saving)|hours saved|every PBI|all test cases/i);
  });

  it("has a valid email and https links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(isHttpsUrl(profile.siteUrl)).toBe(true);
    for (const link of profile.links) expect(isHttpsUrl(link.url)).toBe(true);
  });

  it("has the owner's profile links and email", () => {
    const byLabel = Object.fromEntries(profile.links.map((l) => [l.label, l.url]));
    expect(byLabel).toEqual({
      GitHub: "https://github.com/dev-aditikumari",
      LinkedIn: "https://www.linkedin.com/in/aditikumari35355/",
      LeetCode: "https://leetcode.com/u/dev-aditikumari/",
      CodeChef: "https://www.codechef.com/users/devaditikumari",
    });
    expect(profile.email).toBe("aditikumari35355@gmail.com");
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

describe("recruiter content", () => {
  it("states availability and has the resume facts", () => {
    expect(profile.availability).toBe("Immediate joiner");
    const text = profile.facts.map((f) => `${f.label} ${f.value}`).join(" ");
    expect(text).toMatch(/MAQ Software/);
    expect(text).toMatch(/8\.28/);
    expect(text).toMatch(/1500\+/);
  });

  it("has both MAQ Software roles with bullet points", () => {
    const maq = experience.filter((e) => e.organization === "MAQ Software");
    expect(maq.map((e) => e.role)).toEqual(["Software Engineer I", "Associate Software Engineer"]);
    for (const e of maq) expect(e.points.length).toBeGreaterThanOrEqual(3);
  });

  it("lists the three achievements", () => {
    expect(achievements.map((a) => a.title)).toEqual([
      "LeetCode Global Rank 5303",
      "CodeChef Global Rank 1134",
      "1500+ problems solved",
    ]);
  });

  it("has no pricing, freelance or hire-me-for-money wording", () => {
    const text = collectStrings([profile, projects, skillGroups, education, experience, achievements]).join(" ");
    expect(text).not.toMatch(/pricing|per month|freelanc|rates|quote/i);
  });
});

describe("placeholder text", () => {
  it("does not appear in any data string", () => {
    const all = collectStrings([profile, projects, skillGroups, education, experience, achievements, navItems]);
    expect(all.length).toBeGreaterThan(0);
    for (const text of all) {
      expect(text).not.toMatch(/lorem/i);
      expect(text).not.toMatch(/todo/i);
    }
  });
});

import { render, screen, within } from "@testing-library/react";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Projects } from "@/components/Projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsList } from "@/components/SkillsList";
import Home from "@/app/page";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import type { Project } from "@/data/types";

const withLive: Project = {
  slug: "demo",
  name: "Demo",
  summary: "A demo project.",
  stack: ["React", "Node.js"],
  features: ["Feature one"],
  liveUrl: "https://demo.example.com",
  codeUrl: "https://github.com/example/demo",
};

describe("ProjectCard", () => {
  it("renders name, summary, stack and features", () => {
    render(<ProjectCard project={withLive} />);
    expect(screen.getByRole("heading", { name: "Demo" })).toBeInTheDocument();
    expect(screen.getByText("A demo project.")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Feature one")).toBeInTheDocument();
  });

  it("links to the live demo and source code in a safe way", () => {
    render(<ProjectCard project={withLive} />);
    const live = screen.getByRole("link", { name: /live demo of demo/i });
    const code = screen.getByRole("link", { name: /source code of demo/i });
    expect(live).toHaveAttribute("href", "https://demo.example.com");
    expect(code).toHaveAttribute("href", "https://github.com/example/demo");
    for (const link of [live, code]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("omits the live demo link when there is none", () => {
    const { liveUrl: _liveUrl, ...noLive } = withLive;
    render(<ProjectCard project={noLive} />);
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source code/i })).toBeInTheDocument();
  });
});

describe("Projects section", () => {
  it("renders one card per project in the data file", () => {
    render(<Projects />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });
});

describe("SkillsList", () => {
  it("renders every group and skill", () => {
    render(<SkillsList groups={skillGroups} />);
    for (const group of skillGroups) {
      expect(screen.getByText(group.name)).toBeInTheDocument();
    }
    const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);
    expect(screen.getAllByRole("listitem")).toHaveLength(total);
  });

  it("renders only the groups it is given", () => {
    render(<SkillsList groups={[{ name: "Only", skills: ["One", "Two"] }]} />);
    expect(screen.getByText("Only")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("Header navigation", () => {
  it("has a labelled nav with a link for each section", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const item of navItems) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
  });
});

describe("Contact", () => {
  it("has a mailto link with the profile email", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });

  it("has a resume download link", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", profile.resumePath);
    expect(link).toHaveAttribute("download");
  });
});

describe("Home page", () => {
  it("has a skip link, one h1 and a section for every nav item", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    for (const item of navItems) {
      expect(container.querySelector(item.href)).not.toBeNull();
    }
  });
});

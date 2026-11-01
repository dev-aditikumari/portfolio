import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SkillsList } from "@/components/SkillsList";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillChips, skillGroups } from "@/data/skills";
import type { Project } from "@/data/types";

const withLive: Project = {
  slug: "demo",
  name: "Demo",
  summary: "A demo project.",
  stack: ["React", "Node.js"],
  categories: ["full-stack"],
  areas: ["frontend"],
  features: ["Feature one"],
  image: { src: "/projects/skillora.jpg", alt: "Demo screenshot", width: 800, height: 500 },
  liveUrl: "https://demo.example.com",
  codeUrl: "https://github.com/example/demo",
};

describe("ProjectCard", () => {
  it("renders name, summary, stack, features and the screenshot", () => {
    render(<ProjectCard project={withLive} />);
    expect(screen.getByRole("heading", { name: "Demo" })).toBeInTheDocument();
    expect(screen.getByText("A demo project.")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Feature one")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Demo screenshot" })).toBeInTheDocument();
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

  it("omits the source link for a project without a public repository", () => {
    const { codeUrl: _codeUrl, ...noCode } = withLive;
    render(<ProjectCard project={noCode} />);
    expect(screen.queryByRole("link", { name: /source code/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /live demo/i })).toBeInTheDocument();
  });

  it("omits the live link and shows an initials block when there is no image", () => {
    const { liveUrl: _liveUrl, image: _image, ...plain } = { ...withLive, name: "Plain Card" };
    render(<ProjectCard project={plain} />);
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source code/i })).toBeInTheDocument();
  });
});

describe("ProjectGrid filters", () => {
  it("shows every project under Latest", () => {
    render(<ProjectGrid projects={projects} />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "Latest" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters by category and announces the count", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid projects={projects} />);
    await user.click(screen.getByRole("button", { name: "Frontend" }));
    const expected = projects.filter((p) => p.categories.includes("frontend")).length;
    expect(screen.getAllByRole("article")).toHaveLength(expected);
    expect(screen.getByRole("button", { name: "Frontend" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Latest" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${expected} of ${projects.length}`);
  });

  it("only shows backend and data projects under that tab", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid projects={projects} />);
    await user.click(screen.getByRole("button", { name: "Backend and data" }));
    const names = projects.filter((p) => p.categories.includes("backend-data")).map((p) => p.name);
    for (const name of names) expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Skillora" })).not.toBeInTheDocument();
  });
});

describe("Projects section", () => {
  it("renders one card per project in the data file", () => {
    render(<Projects />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });
});

describe("Skills", () => {
  it("renders a chip for every skill with an icon", () => {
    const { container } = render(<Skills />);
    const list = screen.getByRole("list", { name: /tools and technologies/i });
    expect(within(list).getAllByRole("listitem")).toHaveLength(skillChips.length);
    expect(container.querySelectorAll("li svg").length).toBeGreaterThanOrEqual(skillChips.length);
  });
});

describe("SkillsList", () => {
  it("renders every group and skill", () => {
    render(<SkillsList groups={skillGroups} />);
    for (const group of skillGroups) expect(screen.getByText(group.name)).toBeInTheDocument();
    const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);
    expect(screen.getAllByRole("listitem")).toHaveLength(total);
  });

  it("renders only the groups it is given", () => {
    render(<SkillsList groups={[{ name: "Only", skills: ["One", "Two"] }]} />);
    expect(screen.getByText("Only")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("About", () => {
  it("labels the bars as counts of projects, not ratings", () => {
    render(<About />);
    expect(screen.getByText(/it is a count, not a rating/i)).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /\d+ of \d+ projects/ }).length).toBeGreaterThan(0);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});

describe("Header navigation", () => {
  it("has a labelled nav with a link for each section and a CV download", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const item of navItems) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
    const cv = screen.getByRole("link", { name: "Download CV" });
    expect(cv).toHaveAttribute("href", profile.resumePath);
    expect(cv).toHaveAttribute("download");
  });
});

describe("Hero and marquee", () => {
  it("shows the name, the role as the only h1 and a reflection hidden from assistive tech", () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: profile.role })).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"].reflection')).not.toBeNull();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/dev-aditikumari");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("hides the decorative marquee from assistive tech", () => {
    const { container } = render(<Marquee />);
    const bands = container.querySelectorAll('[aria-hidden="true"]');
    expect(bands.length).toBe(2);
    expect(container.textContent).toContain("MERN");
  });
});

describe("Contact", () => {
  it("has a mailto link with the profile email and a resume link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", `mailto:${profile.email}`);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", profile.resumePath);
    expect(link).toHaveAttribute("download");
    expect(screen.getByRole("form", { name: "Contact form" })).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("has columns, the tagline, the year and the GitHub link", () => {
    render(<Footer />);
    expect(screen.getByText(/let's build together/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github.com/dev-aditikumari" })).toHaveAttribute(
      "href",
      "https://github.com/dev-aditikumari",
    );
  });
});

describe("Home page", () => {
  it("has a skip link, one h1 and a section for every nav item", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    for (const item of navItems) expect(container.querySelector(item.href)).not.toBeNull();
  });
});

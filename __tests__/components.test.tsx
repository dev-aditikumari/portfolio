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
import { Availability } from "@/components/Availability";
import { AtAGlance } from "@/components/AtAGlance";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { achievements, education, experience } from "@/data/background";
import { skillGroups } from "@/data/skills";
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

  it("links to the live demo and GitHub in a safe way", () => {
    render(<ProjectCard project={withLive} />);
    const live = screen.getByRole("link", { name: /live demo of demo/i });
    const code = screen.getByRole("link", { name: /github repository of demo/i });
    expect(live).toHaveAttribute("href", "https://demo.example.com");
    expect(code).toHaveAttribute("href", "https://github.com/example/demo");
    for (const link of [live, code]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("omits the GitHub link for a project without a public repository", () => {
    const { codeUrl: _codeUrl, ...noCode } = withLive;
    render(<ProjectCard project={noCode} />);
    expect(screen.queryByRole("link", { name: /github repository/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /live demo/i })).toBeInTheDocument();
  });

  it("omits the live link and shows an initials block when there is no image", () => {
    const { liveUrl: _liveUrl, image: _image, ...plain } = { ...withLive, name: "Plain Card" };
    render(<ProjectCard project={plain} />);
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github repository/i })).toBeInTheDocument();
  });
});

describe("ProjectGrid filters", () => {
  it("shows every project under All", () => {
    render(<ProjectGrid projects={projects} />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters by category and announces the count", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid projects={projects} />);
    await user.click(screen.getByRole("button", { name: "Frontend" }));
    const expected = projects.filter((p) => p.categories.includes("frontend")).length;
    expect(screen.getAllByRole("article")).toHaveLength(expected);
    expect(screen.getByRole("button", { name: "Frontend" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
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
  it("renders every group with icon chips and the work-only note", () => {
    const { container } = render(<Skills />);
    for (const group of skillGroups) {
      const g = screen.getByRole("group", { name: group.name });
      expect(within(g).getAllByRole("listitem")).toHaveLength(group.skills.length);
    }
    const total = skillGroups.reduce((n, gr) => n + gr.skills.length, 0);
    expect(container.querySelectorAll("li svg")).toHaveLength(total);
    expect(screen.getByText(/not in my public repositories/i)).toBeInTheDocument();
  });
});

describe("Availability", () => {
  it("shows the badge text with a decorative dot", () => {
    const { container } = render(<Availability />);
    expect(screen.getByText("Immediate joiner")).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
});

describe("AtAGlance", () => {
  it("shows every fact from the profile", () => {
    render(<AtAGlance />);
    expect(screen.getByText(/Software Engineer I, MAQ Software/)).toBeInTheDocument();
    expect(screen.getByText(/CGPA 8\.28/)).toBeInTheDocument();
    expect(screen.getByText("1500+ problems solved")).toBeInTheDocument();
    expect(screen.getByText("Bengaluru")).toBeInTheDocument();
  });
});

describe("Experience", () => {
  it("shows both MAQ Software roles with all their bullets", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { name: "Software Engineer I" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Associate Software Engineer" })).toBeInTheDocument();
    for (const item of experience.filter((e) => e.kind === "work")) {
      for (const point of item.points) expect(screen.getByText(point)).toBeInTheDocument();
    }
    expect(screen.getByText("Curriculum Lead, WeCan, NIT Agartala")).toBeInTheDocument();
  });
});

describe("Education", () => {
  it("shows education entries and achievements", () => {
    render(<Education />);
    for (const item of education) expect(screen.getAllByText(item.institution).length).toBeGreaterThan(0);
    for (const a of achievements) expect(screen.getByText(a.title)).toBeInTheDocument();
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
    const cv = screen.getByRole("link", { name: "Download resume" });
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
    expect(screen.getByText("Immediate joiner")).toBeInTheDocument();
    const resume = screen.getByRole("link", { name: "Download resume" });
    expect(resume).toHaveAttribute("href", profile.resumePath);
    for (const label of ["LeetCode", "CodeChef", "LinkedIn"]) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("target", "_blank");
    }
    expect(screen.queryByRole("link", { name: /codeforces/i })).toBeNull();
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("hides the decorative marquee from assistive tech", () => {
    const { container } = render(<Marquee />);
    const bands = container.querySelectorAll('[aria-hidden="true"]');
    expect(bands.length).toBe(2);
    expect(container.textContent).toContain("Backend");
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
    expect(screen.getByText("Available to join immediately")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github.com/dev-aditikumari" })).toHaveAttribute(
      "href",
      "https://github.com/dev-aditikumari",
    );
  });
});

describe("Project cards on the page", () => {
  it("gives every project a GitHub link to its own repository", () => {
    render(<Projects />);
    const hrefs = screen.getAllByRole("link", { name: /github repository/i }).map((a) => a.getAttribute("href"));
    expect(hrefs).toHaveLength(projects.length);
    expect(new Set(hrefs).size).toBe(projects.length);
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it("keeps Zink and NextMeet distinct", () => {
    render(<Projects />);
    const zink = screen.getByRole("article", { name: "Zink" });
    const next = screen.getByRole("article", { name: "NextMeet" });
    expect(zink).not.toBe(next);
    expect(within(zink).queryByRole("link", { name: /live demo/i })).toBeNull();
    expect(within(next).getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://nextmeet.vercel.app");
    expect(within(zink).getByRole("link", { name: /github/i })).toHaveAttribute("href", expect.stringContaining("Zink-Conferencing-Platform"));
  });
});

describe("Home page", () => {
  it("has no pricing or freelance wording", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/pricing|per month|freelanc|\bplan\b/i);
  });

  it("has a skip link, one h1 and a section for every nav item", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    for (const item of navItems) expect(container.querySelector(item.href)).not.toBeNull();
  });
});

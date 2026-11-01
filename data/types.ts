export type ProjectCategory = "full-stack" | "backend-data" | "frontend";

export type SkillArea = "frontend" | "backend" | "database" | "realtime" | "testing" | "devops";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  categories: ProjectCategory[];
  areas: SkillArea[];
  features?: string[];
  image?: ProjectImage;
  liveUrl?: string;
  codeUrl?: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
  note?: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Achievement = {
  title: string;
  detail: string;
};

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  result: string;
};

export type ExperienceItem = {
  organization: string;
  role: string;
  location: string;
  period: string;
  kind: "work" | "volunteer";
  points: string[];
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  headline: string;
  about: string[];
  email: string;
  availability: string;
  location: string;
  facts: Fact[];
  siteUrl: string;
  resumePath: string;
  marqueeTop: string[];
  marqueeBottom: string[];
  links: { label: string; url: string }[];
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  features?: string[];
  liveUrl?: string;
  codeUrl: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
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
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  headline: string;
  about: string[];
  email: string;
  siteUrl: string;
  resumePath: string;
  links: { label: string; url: string }[];
};

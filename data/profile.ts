import type { Profile } from "./types";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const profile: Profile = {
  name: "Aditi Kumari",
  initials: "AK",
  role: "Software Engineer",
  headline: "I build across the stack: React interfaces, Node.js and REST APIs, SQL and data pipelines.",
  availability: "Immediate joiner",
  location: "Bengaluru",
  facts: [
    { label: "Current role", value: "Software Engineer I, MAQ Software" },
    { label: "Education", value: "B.Tech CSE, NIT Agartala, CGPA 8.28" },
    { label: "DSA", value: "1500+ problems solved" },
    { label: "Location", value: "Bengaluru" },
    { label: "Availability", value: "Immediate joiner" },
  ],
  about: [
    "I work on both user interfaces and backend and data systems. At MAQ Software I am a Software Engineer I, building React interfaces and working on data workflows, REST API integrations, SQL validation and automated testing for a US financial-services engagement.",
    "Outside work I build full-stack projects with React, Node.js, Express, MongoDB and PostgreSQL, and I have solved more than 1500 DSA problems on LeetCode and CodeChef.",
    "I finished a B.Tech in Computer Science and Engineering at the National Institute of Technology Agartala in 2026 (CGPA 8.28). I was also a curriculum lead at WeCan, a society of NIT Agartala that teaches underprivileged children.",
  ],
  email: "aditikumari35355@gmail.com",
  marqueeTop: ["Software Engineer", "React", "TypeScript", "Node.js", "REST APIs"],
  marqueeBottom: ["SQL", "Azure Data Factory", "PySpark", "PostgreSQL", "Test Automation"],
  siteUrl: "https://dev-aditikumari.github.io/portfolio",
  resumePath: `${base}/Aditi-Kumari-Resume.pdf`,
  resumes: [
    { id: "ui", label: "Resume: UI-focused", path: `${base}/Aditi-Kumari-Resume-UI.pdf` },
    { id: "backend", label: "Resume: Backend & data-focused", path: `${base}/Aditi-Kumari-Resume-Backend.pdf` },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/dev-aditikumari" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aditikumari35355/" },
    { label: "LeetCode", url: "https://leetcode.com/u/dev-aditikumari/" },
    { label: "CodeChef", url: "https://www.codechef.com/users/devaditikumari" },
  ],
};

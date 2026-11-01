import type { Profile } from "./types";

export const profile: Profile = {
  name: "Aditi Kumari",
  initials: "AK",
  role: "Software Engineer",
  headline:
    "I work on data pipelines, REST API integrations and SQL validation at MAQ Software, and build full-stack apps with React and Node.js.",
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
    "I am a Software Engineer I at MAQ Software, working on data workflows, REST API integrations, SQL validation and automated testing for a US financial-services engagement.",
    "Outside work I build full-stack projects with React, Node.js, Express, MongoDB and PostgreSQL, and I have solved more than 1500 DSA problems on LeetCode and CodeChef.",
    "I finished a B.Tech in Computer Science and Engineering at the National Institute of Technology Agartala in 2026 (CGPA 8.28). I was also a curriculum lead at WeCan, a society of NIT Agartala that teaches underprivileged children.",
  ],
  email: "aditikumari35355@gmail.com",
  marqueeTop: ["Software Engineer", "Backend", "Full Stack", "SQL", "Node.js", "React"],
  marqueeBottom: ["REST APIs", "Azure Data Factory", "PySpark", "PostgreSQL", "Test Automation"],
  siteUrl: "https://dev-aditikumari.github.io/portfolio",
  resumePath: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Aditi-Kumari-Resume.pdf`,
  links: [
    { label: "GitHub", url: "https://github.com/dev-aditikumari" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aditikumari35355/" },
    { label: "LeetCode", url: "https://leetcode.com/u/dev-aditikumari/" },
    { label: "CodeChef", url: "https://www.codechef.com/users/devaditikumari" },
  ],
};

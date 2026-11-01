import type { SkillChip, SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { name: "Languages", skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"] },
  {
    name: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "React Router",
      "Hooks",
      "Context API",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    name: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "WebSockets", "Socket.IO"],
  },
  { name: "Databases", skills: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server"] },
  {
    name: "Testing & DevOps",
    skills: ["Jest", "React Testing Library", "pytest", "Git", "GitHub Actions", "CI/CD", "Docker", "Postman"],
  },
  {
    name: "Fundamentals",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
  },
];

// Only skills that are used in one of the repositories listed in data/projects.ts.
export const skillChips: SkillChip[] = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "SQL Server", icon: "database" },
  { name: "Redux Toolkit", icon: "redux" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Socket.IO", icon: "socketio" },
  { name: "WebRTC", icon: "webrtc" },
  { name: "Python", icon: "python" },
  { name: "pandas", icon: "pandas" },
  { name: "Jest", icon: "jest" },
  { name: "React Testing Library", icon: "testinglibrary" },
  { name: "pytest", icon: "pytest" },
  { name: "Docker", icon: "docker" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Postman", icon: "postman" },
  { name: "Git", icon: "git" },
];

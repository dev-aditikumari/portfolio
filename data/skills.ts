import type { SkillGroup } from "./types";

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

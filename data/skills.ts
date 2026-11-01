import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { name: "Languages", skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"] },
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
    name: "Cloud & Data",
    skills: ["Microsoft Azure", "Azure Data Factory", "Microsoft Fabric", "PySpark"],
    note: "Used at work. These are not in my public repositories.",
  },
  {
    name: "Fundamentals",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
  },
];

// Icon key for each skill name. Skills not listed here get the generic code icon.
export const skillIcons: Record<string, string> = {
  "JavaScript (ES6+)": "javascript",
  TypeScript: "typescript",
  Python: "python",
  SQL: "database",
  "React.js": "react",
  "Next.js": "nextjs",
  "Redux Toolkit": "redux",
  "React Router": "router",
  HTML5: "html5",
  CSS3: "css3",
  "Tailwind CSS": "tailwind",
  "Node.js": "nodejs",
  "Express.js": "express",
  JWT: "jwt",
  WebSockets: "socketio",
  "Socket.IO": "socketio",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  "SQL Server": "database",
  Jest: "jest",
  "React Testing Library": "testinglibrary",
  pytest: "pytest",
  Git: "git",
  "GitHub Actions": "githubactions",
  Docker: "docker",
  Postman: "postman",
  "Microsoft Azure": "cloud",
  "Azure Data Factory": "cloud",
  "Microsoft Fabric": "cloud",
  PySpark: "spark",
};

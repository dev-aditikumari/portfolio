import type { Project, ProjectCategory, SkillArea } from "./types";

export const categoryLabels: Record<ProjectCategory, string> = {
  "full-stack": "Full stack",
  "backend-data": "Backend and data",
  frontend: "Frontend",
  work: "Built at work",
};

export const areaLabels: Record<SkillArea, string> = {
  frontend: "Frontend (React)",
  backend: "Backend (Node.js)",
  database: "Databases",
  realtime: "Real-time (WebSockets, WebRTC)",
  testing: "Automated tests",
  devops: "Docker and CI",
};

const gh = "https://github.com/dev-aditikumari";

// Add a new project by adding an object to this array. Order here is the order on the page.
export const projects: Project[] = [
  {
    slug: "traceability-report",
    name: "Traceability Report",
    summary:
      "Maps PBIs to acceptance criteria and test cases from Azure DevOps using an LLM mapping engine, with coverage and risk metrics and Excel export. Hexagonal architecture.",
    stack: ["React 19", "Vite", "Node.js", "Azure DevOps REST", "LLM", "ExcelJS"],
    categories: ["work", "full-stack", "backend-data", "frontend"],
    areas: ["frontend", "backend"],
    note: "Built at work; source is private.",
  },
  {
    slug: "skillora",
    name: "Skillora",
    summary: "A full-stack learning platform with student, instructor and admin roles.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Razorpay"],
    categories: ["full-stack"],
    areas: ["frontend", "backend", "database"],
    image: { src: "/projects/skillora.jpg", alt: "Skillora home page showing the course catalogue", width: 800, height: 500 },
    liveUrl: "https://skillora-flame.vercel.app",
    codeUrl: `${gh}/Skillora`,
  },
  {
    slug: "nextmeet",
    name: "NextMeet",
    summary:
      "Real-time video meetings with WebRTC and Socket.IO: rooms, chat, screen sharing, raise hand and reconnection logic.",
    stack: ["React", "Vite", "WebRTC", "Socket.IO", "Node.js", "Express"],
    categories: ["full-stack"],
    areas: ["frontend", "backend", "realtime"],
    image: { src: "/projects/nextmeet.jpg", alt: "NextMeet home page with fields to create or join a room", width: 800, height: 450 },
    liveUrl: "https://nextmeet.vercel.app",
    codeUrl: `${gh}/Nextmeet`,
  },
  {
    slug: "zink",
    name: "Zink",
    summary:
      "A video conferencing app with a WebRTC mesh, Socket.IO signalling, a TypeScript API and PostgreSQL room records.",
    stack: ["React", "Vite", "TypeScript", "Express", "Socket.IO", "PostgreSQL", "Jest", "Postman", "Docker", "GitHub Actions"],
    categories: ["full-stack"],
    areas: ["frontend", "backend", "database", "realtime", "testing", "devops"],
    image: { src: "/projects/zink.jpg", alt: "Zink lobby screen after sign in", width: 800, height: 475 },
    codeUrl: `${gh}/Zink-Conferencing-Platform`,
  },
  {
    slug: "lets-talk",
    name: "Let's Talk",
    summary: "A real-time chat app with registration, avatars and one-to-one messages over WebSockets.",
    stack: ["React", "TypeScript", "Express", "Socket.IO", "MongoDB", "Jest", "Postman", "Docker", "GitHub Actions"],
    categories: ["full-stack"],
    areas: ["frontend", "backend", "database", "realtime", "testing", "devops"],
    image: { src: "/projects/chat-app.jpg", alt: "Let's Talk chat window with a conversation open", width: 800, height: 500 },
    codeUrl: `${gh}/Chat-app`,
  },
  {
    slug: "shopper",
    name: "Shopper",
    summary: "A MERN clothing store with products, JWT accounts, a saved cart, promo codes and orders.",
    stack: ["React", "React Router", "Node.js", "Express", "MongoDB", "JWT"],
    categories: ["full-stack"],
    areas: ["frontend", "backend", "database"],
    image: { src: "/projects/shopper.jpg", alt: "Shopper home page with clothing collections", width: 800, height: 500 },
    codeUrl: `${gh}/E-commerce-website`,
  },
  {
    slug: "react-implementations",
    name: "React Implementations",
    summary: "One page per React concept, such as state, context, hooks, forms and Redux Toolkit, each with a live demo and tests.",
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Jest", "React Testing Library", "GitHub Actions"],
    categories: ["frontend"],
    areas: ["frontend", "testing", "devops"],
    image: { src: "/projects/react-implementations.jpg", alt: "React Implementations home page listing the concept pages", width: 800, height: 500 },
    codeUrl: `${gh}/React-Implementations`,
  },
  {
    slug: "devops-notes-service",
    name: "Notes service",
    summary: "A notes REST API in TypeScript with Docker, docker-compose, GitHub Actions CI/CD and a Postman collection.",
    stack: ["TypeScript", "Express", "PostgreSQL", "Jest", "Docker", "GitHub Actions", "Postman"],
    categories: ["backend-data"],
    areas: ["backend", "database", "testing", "devops"],
    codeUrl: `${gh}/devops-repository`,
  },
  {
    slug: "festival-sales",
    name: "Festival Sales Analytics",
    summary: "Diwali sales analysis written in pandas and in PostgreSQL, with tests that check both give the same results.",
    stack: ["Python", "pandas", "PostgreSQL", "pytest", "GitHub Actions"],
    categories: ["backend-data"],
    areas: ["database", "testing", "devops"],
    image: { src: "/projects/festival-sales.jpg", alt: "Bar chart of festival sales by product category", width: 800, height: 600 },
    codeUrl: `${gh}/Festival_Sales`,
  },
  {
    slug: "academic-insight-engine",
    name: "Academic Insight Engine",
    summary: "A pandas package that cleans student records and reports statistics, correlations and an at-risk rule. It runs on synthetic data.",
    stack: ["Python", "pandas", "pytest", "GitHub Actions"],
    categories: ["backend-data"],
    areas: ["testing", "devops"],
    image: { src: "/projects/academic-insight.jpg", alt: "Chart of performance bands, drawn from synthetic data", width: 800, height: 533 },
    codeUrl: `${gh}/Academic-Insight-Engine`,
  },
  {
    slug: "sql-practice",
    name: "SQL Practice",
    summary: "One bookstore schema written for PostgreSQL, MySQL and SQL Server, with queries and a pytest suite. Only PostgreSQL has been run.",
    stack: ["PostgreSQL", "MySQL", "SQL Server", "pytest", "GitHub Actions"],
    categories: ["backend-data"],
    areas: ["database", "testing", "devops"],
    codeUrl: `${gh}/sql-practice`,
  },
  {
    slug: "dsa-cpp",
    name: "DSA in C++",
    summary: "Data structures and algorithms in C++.",
    stack: ["C++"],
    categories: ["backend-data"],
    areas: [],
    codeUrl: `${gh}/dsa-cpp`,
  },
];

export type AreaEvidence = { area: SkillArea; label: string; count: number; total: number };

// Counts how many listed projects use each area, so the bars show evidence and not a self rating.
export function areaEvidence(list: Project[] = projects): AreaEvidence[] {
  return (Object.keys(areaLabels) as SkillArea[]).map((area) => ({
    area,
    label: areaLabels[area],
    count: list.filter((p) => p.areas.includes(area)).length,
    total: list.length,
  }));
}

import type { Achievement, EducationItem, ExperienceItem } from "./types";

export const education: EducationItem[] = [
  {
    institution: "National Institute of Technology Agartala",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    location: "Tripura, India",
    period: "2022 to 2026",
    result: "CGPA 8.28/10",
  },
  {
    institution: "Holy Mission Sr. Sec. School, Muzaffarpur",
    degree: "Senior School Certificate Examination (Class XII)",
    location: "Bihar, India",
    period: "2021 to 2022",
    result: "88%",
  },
  {
    institution: "Holy Mission Sr. Sec. School, Muzaffarpur",
    degree: "Secondary School Examination (Class X)",
    location: "Bihar, India",
    period: "2019 to 2020",
    result: "94%",
  },
];

export const experience: ExperienceItem[] = [
  {
    organization: "MAQ Software",
    role: "Software Engineer I",
    location: "Noida, India",
    period: "July 2026 to present",
    kind: "work",
    points: [
      "Designed and built a Traceability Report tool (React 19, Vite, Node.js) that maps PBIs to acceptance criteria and test cases using Azure DevOps REST APIs and an LLM mapping engine, with coverage and risk metrics and Excel export, reducing repetitive manual mapping. Structured with Hexagonal (Ports and Adapters) architecture.",
      "Build reusable React components with Redux Toolkit and Tailwind CSS; 10+ components and pages shipped to production.",
      "Wrote a SQL schema comparison report that found more than 60 cross-database differences, and pytest unit tests for pipeline utilities under an 85% line-coverage gate.",
      "Work on production data workflows and REST API integrations for a US financial-services engagement.",
    ],
  },
  {
    organization: "MAQ Software",
    role: "Associate Software Engineer",
    location: "Noida, India",
    period: "January 2026 to June 2026",
    kind: "work",
    points: [
      "Built Azure Data Factory pipelines with dynamic SQL MERGE logic, fixed AccountID-level race conditions, and improved logging and timeout handling to reduce inconsistent production failures.",
      "Developed PySpark notebooks on Microsoft Fabric (Delta tables) for CRA scoring analytics; improved validation accuracy and pipeline monitoring.",
      "Designed a SQL-based KPI validation framework (orchestrator plus SQL template layer) with 30+ parameterised test cases and LOB-level isolation, automating validation workflows to cut repetitive manual checks.",
    ],
  },
  {
    organization: "WeCan, NIT Agartala",
    role: "Curriculum Lead",
    location: "Agartala, India",
    period: "January 2023 to December 2025",
    kind: "volunteer",
    points: [
      "Led educational initiatives of the non-profit WeCan society by volunteering to teach underprivileged children and support their learning.",
    ],
  },
  {
    organization: "MUNSOC",
    role: "Member",
    location: "Agartala, India",
    period: "July 2023 to December 2025",
    kind: "volunteer",
    points: ["Took part in more than 3 Model United Nations conferences, including sessions on soft skills and communication."],
  },
];

export const achievements: Achievement[] = [
  { title: "LeetCode Global Rank 5303", detail: "Weekly Contest 401" },
  { title: "CodeChef Global Rank 1134", detail: "Starter 111, Division" },
  { title: "1500+ problems solved", detail: "Data structures and algorithms practice" },
];

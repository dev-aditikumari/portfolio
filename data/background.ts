import type { EducationItem, ExperienceItem } from "./types";

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
    description:
      "Production data workflows and REST API integrations for a US financial-services engagement. Wrote a SQL schema comparison report that found more than 60 cross-database differences, and pytest unit tests for pipeline utilities under an 85% line-coverage gate. Build React components with Redux Toolkit and Tailwind CSS.",
  },
  {
    organization: "MAQ Software",
    role: "Associate Software Engineer",
    location: "Noida, India",
    period: "January 2026 to June 2026",
    description:
      "Built Azure Data Factory pipelines with dynamic MERGE logic, designed a SQL-based KPI validation framework with more than 30 parameterised test cases, and wrote PySpark notebooks on Microsoft Fabric.",
  },
  {
    organization: "WeCan, NIT Agartala",
    role: "Curriculum Lead",
    location: "Agartala, India",
    period: "January 2023 to present",
    description:
      "Lead educational initiatives of the non-profit WeCan society by volunteering to teach underprivileged children and support their learning.",
  },
  {
    organization: "MUNSOC",
    role: "Member",
    location: "Agartala, India",
    period: "July 2023 to present",
    description:
      "Took part in more than 3 Model United Nations conferences, including sessions on soft skills and communication.",
  },
];

import { profile } from "@/data/profile";

type Props = {
  variant?: "buttons" | "text";
  linkClass?: string;
};

export function ResumeLinks({ variant = "buttons", linkClass = "" }: Props) {
  return (
    <ul aria-label="Resume downloads" className={variant === "buttons" ? "flex flex-wrap gap-3" : "space-y-2"}>
      {profile.resumes.map((resume) => (
        <li key={resume.id}>
          <a href={resume.path} download className={variant === "buttons" ? "btn-outline" : linkClass}>
            {resume.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

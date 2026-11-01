import type { SkillGroup } from "@/data/types";

export function SkillsList({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="space-y-5">
      {groups.map((group) => (
        <div key={group.name}>
          <dt className="mb-2 font-semibold">{group.name}</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded border border-line bg-soft px-2 py-1 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

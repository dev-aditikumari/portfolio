import { profile } from "@/data/profile";

export function Availability() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-4 py-1.5 text-sm font-medium text-white">
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-400" />
      {profile.availability}
    </p>
  );
}

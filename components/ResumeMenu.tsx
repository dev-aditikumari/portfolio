"use client";

import { useEffect, useId, useRef, useState } from "react";
import { profile } from "@/data/profile";

export function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative order-2 sm:order-3"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="btn-outline"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        Download resume
        <span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <ul id={menuId} className="absolute right-0 top-full z-30 mt-2 w-64 rounded border border-edge bg-panel p-1 shadow-lg">
          {profile.resumes.map((resume) => (
            <li key={resume.id}>
              <a
                href={resume.path}
                download
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-sm text-white hover:bg-navy"
              >
                {resume.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

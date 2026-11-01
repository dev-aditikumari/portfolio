"use client";

import { useState, type FormEvent } from "react";
import { buildMailto, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

type Props = {
  email: string;
  openMailto?: (url: string) => void;
};

const defaultOpen = (url: string) => {
  window.location.href = url;
};

const field =
  "w-full rounded border bg-night px-3 py-2 text-white placeholder:text-quiet";

export function ContactForm({ email, openMailto = defaultOpen }: Props) {
  const [values, setValues] = useState<ContactFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  function update(key: keyof ContactFields, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSent(false);
      return;
    }
    setSent(true);
    openMailto(buildMailto(email, values));
  }

  const border = (key: keyof ContactFields) => (errors[key] ? "border-red-400" : "border-edge");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div>
        <label htmlFor="cf-name" className="mb-1 block text-sm text-white">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={`${field} ${border("name")}`}
        />
        {errors.name && (
          <p id="cf-name-error" className="mt-1 text-sm text-red-300">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1 block text-sm text-white">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          className={`${field} ${border("email")}`}
        />
        {errors.email && (
          <p id="cf-email-error" className="mt-1 text-sm text-red-300">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm text-white">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${field} ${border("message")}`}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-1 text-sm text-red-300">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn-solid">
        Send message
      </button>
      <p role="status" className="text-sm text-quiet">
        {sent
          ? `Your email app should open with the message filled in. If it does not, write to ${email}.`
          : "This opens your email app. Nothing is stored on this site."}
      </p>
    </form>
  );
}

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Enter your name.";
  if (!emailPattern.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

export function buildMailto(to: string, fields: ContactFields): string {
  const subject = `Portfolio message from ${fields.name.trim()}`;
  const body = `${fields.message.trim()}\n\n${fields.name.trim()}\n${fields.email.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

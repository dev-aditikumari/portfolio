export type ContactFields = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};
export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Enter your name.";
  if (!emailPattern.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

export function buildMailto(to: string, fields: ContactFields): string {
  const company = fields.company.trim();
  const role = fields.role.trim();
  const subject = role ? `Opportunity: ${role}` : `Portfolio message from ${fields.name.trim()}`;
  const lines = [fields.message.trim(), "", fields.name.trim(), fields.email.trim()];
  if (company) lines.push(`Company: ${company}`);
  if (role) lines.push(`Role: ${role}`);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

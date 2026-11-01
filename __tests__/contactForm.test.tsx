import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";
import { buildMailto, validateContact } from "@/lib/contact";

describe("validateContact", () => {
  const ok = { name: "Asha", email: "asha@example.com", company: "", role: "", message: "Hello there, nice site." };

  it("accepts valid input", () => {
    expect(validateContact(ok)).toEqual({});
  });

  it("reports each invalid field", () => {
    const errors = validateContact({ ...ok, name: " ", email: "nope", message: "short" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("rejects emails without a domain dot", () => {
    expect(validateContact({ ...ok, email: "a@b" }).email).toBeDefined();
  });
});

describe("buildMailto", () => {
  const ok = { name: "Asha", email: "asha@example.com", company: "", role: "", message: "Hello there, nice site." };

  it("encodes subject and body", () => {
    const url = buildMailto("me@example.com", { ...ok, name: "A B", email: "a@b.co", message: "Hi & bye" });
    expect(url.startsWith("mailto:me@example.com?subject=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Hi & bye"));
    expect(url).not.toContain(" ");
  });
});

describe("buildMailto with company and role", () => {
  const base = { name: "Asha", email: "a@b.co", company: "Acme", role: "Software Engineer", message: "We would like to talk." };

  it("uses the role in the subject and puts company and role in the body", () => {
    const url = buildMailto("me@example.com", base);
    expect(decodeURIComponent(url)).toContain("subject=Opportunity: Software Engineer");
    expect(decodeURIComponent(url)).toContain("Company: Acme");
    expect(decodeURIComponent(url)).toContain("Role: Software Engineer");
  });

  it("leaves company and role out when empty", () => {
    const url = decodeURIComponent(buildMailto("me@example.com", { ...base, company: "", role: "" }));
    expect(url).not.toContain("Company:");
    expect(url).toContain("subject=Portfolio message from Asha");
  });
});

describe("ContactForm", () => {
  it("shows errors, marks fields invalid and does not open mail when empty", async () => {
    const open = jest.fn();
    const user = userEvent.setup();
    render(<ContactForm email="me@example.com" openMailto={open} />);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Message")).toHaveAccessibleDescription(/at least 10 characters/);
    expect(open).not.toHaveBeenCalled();
  });

  it("shows the availability line", () => {
    render(<ContactForm email="me@example.com" />);
    expect(screen.getByText("Available to join immediately.")).toBeInTheDocument();
  });

  it("opens a mailto link with the typed values when valid", async () => {
    const open = jest.fn();
    const user = userEvent.setup();
    render(<ContactForm email="me@example.com" openMailto={open} />);
    await user.type(screen.getByLabelText("Name"), "Asha");
    await user.type(screen.getByLabelText("Email"), "asha@example.com");
    await user.type(screen.getByLabelText(/Company/), "Acme");
    await user.type(screen.getByLabelText(/Role you are hiring for/), "Software Engineer");
    await user.type(screen.getByLabelText("Message"), "Hello, I liked your projects.");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url).toContain("mailto:me@example.com");
    expect(decodeURIComponent(url)).toContain("Hello, I liked your projects.");
    expect(decodeURIComponent(url)).toContain("Company: Acme");
    expect(screen.getByRole("status")).toHaveTextContent(/email app should open/i);
    expect(screen.queryByText("Enter your name.")).not.toBeInTheDocument();
  });
});

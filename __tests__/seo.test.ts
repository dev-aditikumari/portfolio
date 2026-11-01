import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { profile } from "@/data/profile";

describe("robots and sitemap", () => {
  it("robots allows crawling and points at the sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${profile.siteUrl}/sitemap.xml`);
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("sitemap lists the site root", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([profile.siteUrl]);
  });
});

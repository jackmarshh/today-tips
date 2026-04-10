import { describe, expect, it } from "vitest";
import {
  buildCanonicalUrl,
  buildHomeJsonLd,
  getSiteUrl,
} from "./seo";

describe("seo helpers", () => {
  it("falls back to localhost when site url env is missing", () => {
    expect(getSiteUrl(undefined)).toBe("http://localhost:3000");
  });

  it("normalizes the configured site url", () => {
    expect(getSiteUrl("https://today-tips.example.com/")).toBe(
      "https://today-tips.example.com",
    );
  });

  it("builds canonical urls from a base url and path", () => {
    expect(buildCanonicalUrl("https://today-tips.example.com", "/")).toBe(
      "https://today-tips.example.com/",
    );
    expect(buildCanonicalUrl("https://today-tips.example.com", "/about")).toBe(
      "https://today-tips.example.com/about",
    );
  });

  it("creates website and webapplication structured data for the homepage", () => {
    const jsonLd = buildHomeJsonLd("https://today-tips.example.com");

    expect(jsonLd).toHaveLength(2);
    expect(jsonLd[0]).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "打工摸鱼指北",
      url: "https://today-tips.example.com",
    });
    expect(jsonLd[1]).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "打工摸鱼指北",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Any",
      url: "https://today-tips.example.com/",
    });
  });
});

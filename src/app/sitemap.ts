import type { MetadataRoute } from "next";
import { buildCanonicalUrl, getSiteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: buildCanonicalUrl(siteUrl, "/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

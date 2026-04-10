const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(siteUrl = process.env.NEXT_PUBLIC_SITE_URL): string {
  const normalized = siteUrl?.trim().replace(/\/+$/, "");
  return normalized || DEFAULT_SITE_URL;
}

export function buildCanonicalUrl(siteUrl: string, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteUrl}/`).toString();
}

export function buildHomeJsonLd(siteUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "打工摸鱼指北",
      url: siteUrl,
      inLanguage: "zh-CN",
      description: "今天该怎么过，给你一个不那么费脑子的版本。",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "打工摸鱼指北",
      url: buildCanonicalUrl(siteUrl, "/"),
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Any",
      inLanguage: "zh-CN",
      description:
        "面向打工人的今日安排助手，提供可执行的工作日和周末建议。",
    },
  ];
}

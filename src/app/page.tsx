import type { Metadata } from "next";
import { HomeClient } from "../components/HomeClient";
import { generatePlan } from "../data/suggestions";
import { buildCanonicalUrl, buildHomeJsonLd, getSiteUrl } from "../lib/seo";

const siteUrl = getSiteUrl();
const canonicalUrl = buildCanonicalUrl(siteUrl, "/");

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "今日安排助手",
  description:
    "打开就能看到一组工作日、会议日、低能量和周末场景下的今日安排建议。",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "打工摸鱼指北 | 今日安排助手",
    description:
      "打开就能看到一组工作日、会议日、低能量和周末场景下的今日安排建议。",
    url: canonicalUrl,
  },
  twitter: {
    title: "打工摸鱼指北 | 今日安排助手",
    description:
      "打开就能看到一组工作日、会议日、低能量和周末场景下的今日安排建议。",
  },
};

export default function Home() {
  const initialSituation = "normal";
  const initialPlan = generatePlan(initialSituation);
  const jsonLd = buildHomeJsonLd(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient initialPlan={initialPlan} initialSituation={initialSituation} />
    </>
  );
}

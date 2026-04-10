import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "../lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "打工摸鱼指北 | 今日安排助手",
    template: "%s | 打工摸鱼指北",
  },
  description:
    "面向年轻打工人的今日安排助手，提供工作日、会议日、低能量和周末场景下的轻量建议。",
  keywords: [
    "今日安排",
    "今日建议",
    "打工人",
    "摸鱼指南",
    "上班建议",
    "周末安排",
  ],
  applicationName: "打工摸鱼指北",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "打工摸鱼指北",
    title: "打工摸鱼指北 | 今日安排助手",
    description:
      "今天该怎么过，给你一个不那么费脑子的版本。打开就能看到一组可执行的今日建议。",
  },
  twitter: {
    card: "summary_large_image",
    title: "打工摸鱼指北 | 今日安排助手",
    description:
      "打开就能看建议的今日安排助手，适合工作日、会议日、低能量日和周末。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}

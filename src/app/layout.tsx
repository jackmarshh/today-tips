import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "打工摸鱼指北 🦦",
  description: "今天该怎么过，给你一个不那么费脑子的版本。",
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
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}

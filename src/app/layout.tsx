import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | BazarDor",
    template: "%s | বাজার দর",
  },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
  applicationName: "বাজার দর",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}


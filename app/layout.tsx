import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

const oxaniumSans = Oxanium({
  variable: "--font-oxanium-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eri Guzman - Portfolio",
  description: "A place for me to experiment and show off what I've done.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oxaniumSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

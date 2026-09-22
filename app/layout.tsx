import type { Metadata, Viewport } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "David Estrera — Portfolio",
  description:
    "AI & data engineer, full-stack developer, and DevOps intern — projects, skills, and experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${workSans.variable} min-h-screen bg-surface text-ink antialiased font-body`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

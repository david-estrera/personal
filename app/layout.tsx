import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Joshua Estrera - Portfolio",
  description: "Portfolio website showcasing projects, skills, and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}

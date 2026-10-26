import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nail Master Dallas | Professional Nail Supply",
  description:
    "Professional nail tools, gels, equipment and education curated for nail artists.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

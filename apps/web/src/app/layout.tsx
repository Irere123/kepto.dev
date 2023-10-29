import "./globals.css";
import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";

export const metadata: Metadata = {
  title: "Kepto",
  description: "Designed for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body>{children}</body>
    </html>
  );
}

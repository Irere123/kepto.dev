import { Metadata } from "next";

import "./globals.css";
import Background from "./_components/background";

export const metadata: Metadata = {
  metadataBase: new URL("https://kepto.dev"),
  title: {
    template: "%s | Kepto",
    default: "Kepto",
  },
  description: "Designed for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Background>
          <div id="app">{children}</div>
        </Background>
      </body>
    </html>
  );
}

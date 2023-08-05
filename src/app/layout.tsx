import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const font = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amit Kumar – Engineering Leader, Software Architect, Entrepreneur",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}

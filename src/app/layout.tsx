import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--headingFont",
});

const bodyFont = Lato({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--bodyFont",
});

const metadata: Metadata = {
  title: "Amit Kumar – Engineering Leader, Software Architect, Entrepreneur",
  description: "Portfolio website",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          headingFont.className,
          headingFont.variable,
          bodyFont.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}

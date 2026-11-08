import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistSerif } from "geist/font/serif";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Marques V. — Portfolio",
  description: "Portfólio de Marques Vinícius, desenvolvedor full-stack: interfaces, APIs e integrações.",
  keywords: ["desenvolvedor", "full-stack", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Marques Vinícius" }],
  openGraph: {
    title: "Marques V. — Portfolio",
    description: "Portfólio de Marques Vinícius, desenvolvedor full-stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSerif.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="min-h-screen" suppressHydrationWarning={true}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

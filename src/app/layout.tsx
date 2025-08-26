import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marques Vinícius - Desenvolvedor",
  description: "Portfólio pessoal de Marques Vinícius - Desenvolvedor em Desenvolvimento especializado em tecnologias modernas",
  keywords: ["desenvolvedor", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Marques Vinícius" }],
  openGraph: {
    title: "Marques Vinícius - Desenvolvedor",
    description: "Portfólio pessoal de Marques Vinícius",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased gradient-subtle min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

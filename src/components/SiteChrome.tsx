"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ReadingMarkers from "./ReadingMarkers";

/** Navbar, rodapé e rolagem suave do site — fora do Sanity Studio, que tem a própria interface. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return <>{children}</>;

  return (
    <>
      <SmoothScroll />
      <Header />
      <ReadingMarkers />
      <main>{children}</main>
      <Footer />
    </>
  );
}

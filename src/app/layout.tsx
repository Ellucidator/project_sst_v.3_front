import type { Metadata } from "next";
import { Tomorrow } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import Footer from "@/components/footer";

const tomorrow = Tomorrow({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce",
  metadataBase: new URL("https://project-sst-v-3-front.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <GoogleTagManager gtmId="GTM-WHM7BCKV" />
      <GoogleAnalytics gaId="G-T9X570YDPN" />

      <body className={` ${tomorrow.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ségio Setup",
  description: "Ségio Setup e-commerce",
  metadataBase: new URL("https://segio-setup.vercel.app"),
  alternates: {
    canonical:"/"
  },
  openGraph: {
    title: "Ségio Setup",
    description: "Ségio Setup e-commerce",
    url: "https://segio-setup.vercel.app/",
    siteName: "Ségio Setup",
    images:{
        url: "https://segio-setup.vercel.app/public/home/icon.png",
        width: 1920,
        height: 1080,
      },
    type: "website",
  },
  twitter: {
    title: "Ségio Setup",
    description: "Ségio Setup e-commerce",
    card: "summary_large_image",
    images: "https://segio-setup.vercel.app/public/home/icon.png",
    creator: "@SegioSetup",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

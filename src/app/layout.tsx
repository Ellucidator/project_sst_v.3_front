import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ségio Setup",
  description: "Ségio Setup e-commerce",
  openGraph: {
    title: "Ségio Setup",
    description: "Ségio Setup e-commerce",
    url: "https://project-sst-v-3-front.vercel.app/",
    siteName: "Ségio Setup",
    images:[
      {
        url: "https://project-sst-v-3-front.vercel.app/api/og?title=SS",
        width: 800,
        height: 600,
      },
      {
        url: "https://project-sst-v-3-front.vercel.app/api/og?title=SS",
        width: 1800,
        height: 1600,
        alt: "Ségio-Setup",
      }
    ],

    type: "website",
  },
  twitter: {
    title: "Ségio Setup",
    description: "Ségio Setup e-commerce",
    card: "summary_large_image",
    images: [
      {
        url: "https://project-sst-v-3-front.vercel.app/api/og?title=SS",
        width: 800,
        height: 600,
      },
      {
        url: "https://project-sst-v-3-front.vercel.app/api/og?title=SS",
        width: 1800,
        height: 1600,
        alt: "Ségio-Setup",
      }
    ],
    creator: "@SegioSetup",
  },
  
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

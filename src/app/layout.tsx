import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ségio Setup",
  description: "Ségio Setup e-commerce",
  verification: {
    google: "AIzaSyCQW8k7DZnqoY4gqz3fGKqgqY0r5I8cBp0",
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

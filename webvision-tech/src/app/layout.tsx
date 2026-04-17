import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 1. IMPORT FOOTER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebVision Technologies",
  description: "Enterprise Software Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Top of every page */}
        
        {children} {/* The page content (Home, About, etc.) goes here */}
        
        <Footer /> {/* 2. ADD FOOTER HERE (Bottom of every page) */}
      </body>
    </html>
  );
}
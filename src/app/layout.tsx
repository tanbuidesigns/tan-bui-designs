import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanbuidesigns.com"),
  title: {
    default: "Tan Bui Designs | Multidisciplinary Design Consultant",
    template: "%s | Tan Bui Designs",
  },
  description:
    "Tan Bui is a multidisciplinary design consultant creating clear, useful and memorable brand, packaging, publication, website and exhibition design.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://tanbuidesigns.com/",
    siteName: "Tan Bui Designs",
    title: "Tan Bui Designs | Multidisciplinary Design Consultant",
    description:
      "Clear, useful and memorable design across brand, print, digital and physical experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

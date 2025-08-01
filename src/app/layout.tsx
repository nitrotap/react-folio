import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kartik Jevaji | Portfolio",
  description: "The modern portfolio of Kartik Jevaji – Full Stack Web Developer. Explore projects, skills, and experience in web, mobile, and cloud development.",
  keywords: [
    "Kartik Jevaji",
    "Portfolio",
    "Web Developer",
    "Full Stack",
    "React",
    "Next.js",
    "Tailwind",
    "Projects",
    "JavaScript",
    "TypeScript",
    "Cloud",
    "Mobile Development"
  ],
  authors: [{ name: "Kartik Jevaji", url: "https://www.nitrotap.dev" }],
  creator: "Kartik Jevaji",
  openGraph: {
    title: "Kartik Jevaji | Portfolio",
    description: "Explore the modern portfolio of Kartik Jevaji, a full stack web developer with expertise in web, mobile, and cloud solutions.",
    url: "https://www.nitrotap.dev",
    siteName: "Kartik Jevaji Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}>
        {/* Sitewide animated background */}
        {/* <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          Floating elements
          <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-10 w-6 h-6 bg-purple-400 rounded-full animate-bounce animation-delay-1000"></div>
        </div> */}
        <header className="w-full py-6 bg-white shadow-sm sticky top-0 z-30">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Nav />
          </div>
        </header>
        <main className="glass flex-1 container mx-auto px-4 py-8 flex flex-col items-center w-full">
          {children}
        </main>
        <footer className="w-full py-4 bg-white border-t text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Kartik Jevaji. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

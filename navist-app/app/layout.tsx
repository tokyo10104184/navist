import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Layout from "@/app/components/Layout/Layout";
import { ZoneModeProvider } from "@/app/contexts/ZoneModeContext";

export const metadata: Metadata = {
  title: "Navist - Your Personal AI Learning Companion",
  description: "Navigate your learning journey with Navist, an AI-powered platform for personalized education and motivation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased"> {/* antialiased can stay on body or move to html */}
        <ZoneModeProvider>
          <Layout>
            {children}
          </Layout>
        </ZoneModeProvider>
      </body>
    </html>
  );
}

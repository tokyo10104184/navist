import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Updated import for GeistSans
import { GeistMono } from "geist/font/mono";   // Updated import for GeistMono
import "./globals.css";
import Layout from "@/app/components/Layout/Layout"; // Path to the new Layout component
import { ZoneModeProvider } from "@/app/contexts/ZoneModeContext"; // Corrected path

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
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ZoneModeProvider>
          <Layout>
            {children}
          </Layout>
        </ZoneModeProvider>
      </body>
    </html>
  );
}

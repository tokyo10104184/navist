import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header"; // Will create this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Navist",
  description: "AI Learning Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 p-4 text-center text-sm">
          © 2023 Navist
        </footer>
      </body>
    </html>
  );
}

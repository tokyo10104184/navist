// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Tailwind base, etc.
import Header from "@/components/shared/Header";

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
    <html lang="en" className="antialiased"> {/* Added antialiased here */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-muted/20 dark:bg-muted/40`}> {/* Subtle bg color */}
        <Header />
        {/* Added max-w-screen-xl and more responsive padding below */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
          {children}
        </main>
        <footer className="bg-background border-t p-4 text-center text-sm text-muted-foreground">
          © 2024 Navist
        </footer>
      </body>
    </html>
  );
}

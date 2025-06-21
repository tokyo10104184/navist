// src/app/layout.tsx
'use client'; // Required for useState

// import type { Metadata } from "next"; // Removed as metadata object is also removed
import { Inter } from "next/font/google";
import "./globals.css"; // Tailwind base, etc.
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

// Note: 'export const metadata' can still be used if the page itself is not dynamic,
// but since we are using 'use client', this layout is a Client Component.
// For title and description in client components, you might need to set them differently if needed dynamically,
// e.g. via a context or useEffect, or ensure this static metadata is still picked up.
// Next.js generally recommends keeping metadata exports in Server Components.
// For simplicity, we'll assume this static metadata is acceptable.
// export const metadata: Metadata = { // This line is removed due to 'use client'
//   title: "Navist",
//   description: "AI Learning Companion",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="ja" className={cn("antialiased", inter.className)}> {/* Changed lang to ja */}
      <body className="flex flex-col min-h-screen bg-background dark:bg-background">
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex flex-col flex-1 md:ml-64"> {/* Add ml-64 for desktop to account for sidebar */}
            <Header onMenuClick={toggleSidebar} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6"> {/* Adjusted padding slightly */}
              {children}
            </main>
            <footer className="bg-card border-t border-border p-4 text-center text-sm text-muted-foreground mt-auto">
              © 2024 Navist
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

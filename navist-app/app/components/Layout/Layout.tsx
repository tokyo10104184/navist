"use client";

import React from 'react';
import Link from 'next/link';
import { useZoneMode } from '@/app/contexts'; // Assuming index.ts in contexts exports this

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isZoneModeActive } = useZoneMode(); // Consume ZoneMode state

  // Basic styling for nav items
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeNavLinkClasses = "bg-gray-900 text-white"; // Example active style
  const inactiveNavLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  // In a real app, you'd use router.pathname or similar to determine active link
  // For this placeholder, we'll just style them all as inactive.

  return (
    <div className={`min-h-screen flex flex-col ${isZoneModeActive ? 'zone-mode-active' : ''}`}>
      {!isZoneModeActive && ( // Header is hidden in Zone Mode
        <header className="bg-gray-800 text-white shadow-md">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/dashboard" className="text-xl font-bold text-white">
                  Navist
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/dashboard" className={`${navLinkClasses} ${inactiveNavLinkClasses}`}>
                    Dashboard
                  </Link>
                  <Link href="/study" className={`${navLinkClasses} ${inactiveNavLinkClasses}`}>
                    Study
                  </Link>
                  <Link href="/profile" className={`${navLinkClasses} ${inactiveNavLinkClasses}`}>
                    Profile
                  </Link>
                  <Link href="/settings" className={`${navLinkClasses} ${inactiveNavLinkClasses}`}>
                    Settings
                  </Link>
                </div>
              </div>
              {/* Mobile menu button can be added here if needed */}
            </div>
          </nav>
        </header>
      )}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {!isZoneModeActive && ( // Footer is hidden in Zone Mode
        <footer className="bg-gray-100 text-gray-600 py-4 text-center text-sm border-t">
          <p>&copy; {new Date().getFullYear()} Navist App. All rights reserved.</p>
          <p>Your Personal AI Learning Companion.</p>
        </footer>
      )}

      {/* Basic CSS for Zone Mode (could be in globals.css too) */}
      <style jsx global>{`
        .zone-mode-active header,
        .zone-mode-active footer {
          display: none;
        }
        .zone-mode-active main {
          padding-top: 2rem; /* Add some padding if header is gone */
        }
      `}</style>
    </div>
  );
};

export default Layout;

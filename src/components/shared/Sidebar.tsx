'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, Rss, LayoutDashboard, Brain, Zap, Flame, BarChart3, X } from 'lucide-react'; // Added UserCircle, Rss, removed Home
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'プロフィール', icon: UserCircle },
  { href: '/feed', label: 'フィード', icon: Rss },
  { href: '/dashboard', label: '学習プランナー', icon: LayoutDashboard },
  { href: '/buddy-ai', label: 'バディAI', icon: Brain },
  { href: '/navist-loop', label: '記憶ループ', icon: Zap },
  { href: '/motivation', label: 'モチベーション', icon: Flame },
  { href: '/reports', label: '学習レポート', icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the sidebar, useful for mobile
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-sidebar-border h-16">
          <Link href="/" className="text-2xl font-bold text-sidebar-primary-foreground" onClick={onClose}>
            Navist
          </Link>
          <button onClick={onClose} className="md:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose} // Close sidebar on link click for mobile
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

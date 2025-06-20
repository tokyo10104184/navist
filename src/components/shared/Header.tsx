// src/components/shared/Header.tsx
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'ホーム (育つ書斎)' }, // Translated
  { href: '/dashboard', label: '学習プランナー' }, // Translated
  { href: '/buddy-ai', label: 'バディAI' }, // Kept as feature name
  { href: '/navist-loop', label: '記憶ループ' }, // Translated function
  { href: '/motivation', label: 'モチベーション' }, // Loanword
  { href: '/reports', label: '学習レポート' }, // Translated
];

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-50"> {/* Added sticky and z-index */}
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Navist
        </Link>
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-primary-foreground/80 transition-colors"> {/* Updated hover and transition */}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

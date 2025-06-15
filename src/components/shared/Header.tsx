import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home (My Library)' },
  { href: '/dashboard', label: 'Planner' },
  { href: '/buddy-ai', label: 'Buddy AI' },
  { href: '/navist-loop', label: 'Navist Loop' },
  { href: '/motivation', label: 'Motivation' },
  { href: '/reports', label: 'Reports' },
];

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Navist
        </Link>
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-secondary-foreground/80">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

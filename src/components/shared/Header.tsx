// src/components/shared/Header.tsx
import { Menu } from 'lucide-react'; // For hamburger icon
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void; // Function to open the sidebar
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-card text-card-foreground p-4 shadow-sm sticky top-0 z-20 h-16 flex items-center border-b border-border md:hidden">
      {/* md:hidden makes this header only visible on smaller screens where sidebar is hidden by default */}
      <nav className="container mx-auto flex items-center"> {/* Removed justify-between to allow menu to be on left */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-foreground hover:text-accent-foreground" // Removed md:hidden as header is already md:hidden
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </Button>
        {/* App Title removed to avoid redundancy with Sidebar logo */}
        {/* Optional: Could add a dynamic page title here in the future */}
      </nav>
    </header>
  );
}

'use client';
import { useState } from 'react';
import { MapPin, Menu } from 'lucide-react';
import Link from 'next/link';
import Provider from './Provider';
import Auth from './Auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavLinksProps {
  onClick: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => (
  <>
    <Link
      href="/about"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
      onClick={onClick}
    >
      About
    </Link>
    <Link
      href="/lists"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
      onClick={onClick}
    >
      Lists
    </Link>
    <Link
      href="/form"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
      onClick={onClick}
    >
      Form
    </Link>
    <Link
      href="/profile"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
      onClick={onClick}
    >
      Profile
    </Link>
  </>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full h-16 border-b backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Map App</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLinks onClick={() => {}} />
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Provider>
            <Auth />
          </Provider>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-8 mt-8">
                <NavLinks onClick={closeMenu} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

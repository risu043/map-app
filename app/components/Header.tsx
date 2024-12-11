'use client';
import { MapPin, Menu } from 'lucide-react';
import Link from 'next/link';
import Provider from './Provider';
import Auth from './Auth';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { mplus } from '@/app/ui/font';

const NavLinks: React.FC = () => (
  <>
    <Link
      href="/map"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
    >
      Map
    </Link>
    <Link
      href="/lists"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
    >
      Lists
    </Link>
    <Link
      href="/form"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
    >
      Form
    </Link>
    <Link
      href="/profile"
      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
    >
      Profile
    </Link>
  </>
);

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full h-16 border-b backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className={`${mplus.className} text-xl md:text-2xl font-bold`}>
              ふくふくマップ
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Provider>
            <Auth />
          </Provider>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild className="w-12 p-0">
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    ふくふくマップは下関のおでかけスポットを探せるアプリです。
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
                    >
                      Top
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/map"
                      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
                    >
                      Map
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/lists"
                      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
                    >
                      Lists
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/form"
                      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
                    >
                      Form
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/profile"
                      className="text-xl md:text-sm font-medium hover:text-primary transition-colors"
                    >
                      Profile
                    </Link>
                  </SheetClose>
                </div>
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

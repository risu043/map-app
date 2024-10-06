import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';
import Provider from './components/Provider';
import Auth from './components/Auth';
import { MapPin } from 'lucide-react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'React Map App',
  description: 'An interactive map application built with React and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50`}
      >
        <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <MapPin className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">React Map App</h1>
              </Link>
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/lists"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Lists
                </Link>
                <Link
                  href="/form"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Form
                </Link>
              </nav>
            </div>
            <Provider>
              <Auth />
            </Provider>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}

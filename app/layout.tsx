import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Provider from './components/Provider';
import Header from './components/Header';
import './globals.css';

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
  title: 'Map App',
  description: 'An interactive map application built with Next.js',
  openGraph: {
    title: 'Map App',
    description: 'An interactive map application built with Next.js',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/ogp.jpg`,
        width: 1200,
        height: 630,
        alt: 'OGP Image for Map App',
      },
    ],
  },
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
        <Header />
        <main className="container mx-auto px-4 py-8 mt-16">
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}

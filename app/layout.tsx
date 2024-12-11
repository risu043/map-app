import type { Metadata } from 'next';
import Provider from './components/Provider';
import Header from './components/Header';
import './globals.css';
import Link from 'next/link';
import { inter } from '@/app/ui/font';

export const metadata: Metadata = {
  title: 'ふくふくマップ',
  description: '下関のおでかけスポットを探せるアプリです。',
  openGraph: {
    title: 'ふくふくマップ',
    description: '下関のおでかけスポットを探せるアプリです。',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'OGP Image for ふくふくマップ',
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
        className={`${inter.className} antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50`}
      >
        <div id="page">
          <Header />
          <main className="mt-16">
            <Provider>{children}</Provider>
          </main>
          <footer className="p-2 bg-white">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="/info/terms">利用規約</Link>
              </li>
              <li>
                <Link href="/info/policy">プライバシーポリシー</Link>
              </li>
            </ul>
            <p className="text-center">&copy; ふくふくマップ</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

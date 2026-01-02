import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Year Vision Board - Create Your Vision in 30 Minutes',
  description: 'Create your perfect New Year vision board in just 30 minutes. Choose from printable or digital templates, get inspired by our gallery, and download free resources.',
  keywords: 'vision board, new year goals, printable templates, digital vision board, goal setting, new year resolution',
  openGraph: {
    title: 'New Year Vision Board - Create Your Vision in 30 Minutes',
    description: 'Create your perfect New Year vision board in just 30 minutes. Choose from printable or digital templates.',
    type: 'website',
    url: 'https://newyearvisionboard.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'New Year Vision Board',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Year Vision Board - Create Your Vision in 30 Minutes',
    description: 'Create your perfect New Year vision board in just 30 minutes.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newyearvisionboard.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

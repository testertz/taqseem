import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taqseem — Islamic Finance Learning Platform',
  description:
    'Master Shariah-compliant finance through expert-led video courses, live classes, and private mentoring. Learn Islamic banking, Takaful, Sukuk, and more.',
  openGraph: {
    title: 'Taqseem — Islamic Finance Learning Platform',
    description:
      'Master Shariah-compliant finance through expert-led video courses, live classes, and private mentoring.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}

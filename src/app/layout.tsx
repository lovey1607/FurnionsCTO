import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const heading = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const body = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Furnions',
    template: '%s — Furnions',
  },
  description: 'Small aesthetic furniture for cafes, Airbnbs, offices & modern homes.',
  applicationName: 'Furnions',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}

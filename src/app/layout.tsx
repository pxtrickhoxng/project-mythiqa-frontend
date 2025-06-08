import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Components/Navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Project Mythiqa',
  description: 'a placeholder description for Project Mythiqa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.variable}>
          <Navbar />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

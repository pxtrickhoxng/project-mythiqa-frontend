import type { Metadata } from 'next';
import { archivo } from '@/assets/fonts';
import './globals.css';
import Navbar from './Components/Navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

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
        <body className={archivo.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

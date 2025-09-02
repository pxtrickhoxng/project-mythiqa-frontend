import type { Metadata } from 'next';
import { archivo } from '@/assets/fonts';
import './globals.css';
import Navbar from './Components/Navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { fetchUserProfileImg } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Project Mythiqa',
  description: 'a placeholder description for Project Mythiqa',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, getToken } = await auth();
  const token = await getToken();
  const user = await currentUser();

  let authData = null;
  if (userId && user?.username && token) {
    const imageUrl = await fetchUserProfileImg(user.username);
    authData = {
      isAuthenticated: true,
      username: user.username,
      imageUrl,
    };
  }

  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={archivo.className}>
          <Navbar authData={authData} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SharedLoading from '../Components/SharedLoading';
import { useAuth, useUser } from '@clerk/nextjs';
import { createUser, userExists } from '@/lib/api';
import { roles } from '@/lib/userRoles';

export default function OnboardingPage() {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const run = async () => {
      if (!userId || !user) {
        router.push('/sign-in');
        return;
      }

      const token = await getToken();
      if (!token) {
        router.push('/sign-in');
        return;
      }

      const res = await userExists(userId, token);

      if (res.ok) {
        // User exists; go home
        router.push('/');
      } else {
        // User doesn't exist; create new user
        const userPayload = {
          userId: user.id,
          username: user.username,
          email: user.emailAddresses[0].emailAddress,
          description: null,
          userBackgroundImgUrl: null,
          userProfileImgUrl: user.imageUrl,
          role: roles.user,
        };

        await createUser(userPayload, token);
        router.push('/');
      }
    };

    run();
  }, [userId, getToken, router, user]);

  return <SharedLoading />;
}

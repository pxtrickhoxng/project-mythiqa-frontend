import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import UserDropdown from './UserDropdown';
import { fetchUserProfileImg } from '@/lib/api';

const NavAuth = async () => {
  const { userId, getToken } = await auth();

  const token = await getToken();
  const user = await currentUser();

  if (userId && user?.username && token) {
    const res = await fetchUserProfileImg(user?.username);
    const data = await res.json();
    return (
      <div className='flex justify-end items-center flex-1 gap-6'>
        <UserDropdown imageUrl={data.user_profile_img_url} username={user.username} />
      </div>
    );
  }

  return (
    <div className='flex justify-end items-center flex-1 gap-6'>
      <Link
        href='/sign-in'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Sign in
      </Link>
      <Link
        href='/sign-up'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Sign up
      </Link>
    </div>
  );
};

export default NavAuth;

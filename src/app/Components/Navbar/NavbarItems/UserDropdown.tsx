'use client';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';
import profileSvg from '@/assets/profile.svg';
import logoutSvg from '@/assets/logout.svg';
import Link from 'next/link';

export default function UserDropdown({ firstName, imageUrl }: { firstName: string; imageUrl: string }) {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  return (
    <div className='relative flex items-center gap-3'>
      <p>{firstName}</p>
      <Image
        src={imageUrl}
        alt='user profile image'
        width={35}
        height={35}
        className='rounded-full object-cover border border-gray-300  hover:brightness-85'
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className='absolute top-12 right-0 bg-white/70 shadow-lg rounded-lg px-6 py-3 z-50 min-w-[220px] w-64 flex flex-col items-start gap-2'>
          <Link
            className='flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium text-black'
            href='/profile'
          >
            <Image src={profileSvg} alt='Profile' width={20} height={20} className='mr-2' />
            <p>Profile</p>
          </Link>
          <button
            className='flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-red-50 transition font-medium text-black'
            onClick={() => signOut()}
          >
            <Image src={logoutSvg} alt='Sign Out' width={20} height={20} className='mr-2' />
            <p>Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
}

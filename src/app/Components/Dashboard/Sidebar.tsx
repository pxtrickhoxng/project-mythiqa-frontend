'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='w-64 border-r-2 border-gray-300 h-full flex flex-col p-6 bg-gray-100'>
      <nav className='flex flex-col gap-2'>
        <Link
          href='/dashboard'
          className={`text-gray-700 flex gap-2 rounded-md px-4 py-2 transition-colors hover:bg-gray-200 w-full ${
            pathname === '/dashboard' ? 'bg-gray-200' : ''
          }`}
        >
          <Image src='/dashboard.svg' alt='dashboard svg' width={20} height={20} />
          <p>Dashboard</p>
        </Link>

        <Link
          href='/dashboard/profile'
          className='text-gray-700 font-medium rounded-md px-4 py-2 transition-colors hover:bg-gray-200 w-full'
        >
          Notifications
        </Link>
        <Link
          href='/dashboard/profile'
          className='text-gray-700 font-medium rounded-md px-4 py-2 transition-colors hover:bg-gray-200 w-full'
        >
          Billing
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

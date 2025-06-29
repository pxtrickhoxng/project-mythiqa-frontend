'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className='fixed top-18 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors lg:hidden'
        aria-label='Toggle sidebar'
      >
        <svg className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            className='transition-all duration-300'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300'
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${
          isOpen ? 'w-64' : 'lg:w-20'
        } fixed lg:relative top-0 left-0 z-50 lg:z-auto border-r-2 border-gray-300 h-full flex flex-col p-4 bg-gray-100 transition-all duration-300 ease-in-out`}
      >
        <div className={`mb-6 flex ${isOpen ? 'justify-end' : 'justify-center'} transition-all duration-300`}>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-md hover:bg-gray-200 transition-colors'
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                className='transition-all duration-300'
              />
            </svg>
          </button>
        </div>

        <nav className='flex flex-col gap-2'>
          <Link
            href='/dashboard'
            className={`text-gray-700 flex items-center rounded-md py-2 px-2 transition-colors hover:bg-gray-200 w-full ${
              pathname === '/dashboard' ? 'bg-gray-200' : ''
            }`}
            title={!isOpen ? 'Dashboard' : ''}
          >
            <div className='flex items-center justify-center w-8 h-8 flex-shrink-0'>
              <Image src='/dashboard.svg' alt='dashboard svg' width={20} height={20} />
            </div>
            <div
              className={`ml-2 overflow-hidden transition-all duration-300 ${
                isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}
            >
              <p className='whitespace-nowrap'>Dashboard</p>
            </div>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

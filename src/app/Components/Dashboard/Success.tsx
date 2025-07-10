'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Success = ({ success }: { success?: string }) => {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success === 'true') {
      setShowNotification(true);

      router.replace('/dashboard');

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [success, router]);

  return (
    <>
      {showNotification && (
        <div className='fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3'>
          <div className='flex items-center space-x-2'>
            <span className='text-lg'>✓</span>
            <span className='font-medium'>Chapter successfully created!</span>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className='text-white hover:text-gray-200 text-xl font-bold'
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Success;

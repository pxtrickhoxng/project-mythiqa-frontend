import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { fetchUserData } from '@/lib/api';

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-[#f7f4ed]'>
        <h1 className='text-2xl font-bold text-gray-700'>User not found</h1>
      </div>
    );
  }

  const userData = await fetchUserData(user?.id);

  const joinDate = userData?.created_at
    ? new Date(userData.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <div className='w-full min-h-screen bg-[#f7f4ed]'>
      <div className='w-5xl min-w-[320px] mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center overflow-hidden'>
        <div className='w-full h-100 relative'>
          <Image
            src={userData?.profile_background_img_url || user?.imageUrl}
            alt='Background'
            fill
            className='object-cover object-center z-0'
            priority
          />
          <div className='absolute left-1/2 bottom-0 z-10 translate-x-[-50%] translate-y-1/2'>
            <Image
              src={user?.imageUrl || '/default-profile.png'}
              alt='Profile'
              className='w-30 h-30 rounded-full border-4 border-white shadow-lg object-cover'
              width={96}
              height={96}
            />
          </div>
        </div>

        <div className='h-20' />

        <div className='px-8 pb-8 w-full flex flex-col items-center'>
          <h2 className='text-2xl font-bold text-black mb-2'>{user?.firstName || 'User Name'}</h2>
          {joinDate && <p className='text-gray-500 text-sm mb-4'>Joined {joinDate}</p>}
          <p className='text-gray-600 text-center'>{userData?.description || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default page;

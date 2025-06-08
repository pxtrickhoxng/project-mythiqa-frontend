import { currentUser } from '@clerk/nextjs/server';

const page = async () => {
  const user = await currentUser();

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='text-black'>Welcome to the dashboard, {user?.firstName}!</div>
    </div>
  );
};

export default page;

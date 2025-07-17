import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-[#f3f4f6]'>
      <SignUp />;
    </div>
  );
}

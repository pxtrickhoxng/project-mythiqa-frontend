'use client';

import { useState } from 'react';

import Image from 'next/image';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Email: ${email}\nPassword: ${password}`);
  };

  const handleGoogleSignIn = async () => {
    console.log('Google Sign In clicked');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#f7f4ed]'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md flex flex-col gap-6 min-w-[320px] w-full max-w-sm'
      >
        <h1 className='text-2xl font-bold text-center text-black mb-2'>Sign In</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-black font-medium'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='text-black font-medium'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete='current-password'
          />
        </div>
        <button type='submit' className='bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold'>
          Sign In
        </button>
        <div className='flex items-center gap-2 my-2'>
          <div className='flex-grow h-px bg-gray-300' />
          <span className='text-gray-400 text-sm'>or</span>
          <div className='flex-grow h-px bg-gray-300' />
        </div>
        <button
          type='button'
          onClick={handleGoogleSignIn}
          className='relative flex items-center justify-center border border-gray-300 py-2 rounded font-semibold text-black hover:bg-gray-100 transition'
        >
          <span className='absolute left-4 flex items-center'>
            <Image src='/google.svg' alt='Google logo' width={20} height={20} />
          </span>
          <span className='w-full text-center'>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}

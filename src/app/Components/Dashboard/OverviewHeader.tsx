const OverviewHeader = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black'>
      <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm'>
        <div className='w-[35px] h-[35px] flex items-center justify-center bg-blue-100 rounded-lg'>
          <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
            />
          </svg>
        </div>
        <div>
          <p className='text-sm text-gray-600 font-extrabold'>Stories</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
      </div>
      <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm'>
        <div className='w-[35px] h-[35px] flex items-center justify-center bg-green-100 rounded-lg'>
          <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <div>
          <p className='text-sm text-gray-600 font-extrabold'>Total Chapters</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
      </div>
      <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm'>
        <div className='w-[35px] h-[35px] flex items-center justify-center bg-purple-100 rounded-lg'>
          <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
            />
          </svg>
        </div>
        <div>
          <p className='text-sm text-gray-600 font-extrabold'>Total Words</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
      </div>{' '}
      <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm'>
        <div className='w-[35px] h-[35px] flex items-center justify-center bg-orange-100 rounded-lg'>
          <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
        </div>
        <div>
          <p className='text-sm text-gray-600 font-extrabold'>Followers</p>
          <p className='text-lg font-semibold'>0</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;

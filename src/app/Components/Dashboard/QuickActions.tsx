import Link from 'next/link';

const QuickActions = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>Quick Actions</h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
        <Link
          className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group'
          href='/dashboard/create'
        >
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
            <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-blue-700'>Add New Story</p>
            <p className='text-sm text-gray-500'>Create a new story project</p>
          </div>
        </Link>
        <Link
          className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors group'
          href='/dashboard/story-notes'
        >
          <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors'>
            <svg className='w-4 h-4 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-yellow-700'>Story Notes</p>
            <p className='text-sm text-gray-500'>Keep track of ideas and notes</p>
          </div>
        </Link>
        <Link
          className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group'
          href='/dashboard/manage-plot'
        >
          <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors'>
            <svg className='w-4 h-4 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2z'
              />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-orange-700'>Manage Plot</p>
            <p className='text-sm text-gray-500'>Plan and structure your story plot</p>
          </div>
        </Link>{' '}
        <button className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group'>
          <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors'>
            <svg className='w-4 h-4 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-purple-700'>Manage Characters</p>
            <p className='text-sm text-gray-500'>Create and edit your characters</p>
          </div>
        </button>
        <button className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors group'>
          <div className='w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors'>
            <svg className='w-4 h-4 text-teal-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-teal-700'>Manage World</p>
            <p className='text-sm text-gray-500'>Build and organize your story world</p>
          </div>
        </button>
        <button className='flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors group'>
          <div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors'>
            <svg className='w-4 h-4 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 713 0v3m-3-3a1.5 1.5 0 713 0v3m-3-3a1.5 1.5 0 713 0v3'
              />
            </svg>
          </div>
          <div className='text-left'>
            <p className='font-medium text-gray-700 group-hover:text-indigo-700'>Manage Collaborators</p>
            <p className='text-sm text-gray-500'>Invite and manage co-writers</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

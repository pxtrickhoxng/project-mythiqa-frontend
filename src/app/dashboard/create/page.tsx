import CreateStoryPage from '@/app/Components/Dashboard/CreateStoryPage';
import Link from 'next/link';

const ReturnToDashboard = () => {
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <Link
        href='/dashboard'
        className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 group'
      >
        <svg
          className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        <span className='font-medium'>Return to Dashboard</span>
      </Link>
    </div>
  );
};

const page = () => {
  return (
    <div>
      <ReturnToDashboard />
      <CreateStoryPage />
    </div>
  );
};

export default page;

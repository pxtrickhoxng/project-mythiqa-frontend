import { fetchStories } from '@/lib/api/books';
import { currentUser, auth } from '@clerk/nextjs/server';
import { Book } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';

const page = async () => {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();

  let books: Book[] = [];

  if (user && token) {
    const res = await fetchStories(user?.id);
    if (res) {
      books = res;
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='px-6 py-8 border-b border-gray-200 text-center'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Your Stories</h2>
            <p className='text-gray-600'>Select a story to edit or create new chapters for!</p>
          </div>

          {books.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
              {books.map((book: Book) => (
                <Link
                  key={book.bookId}
                  href={`/dashboard/edit-chapters/${book.bookId}`}
                  className='relative flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-all duration-200 group bg-gray-50 hover:bg-white cursor-pointer'
                >
                  {book.bookCoverUrl ? (
                    <div className='w-32 h-48 mb-3 relative'>
                      <Image
                        src={book.bookCoverUrl}
                        alt={`${book.bookName} cover`}
                        fill
                        className='object-cover rounded-md transition-all duration-200'
                      />
                    </div>
                  ) : (
                    <div className='w-32 h-48 mb-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-md flex items-center justify-center transition-all duration-200'>
                      <span className='text-gray-500 text-sm font-medium'>📚</span>
                    </div>
                  )}

                  <h3 className='text-sm font-medium text-gray-900 text-center line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
                    {book.bookName}
                  </h3>

                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <div className='text-white text-center'>
                      <svg className='w-12 h-12 mx-auto mb-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                      <p className='font-semibold text-sm'>Edit Chapters</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='p-12 text-center'>
              <div className='text-6xl mb-4'>📖</div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>No stories yet!</h3>
              <p className='text-gray-500 mb-6'>
                Create your first story to start taking notes about it, or use the general notes feature above for ideas
                that don&apos;t belong to any specific story yet.
              </p>
              <Link
                href='/dashboard/create'
                className='inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors'
              >
                <span className='mr-2'>✍️</span>
                Create Your First Story
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

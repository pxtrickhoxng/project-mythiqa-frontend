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
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Story Notes</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-6'>
            Your creative chaos headquarters! Dump all your messy ideas, plot twists, character backstories, and random
            &ldquo;what-if&rdquo; moments here. No judgment, just pure creative freedom. Sometimes the best stories come
            from the messiest notes!
          </p>
        </div>

        <div className='mb-12'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Quick Actions</h2>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2'
                href='/dashboard/story-notes/create'
              >
                Create General Note
              </Link>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='px-6 py-8 border-b border-gray-200'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Your Stories</h2>
            <p className='text-gray-600'>
              Select a story to create specific notes, character profiles, plot outlines, or just brain-dump about it!
            </p>
          </div>

          {books.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
              {books.map((book: Book) => (
                <div
                  key={book.bookId}
                  className='relative flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 group bg-gray-50 hover:bg-white'
                >
                  {book.bookCoverUrl ? (
                    <div className='w-32 h-48 mb-3 relative'>
                      <Image
                        src={book.bookCoverUrl}
                        alt={`${book.bookName} cover`}
                        fill
                        className='object-cover rounded-md group-hover:brightness-90 transition-all duration-200'
                      />
                    </div>
                  ) : (
                    <div className='w-32 h-48 mb-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-md flex items-center justify-center group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-200'>
                      <span className='text-gray-500 text-sm font-medium'>📚</span>
                    </div>
                  )}

                  <h3 className='text-sm font-medium text-gray-900 text-center line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 mb-3'>
                    {book.bookName}
                  </h3>

                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4'>
                    <div className='space-y-2 w-full'>
                      <Link
                        href={`/dashboard/story-notes/${book.bookId}`}
                        className='block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors text-center shadow-lg'
                      >
                        View Notes
                      </Link>
                    </div>
                  </div>
                </div>
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

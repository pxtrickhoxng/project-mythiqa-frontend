import { fetchStories } from '@/lib/api';
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
    const res = await fetchStories(user?.id, token);
    if (res.ok) {
      books = await res.json();
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      <ReturnToDashboard />
      <div className='flex items-center justify-between mb-6 px-20 py-10'>
        <h2 className='text-xl font-semibold text-gray-800'>Stories</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-20'>
        {books.map((book: Book) => (
          <div
            key={book.book_id}
            className='relative flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group'
          >
            {book.book_cover_url ? (
              <div className='w-32 h-48 mb-3 relative'>
                <Image
                  src={book.book_cover_url}
                  alt={`${book.book_name} cover`}
                  fill
                  className='object-cover rounded-md group-hover:brightness-75 transition-all duration-200'
                />
              </div>
            ) : (
              <div className='w-32 h-48 mb-3 bg-gray-200 rounded-md flex items-center justify-center group-hover:bg-gray-300 transition-all duration-200'>
                <span className='text-gray-500 text-sm'>No Cover</span>
              </div>
            )}

            <h3 className='text-sm font-medium text-gray-900 text-center line-clamp-2 group-hover:text-gray-700 transition-colors duration-200'>
              {book.book_name}
            </h3>

            <div className='absolute inset-0 bg-black/40 rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <div className='space-y-3'>
                <Link
                  href={`/dashboard/story-notes/${book.book_id}`}
                  className='block w-full px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors text-center'
                >
                  Manage Story Notes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

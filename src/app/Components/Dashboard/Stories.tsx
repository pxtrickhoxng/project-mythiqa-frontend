import { fetchStories } from '@/lib/api';
import { currentUser, auth } from '@clerk/nextjs/server';
import Image from 'next/image';

type Book = {
  book_id: number;
  user_id: string;
  book_name: string;
  book_type?: string;
  description?: string;
  genre?: string;
  target_audience?: string;
  content_warnings?: string[];
  book_cover_url?: string;
  created_at: string;
};

const Stories = async () => {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken?.();

  let books: Book[] = [];

  if (user && token) {
    const res = await fetchStories(user?.id, token);
    if (res.ok) {
      books = await res.json();
    }
  }
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>Stories</h2>
      </div>

      {books.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {books.map((book: Book) => (
            <div
              key={book.book_id}
              className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
            >
              {book.book_cover_url ? (
                <div className='w-32 h-48 mb-3 relative'>
                  <Image
                    src={book.book_cover_url}
                    alt={`${book.book_name} cover`}
                    fill
                    className='object-cover rounded-md'
                  />
                </div>
              ) : (
                <div className='w-32 h-48 mb-3 bg-gray-200 rounded-md flex items-center justify-center'>
                  <span className='text-gray-500 text-sm'>No Cover</span>
                </div>
              )}
              <h3 className='text-sm font-medium text-gray-900 text-center line-clamp-2'>{book.book_name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>
            Looks like there&apos;s nothing here. You should try and make one with the tools above!
          </p>
        </div>
      )}
    </div>
  );
};

export default Stories;

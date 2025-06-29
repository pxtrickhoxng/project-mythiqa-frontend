import { fetchStories } from '@/lib/api';
import { currentUser, auth } from '@clerk/nextjs/server';
import BookList from './BookList';
import { Book } from '@/utils/types';

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
        <BookList books={books} />
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

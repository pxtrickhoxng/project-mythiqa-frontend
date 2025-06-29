import Image from 'next/image';
import { Book } from '@/utils/types';
import Link from 'next/link';

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {books.map((book: Book) => (
        <Link
          key={book.book_id}
          className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
          href={`/dashboard/create/new-chapter/${book.book_id}`}
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
        </Link>
      ))}
    </div>
  );
};

export default BookList;

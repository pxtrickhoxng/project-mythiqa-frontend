import Image from 'next/image';
import Link from 'next/link';
import { Book, Chapter } from '@/utils/types';
import { formatDate } from '@/utils/formateDate';
import { auth } from '@clerk/nextjs/server';

type PropTypes = {
  book: Book;
  firstChapter: Chapter | null;
};

const BookPreview = async ({ book, firstChapter }: PropTypes) => {
  const { userId } = await auth();
  return (
    <div className='relative bg-gray-50'>
      <div className='absolute inset-0 bg-[#e5e8ee]'></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          <div className='lg:col-span-1'>
            <div className='relative w-full max-w-sm mx-auto'>
              {book.bookCoverUrl ? (
                <div className='relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-2xl'>
                  <Image
                    src={book.bookCoverUrl}
                    alt={`${book.bookName} cover`}
                    fill
                    className='object-cover'
                    priority
                  />
                </div>
              ) : (
                <div className='aspect-[3/4] w-full bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg shadow-2xl flex items-center justify-center'>
                  <div className='text-center text-gray-600'>
                    <p className='text-lg font-medium'>No Cover</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='lg:col-span-2 text-gray-900'>
            <div className='space-y-6'>
              <div>
                <h1 className='text-4xl lg:text-5xl font-bold mb-2 leading-tight text-gray-900'>{book.bookName}</h1>
                {book.bookType && (
                  <span className='inline-block px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-medium'>
                    {book.bookType}
                  </span>
                )}
              </div>

              <div className='flex flex-wrap gap-2'>
                {book.genre && (
                  <span className='px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800'>
                    {book.genre}
                  </span>
                )}
                {book.targetAudience && (
                  <span className='px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                    {book.targetAudience}
                  </span>
                )}
              </div>

              <div className='flex flex-wrap gap-3'>
                {firstChapter ? (
                  <Link
                    href={`/read/${book.bookName}/${book.bookId}/chapter/${firstChapter.chapterId}`}
                    className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg'
                  >
                    Start Reading
                  </Link>
                ) : (
                  <button
                    disabled
                    className='px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed shadow-lg'
                  >
                    No Chapters Available
                  </button>
                )}
                {userId === book.userId && (
                  <Link
                    href={`/dashboard/create/new-chapter/${book.bookId}`}
                    className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg'
                  >
                    Add New Chapter
                  </Link>
                )}
              </div>

              <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
                <div className='flex items-center gap-2'>Published {formatDate(book.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;

import { fetchBookData, fetchBookChapters } from '@/lib/api';
import { auth } from '@clerk/nextjs/server';
import { Book } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

type PageProps = {
  params: {
    bookId: string;
  };
};

interface Chapter {
  chapter_id: string;
  chapter_name: string;
  chapter_content: object;
  created_at: string;
}

const page = async ({ params }: PageProps) => {
  const { bookId } = await params;
  const { getToken, userId } = await auth();
  const token = await getToken?.();

  console.log(userId);
  if (!token) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Please sign in to view this book.</p>
      </div>
    );
  }

  try {
    const [bookRes, chaptersRes] = await Promise.all([fetchBookData(bookId, token), fetchBookChapters(bookId, token)]);

    const book: Book = await bookRes.json();
    const chapters: Chapter[] = await chaptersRes.json().then(data => data.Items || []);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div className='min-h-screen bg-gray-50 pt-12'>
        <div className='relative bg-gray-50'>
          <div className='absolute inset-0 bg-[#e5e8ee]'></div>
          <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
              <div className='lg:col-span-1'>
                <div className='relative w-full max-w-sm mx-auto'>
                  {book.book_cover_url ? (
                    <div className='relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-2xl'>
                      <Image
                        src={book.book_cover_url}
                        alt={`${book.book_name} cover`}
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
                    <h1 className='text-4xl lg:text-5xl font-bold mb-2 leading-tight text-gray-900'>
                      {book.book_name}
                    </h1>
                    {book.book_type && (
                      <span className='inline-block px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-medium'>
                        {book.book_type}
                      </span>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {book.genre && (
                      <span className='px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800'>
                        {book.genre}
                      </span>
                    )}
                    {book.target_audience && (
                      <span className='px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                        {book.target_audience}
                      </span>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-3'>
                    <Link
                      href={`/read/${book.book_id}/chapter/1`}
                      className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg'
                    >
                      Start Reading
                    </Link>
                    {userId === book.user_id && (
                      <Link
                        href={`/dashboard/create/new-chapter/${book.book_id}`}
                        className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg'
                      >
                        Add New Chapter
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>Published {formatDate(book.created_at)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
              {book.description && (
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>Synopsis</h2>
                  <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>{book.description}</p>
                </div>
              )}

              {book.content_warnings && book.content_warnings.length > 0 && (
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-yellow-800 mb-2'>Content Warnings</h3>
                  <div className='flex flex-wrap gap-2'>
                    {book.content_warnings.map((warning, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'
                      >
                        {warning}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className='bg-white rounded-lg shadow-sm'>
                <div className='p-6 border-b border-gray-200'>
                  <h2 className='text-2xl font-bold text-gray-900'>Chapters</h2>
                  <p className='text-gray-600 mt-1'>
                    {chapters.length} chapter{chapters.length !== 1 ? 's' : ''} available
                  </p>
                </div>

                {chapters.length > 0 ? (
                  <div className='divide-y divide-gray-200'>
                    {chapters.map((chapter, index) => (
                      <Link
                        key={chapter.chapter_id}
                        href={`/read/${book.book_id}/chapter/${index + 1}`}
                        className='block p-4 hover:bg-gray-50 transition-colors'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex-1'>
                            <h3 className='font-medium text-gray-900'>
                              Chapter {index + 1}: {chapter.chapter_name}
                            </h3>
                            <p className='text-sm text-gray-500 mt-1'>Published {formatDate(chapter.created_at)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className='p-8 text-center'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>No chapters yet</h3>
                    <p className='text-gray-500'>The author hasn&apos;t published any chapters for this story.</p>
                  </div>
                )}
              </div>
            </div>

            <div className='lg:col-span-1 space-y-6'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Book Details</h3>
                <div className='space-y-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Genre</label>
                    <p className='text-gray-900'>{book.genre || 'Not specified'}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Target Audience</label>
                    <p className='text-gray-900'>{book.target_audience || 'Not specified'}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Book Type</label>
                    <p className='text-gray-900'>{book.book_type || 'Not specified'}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Chapters</label>
                    <p className='text-gray-900'>{chapters.length}</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-500 mb-1'>Published</label>
                    <p className='text-gray-900'>{formatDate(book.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching book data:', error);
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500'>Error loading book. Please try again.</p>
      </div>
    );
  }
};

export default page;

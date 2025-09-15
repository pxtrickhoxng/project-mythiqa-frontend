import { fetchBookData } from '@/lib/api/books';
import { fetchChapters } from '@/lib/api/chapters';
import { Book, Chapter } from '@/utils/types';
import Link from 'next/link';
import BookDetails from '@/app/Components/Book/BookDetails';
import { formatDate } from '@/utils/formateDate';
import BookPreview from '@/app/Components/Book/BookPreview';

type PageProps = {
  params: {
    bookId: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { bookId } = await params;

  try {
    const [bookRes, chaptersRes] = await Promise.all([fetchBookData(bookId), fetchChapters(bookId)]);

    const book: Book = await bookRes.json();
    const chapters: Chapter[] = await chaptersRes.json();

    // Sort chapters by chapterNumber (convert string to number for proper sorting)
    const sortedChapters = chapters.sort((a, b) => parseInt(a.chapterNumber) - parseInt(b.chapterNumber));

    console.log(sortedChapters);
    return (
      <div className='min-h-screen bg-gray-50 pt-12'>
        <BookPreview book={book} />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
              {book.description && (
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>Synopsis</h2>
                  <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>{book.description}</p>
                </div>
              )}

              {book.contentWarnings && book.contentWarnings.trim() !== '' && (
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-yellow-800 mb-2'>Content Warnings</h3>
                  <div className='flex flex-wrap gap-2'>
                    {book.contentWarnings.split(',').map((warning, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'
                      >
                        {warning.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className='bg-white rounded-lg shadow-sm'>
                <div className='p-6 border-b border-gray-200'>
                  <h2 className='text-2xl font-bold text-gray-900'>Chapters</h2>
                  <p className='text-gray-600 mt-1'>
                    {sortedChapters.length} chapter{sortedChapters.length !== 1 ? 's' : ''} available
                  </p>
                </div>

                {sortedChapters.length > 0 ? (
                  <div className='divide-y divide-gray-200'>
                    {sortedChapters.map((chapter, index) => (
                      <Link
                        key={chapter.chapterId}
                        href={`/read/${book.bookName}/${book.bookId}/chapter/${chapter.chapterId}`}
                        className='block p-4 hover:bg-gray-50 transition-colors'
                      >
                        <div className='flex items-start gap-3'>
                          <div className='flex-shrink-0'>
                            <span className='text-sm font-bold text-gray-400'>{index + 1}</span>
                          </div>
                          <div className='flex-1'>
                            <h3 className='font-medium text-gray-900'>{chapter.chapterName}</h3>
                            <p className='text-sm text-gray-500 mt-1'>Published {formatDate(chapter.createdAt)}</p>
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
            <BookDetails book={book} chapters={sortedChapters} />
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

import { Book, Chapter } from '@/utils/types';
import { formatDate } from '@/utils/formateDate';

type PropTypes = {
  book: Book;
  chapters: Chapter[];
};

const BookDetails = ({ book, chapters }: PropTypes) => {
  return (
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
            <p className='text-gray-900'>{book.targetAudience || 'Not specified'}</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>Book Type</label>
            <p className='text-gray-900'>{book.bookType || 'Not specified'}</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>Chapters</label>
            <p className='text-gray-900'>{chapters.length}</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>Published</label>
            <p className='text-gray-900'>{formatDate(book.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

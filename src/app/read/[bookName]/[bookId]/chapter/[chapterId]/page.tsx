import { fetchOneChapter } from '@/lib/api/chapters';
import Link from 'next/link';

import { generateHTML } from '@tiptap/html';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';

import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type Props = {
  params: {
    bookName: string;
    bookId: string;
    chapterId: string;
  };
};

const page = async ({ params }: Props) => {
  const { bookName, bookId, chapterId } = await params;

  try {
    const data = await fetchOneChapter(bookId, chapterId);
    console.log(data);

    const { currentChapter, prevChapter, nextChapter } = data;

    // Parse the JSON content for TipTap
    const chapterContent = JSON.parse(currentChapter.chapterContent);

    const html = generateHTML(chapterContent, [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ]);

    return (
      <div className='min-h-screen bg-white pt-12'>
        {currentChapter.chapterName && (
          <div className='bg-white z-10'>
            <div className='max-w-4xl mx-auto px-6 py-6'>
              <h1 className='text-3xl font-bold text-black'>
                Chapter {currentChapter.chapterNumber}: {currentChapter.chapterName}
              </h1>
            </div>
          </div>
        )}

        <div className='max-w-4xl mx-auto px-6 mt-6'>
          <div
            className={`text-black ${merriweather.className} prose max-w-none md:text-base lg:text-lg`}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div
            className={`flex items-center mt-12 pt-8 border-t border-gray-200 ${
              prevChapter && nextChapter
                ? 'justify-between'
                : prevChapter
                ? 'justify-start'
                : nextChapter
                ? 'justify-end'
                : 'justify-center'
            }`}
          >
            {prevChapter && (
              <Link
                href={`/read/${bookName}/${bookId}/chapter/${prevChapter.chapterId}`}
                className='flex flex-col items-start p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors max-w-xs'
              >
                <span className='text-sm text-gray-500 mb-1'>← Previous Chapter</span>
                <span className='font-semibold text-black'>Chapter {prevChapter.chapterNumber}</span>
                <span className='text-sm text-gray-700 truncate w-full'>{prevChapter.chapterName}</span>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/read/${bookName}/${bookId}/chapter/${nextChapter.chapterId}`}
                className='flex flex-col items-end p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors max-w-xs text-right'
              >
                <span className='text-sm text-gray-500 mb-1'>Next Chapter →</span>
                <span className='font-semibold text-black'>Chapter {nextChapter.chapterNumber}</span>
                <span className='text-sm text-gray-700 truncate w-full'>{nextChapter.chapterName}</span>
              </Link>
            )}
          </div>

          <div className='h-32'></div>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div className='min-h-screen bg-white flex flex-col justify-center items-center px-4'>
        <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-16 text-center max-w-md'>
          <div className='text-6xl mb-8'>📚</div>
          <h1 className={`${merriweather.className} text-3xl font-bold text-black mb-6`}>Whoops!</h1>
          <p className='text-black mb-4 text-lg'>Are you sure this chapter exists?</p>
          <p className='text-gray-600'>Please try again or return home</p>
        </div>
      </div>
    );
  }
};

export default page;

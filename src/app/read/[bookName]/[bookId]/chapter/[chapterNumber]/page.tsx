import { fetchOneChapter } from '@/lib/api';

import { generateHTML } from '@tiptap/html';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';

import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });

type Props = {
  params: {
    bookId: string;
    chapterNumber: string;
  };
};

const page = async ({ params }: Props) => {
  const { bookId, chapterNumber } = await params;
  const token = process.env.NEXT_PUBLIC_FRONTEND_API_KEY || '';

  try {
    const res = await fetchOneChapter(bookId, chapterNumber, token);
    const chapter = await res.json();

    const html = generateHTML(chapter.chapter_content, [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ]);

    return (
      <div className='min-h-screen bg-white pt-12'>
        {chapter.chapter_name && (
          <div className='bg-white z-10'>
            <div className='max-w-4xl mx-auto px-6 py-6'>
              <h1 className='text-3xl font-bold text-black'>
                Chapter {chapterNumber}: {chapter.chapter_name}
              </h1>
            </div>
          </div>
        )}

        <div className='max-w-4xl mx-auto px-6 mt-6'>
          <div
            className={`text-black ${merriweather.className} prose max-w-none md:text-base lg:text-lg`}
            dangerouslySetInnerHTML={{ __html: html }}
          />

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

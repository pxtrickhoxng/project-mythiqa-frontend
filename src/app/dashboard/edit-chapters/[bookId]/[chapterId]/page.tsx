'use client';

import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';
import SaveChapter from '@/app/Components/Dashboard/SaveChapter';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { fetchOneChapter } from '@/lib/api/chapters';
import { useAuth } from '@clerk/nextjs';
import { JSONContent } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Params = {
  bookId: string;
  chapterId: string;
};

const Page = () => {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [chapterName, setChapterName] = useState<string>('');
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [prevChapter, setPrevChapter] = useState<{
    chapterId: string;
    chapterNumber: number;
    chapterName: string;
  } | null>(null);
  const [nextChapter, setNextChapter] = useState<{
    chapterId: string;
    chapterNumber: number;
    chapterName: string;
  } | null>(null);
  const { getToken } = useAuth();

  const params = useParams() as Params;
  const { bookId, chapterId } = params;

  useEffect(() => {
    if (!bookId || !chapterId) return;

    async function fetchChapterData() {
      try {
        setIsLoading(true);
        const data = await fetchOneChapter(bookId, chapterId);
        const { currentChapter, prevChapter, nextChapter } = data;

        // Set the chapter data
        setChapterName(currentChapter.chapterName);
        setChapterNumber(parseInt(currentChapter.chapterNumber));

        // Parse the chapter content JSON
        const parsedContent = JSON.parse(currentChapter.chapterContent);
        setEditorContent(parsedContent);

        // Set prev/next chapter info
        setPrevChapter(prevChapter);
        setNextChapter(nextChapter);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chapter:', error);
        setIsLoading(false);
      }
    }

    fetchChapterData();
  }, [bookId, chapterId]);

  const handleEditorChange = (content: JSONContent) => {
    setEditorContent(content);
  };

  const handleSaveChapter = async () => {
    if (!editorContent) {
      console.error('No content to save');
      return;
    }

    if (!chapterName.trim()) {
      console.error('Chapter name is required');
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
      return;
    }

    if (chapterNumber === null) {
      console.error('Chapter number not loaded yet');
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    const token = await getToken();
    if (!token) {
      setSaveStatus('error');
      setIsSaving(false);
      return;
    }

    try {
      // TODO: Replace with updateChapter API call
      const chapterPayload = {
        chapterContent: editorContent,
        chapterName,
        chapterNumber: chapterNumber,
        bookId: bookId,
        chapterId: chapterId,
      };

      console.log('Saving chapter:', chapterPayload);
      // const res = await updateChapter(chapterPayload, token);

      // Simulate success for now
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);

      // if (res.ok) {
      //   setSaveStatus('success');
      //   setTimeout(() => {
      //     setSaveStatus('idle');
      //   }, 3000);
      // } else {
      //   setSaveStatus('error');
      //   setTimeout(() => {
      //     setSaveStatus('idle');
      //   }, 3000);
      // }
    } catch (error) {
      console.error('Failed to update chapter:', error);
      setSaveStatus('error');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-4xl mb-4'>📖</div>
          <p className='text-gray-600'>Loading chapter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />
      <div className='flex flex-col justify-center items-center text-black'>
        <div className='w-full max-w-6xl mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <label htmlFor='chapterName' className='block text-lg font-semibold text-gray-700'>
              Chapter Name
            </label>
            {chapterNumber !== null ? (
              <span className='text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>Chapter {chapterNumber}</span>
            ) : (
              <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>Loading...</span>
            )}
          </div>
          <input
            id='chapterName'
            type='text'
            value={chapterName}
            onChange={e => setChapterName(e.target.value)}
            placeholder='Enter chapter name...'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <div className='border-1 border-gray-400 w-full max-w-6xl'>
          <SimpleEditor onTextChange={handleEditorChange} initialContent={editorContent} />
        </div>

        {/* Navigation to Previous/Next Chapter */}
        {(prevChapter || nextChapter) && (
          <div className='w-full max-w-6xl mt-8 pt-6 border-t border-gray-300'>
            <div
              className={`flex items-center gap-4 ${
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
                  href={`/dashboard/edit-chapters/${bookId}/${prevChapter.chapterId}`}
                  className='flex flex-col items-start p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors w-64 shadow-sm'
                >
                  <span className='text-sm text-gray-500 mb-1'>← Edit Previous Chapter</span>
                  <span className='font-semibold text-gray-900'>Chapter {prevChapter.chapterNumber}</span>
                  <span className='text-sm text-gray-700 truncate w-full'>{prevChapter.chapterName}</span>
                </Link>
              )}

              {nextChapter && (
                <Link
                  href={`/dashboard/edit-chapters/${bookId}/${nextChapter.chapterId}`}
                  className='flex flex-col items-end p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors w-64 text-right shadow-sm'
                >
                  <span className='text-sm text-gray-500 mb-1'>Edit Next Chapter →</span>
                  <span className='font-semibold text-gray-900'>Chapter {nextChapter.chapterNumber}</span>
                  <span className='text-sm text-gray-700 truncate w-full'>{nextChapter.chapterName}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <SaveChapter
        onSave={handleSaveChapter}
        isSaving={isSaving}
        saveStatus={saveStatus}
        editorContent={editorContent}
        chapterName={chapterName}
      />
    </div>
  );
};

export default Page;

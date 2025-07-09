'use client';

import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';
import SaveChapter from '@/app/Components/Dashboard/SaveChapter';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { createChapter } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';
import { JSONContent } from '@tiptap/react';
import { useState } from 'react';

type PageProps = {
  params: {
    bookid: string;
  };
};

const Page = ({ params }: PageProps) => {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [chapterName, setChapterName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { getToken } = useAuth();

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

    setIsSaving(true);
    setSaveStatus('idle');

    const token = await getToken();
    if (!token) {
      setSaveStatus('error');
      setIsSaving(false);
      return;
    }

    try {
      const res = await createChapter(editorContent, chapterName, params.bookid, token);
      if (res.ok) {
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }

      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to create chapter:', error);
      setSaveStatus('error');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />
      <div className='flex flex-col justify-center items-center text-black'>
        <div className='w-full max-w-6xl mb-4'>
          <label htmlFor='chapterName' className='block text-lg font-semibold text-gray-700 mb-2'>
            Chapter Name
          </label>
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
          <SimpleEditor onTextChange={handleEditorChange} />
        </div>
      </div>

      <SaveChapter
        onSave={handleSaveChapter}
        isSaving={isSaving}
        saveStatus={saveStatus}
        editorContent={editorContent}
      />
    </div>
  );
};

export default Page;

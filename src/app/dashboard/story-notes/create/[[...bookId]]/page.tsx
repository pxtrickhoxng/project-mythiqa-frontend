'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';

const CreateNotePage = () => {
  const router = useRouter();

  const { bookId } = useParams<{ bookId?: string[] }>();
  const parsedBookId = bookId?.[0] ?? null;

  const [title, setTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !noteContent.trim()) return;

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to create note
      // change noteContent to use tiptap editor, but with simpler changes.
      console.log('Creating note with:', {
        title: title.trim(),
        noteContent: noteContent.trim(),
        tags,
        favorited,
        checked,
        images,
        bookId: parsedBookId || null,
      });
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create New Note</h1>
          <p className='text-gray-600'>
            {parsedBookId ? 'Add a new note for your story' : 'Create a general note for your ideas'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <label htmlFor='title' className='block text-sm font-semibold text-gray-700 mb-2'>
              Note Title <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Give your note a catchy title...'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black'
              required
            />
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <label htmlFor='noteContent' className='block text-sm font-semibold text-gray-700 mb-2'>
              Note Content <span className='text-red-600'>*</span>
            </label>
            <textarea
              id='noteContent'
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder='Pour out all your thoughts, ideas, character details, plot twists, random musings... anything goes!'
              rows={12}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-black'
              required
            />
            <p className='text-sm text-gray-500 mt-2'>
              Pro tip: Don&apos;t worry about perfect formatting. This is your creative dumping ground!
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Tags</label>
            <div className='flex gap-2 mb-3'>
              <input
                type='text'
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder='Add tags (character, plot, worldbuilding, etc.)'
                className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black'
              />
              <button
                type='button'
                onClick={handleAddTag}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
              >
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => handleRemoveTag(tag)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Images</label>

            <input
              id='image-upload'
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
              className='hidden'
            />

            <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors'>
              <div className='text-center'>
                <button
                  type='button'
                  onClick={triggerFileInput}
                  className='px-6 py-3 bg-gradient-to-r bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto'
                >
                  Choose Images
                </button>
                <p className='text-sm text-gray-500 mt-4'>
                  Upload reference images, sketches, inspiration photos, or anything visual that helps your creativity!
                </p>
                <p className='text-xs text-gray-400 mt-2'>Supports: JPG, PNG, GIF, WebP • Multiple files allowed</p>
              </div>
            </div>

            {images.length > 0 && (
              <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {images.map((image, index) => (
                  <div key={index} className='relative group'>
                    <div className='w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden'>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-sm font-semibold text-gray-700 mb-4'>Options</h3>
            <div className='space-y-4'>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={favorited}
                  onChange={e => setFavorited(e.target.checked)}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
                <span className='text-gray-700'>Mark as favorite (for your most brilliant ideas)</span>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={e => setChecked(e.target.checked)}
                  className='w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500'
                />
                <span className='text-gray-700'>Mark as completed/resolved</span>
              </label>
            </div>
          </div>

          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.back()}
              className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting || !title.trim() || !noteContent.trim()}
              className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                isSubmitting || !title.trim() || !noteContent.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Creating Note...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;

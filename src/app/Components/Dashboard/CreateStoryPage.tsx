'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createStory } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateStoryPage = () => {
  const { getToken, userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingBook, setExistingBook] = useState(false);
  const warningRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (existingBook && warningRef.current) {
      warningRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [existingBook]);

  const [formData, setFormData] = useState({
    bookName: '',
    bookType: '',
    description: '',
    genre: '',
    targetAudience: '',
    bookCover: null as File | null,
    contentWarnings: [] as string[],
  });

  const bookTypes = [
    'Novel',
    'Novella/Short Story',
    'Poetry',
    'Memoir/Autobiography',
    "Children's Book",
    'Non-Fiction',
    'Anthology',
    'Other',
  ];

  const genres = [
    'Fantasy',
    'Science Fiction',
    'Romance',
    'Mystery',
    'Thriller',
    'Horror',
    'Historical Fiction',
    'Contemporary',
    'Young Adult',
    'Literary Fiction',
    'Adventure',
    'Comedy/Humor',
    'Drama',
    'Other',
  ];

  const targetAudiences = ['Children (0-12)', 'Teens (13-17)', 'Adult (18+)', 'All Ages'];

  const contentWarningOptions = [
    'Violence/Gore',
    'Sexual Content',
    'Substance Use/Abuse',
    'Mental Health Topics (e.g., depression, PTSD, anxiety)',
    'Self-Harm/Suicidal Themes',
    'Abuse/Trauma',
    'Strong Language',
    'Death/Grief',
    'Discrimination/Hate',
    'Other Mature Themes',
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      bookCover: file,
    }));
  };

  const handleContentWarningChange = (warning: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contentWarnings: checked ? [...prev.contentWarnings, warning] : prev.contentWarnings.filter(w => w !== warning),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert('Please log in to create a story');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Unable to get authentication token');
      }

      const apiFormData = new FormData();
      apiFormData.append('book_name', formData.bookName);
      apiFormData.append('book_type', formData.bookType);
      apiFormData.append('description', formData.description || '');
      apiFormData.append('genre', formData.genre || '');
      apiFormData.append('target_audience', formData.targetAudience || '');
      apiFormData.append('content_warnings', JSON.stringify(formData.contentWarnings));
      if (formData.bookCover) {
        apiFormData.append('book_cover', formData.bookCover);
      }

      const response = await createStory(apiFormData, userId, token);

      if (response.ok) {
        setExistingBook(false);
        router.back();
      } else if (response.status === 409) {
        setExistingBook(true);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto text-black'>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
        {' '}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create New Story</h1>
          <p className='text-gray-600'>Start by setting up basic story details</p>
        </div>{' '}
        {existingBook && (
          <div ref={warningRef} className='mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <div className='mt-2 text-sm text-yellow-700'>
                  <p>A book with this name already exists. Please choose a different name.</p>
                </div>
                <div className='mt-3'>
                  <button
                    type='button'
                    onClick={() => setExistingBook(false)}
                    className='text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-1 px-3 rounded transition-colors'
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='bookName' className='block text-sm font-medium text-gray-700 mb-2'>
              Book Name *
            </label>
            <input
              type='text'
              id='bookName'
              name='bookName'
              value={formData.bookName}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='Enter your story title...'
              required
            />
          </div>
          <div>
            <label htmlFor='bookCover' className='block text-sm font-medium text-gray-700 mb-2'>
              Book Cover
            </label>
            <div className='flex items-center space-x-4'>
              <div className='flex-1'>
                <input
                  type='file'
                  id='bookCover'
                  name='bookCover'
                  onChange={handleFileChange}
                  accept='image/*'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
                <p className='text-xs text-gray-500 mt-1'>PNG, JPG, GIF up to 10MB. Recommended: 600x900px</p>
              </div>
              {formData.bookCover && (
                <div className='w-16 h-20 bg-gray-100 rounded border flex items-center justify-center'>
                  <Image
                    src={URL.createObjectURL(formData.bookCover)}
                    alt='Book cover preview'
                    width={50}
                    height={50}
                    className='w-full h-full object-cover rounded'
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor='bookType' className='block text-sm font-medium text-gray-700 mb-2'>
              Book Type *
            </label>
            <select
              id='bookType'
              name='bookType'
              value={formData.bookType}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              required
            >
              <option value=''>Select a book type...</option>
              {bookTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='genre' className='block text-sm font-medium text-gray-700 mb-2'>
              Genre
            </label>
            <select
              id='genre'
              name='genre'
              value={formData.genre}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            >
              <option value=''>Select a genre...</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>{' '}
          <div>
            <label htmlFor='targetAudience' className='block text-sm font-medium text-gray-700 mb-2'>
              Target Audience
            </label>
            <select
              id='targetAudience'
              name='targetAudience'
              value={formData.targetAudience}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            >
              <option value=''>Select target audience...</option>
              {targetAudiences.map(audience => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </select>{' '}
            {formData.targetAudience === 'Adult (18+)' && (
              <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <div className='mb-3'>
                  <p className='text-sm text-red-800'>
                    <strong>Content Declaration:</strong> Please select all mature themes present in your story. This
                    helps readers make informed choices and ensures platform compliance. Failure to comply may result in
                    your story being removed from the platform.
                  </p>
                </div>
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-red-800 mb-2'>Select all that apply:</p>
                  <div className='grid grid-cols-2 gap-2'>
                    {contentWarningOptions.map(warning => (
                      <label key={warning} className='flex items-center space-x-2 text-sm text-red-700'>
                        <input
                          type='checkbox'
                          checked={formData.contentWarnings.includes(warning)}
                          onChange={e => handleContentWarningChange(warning, e.target.checked)}
                          className='w-4 h-4 text-red-600 bg-white border-red-300 rounded'
                        />
                        <span>{warning}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className='mt-3 pt-3 border-t border-red-200'>
                  <p className='text-xs text-red-700'>
                    <strong>Note:</strong> All mature content should have a meaningful narrative purpose and be handled
                    with care and respect for your readers. Consider how your story impacts your audience and aim for
                    thoughtful, responsible storytelling.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
              Synopsis
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical'
              placeholder='Describe your story, its themes, or anything else you wish to attract readers...'
            />
          </div>{' '}
          <div className='flex gap-4 pt-6'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              {isSubmitting ? 'Creating Story...' : 'Create Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryPage;

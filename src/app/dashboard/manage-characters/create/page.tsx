'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { createCharacter } from '@/lib/api/characters';
import { CreateCharacterForm, Appearance } from '@/utils/types';

export default function CreateCharacter() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { getToken } = useAuth();

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    basic: false,
    personality: false,
    appearance: false,
    clothing: false,
    background: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // TODO: Replace with API call to fetch user's books
  const availableBooks = [
    { bookId: 'book1', title: 'The Chronicles of Mythiqa' },
    { bookId: 'book2', title: 'Shadows of the Forgotten Realm' },
    { bookId: 'book3', title: "The Last Dragon's Song" },
  ];

  const [formData, setFormData] = useState<CreateCharacterForm>({
    name: '',
    nicknames: [],
    bookId: '',
    age: 20,
    gender: 'other',
    raceOrSpecies: '',
    role: 'side_character',
    faction: '',
    personalityTraits: [],
    speechPatterns: '',
    appearance: {
      height: '',
      build: '',
      eyeColor: '',
      hairColor: '',
      hairStyle: '',
      skinTone: '',
      distinguishingFeatures: [],
      clothing: {
        style: '',
        colors: [],
        accessories: [],
      },
    },
    backstory: '',
    generalNotes: '',
  });

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Input states for array fields
  const [nicknameInput, setNicknameInput] = useState('');
  const [traitInput, setTraitInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');

  const handleInputChange = (field: keyof CreateCharacterForm, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAppearanceChange = (field: keyof Appearance, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value },
    }));
  };

  const handleClothingChange = (field: keyof Appearance['clothing'], value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        clothing: { ...prev.appearance.clothing, [field]: value },
      },
    }));
  };

  // Array manipulation helpers
  const addToArray = (field: keyof CreateCharacterForm, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
    }
  };

  const removeFromArray = (field: keyof CreateCharacterForm, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const addToAppearanceArray = (field: keyof Appearance, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          [field]: [...(prev.appearance[field] as string[]), value.trim()],
        },
      }));
    }
  };

  const removeFromAppearanceArray = (field: keyof Appearance, index: number) => {
    setFormData(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: (prev.appearance[field] as string[]).filter((_, i) => i !== index),
      },
    }));
  };

  const addToClothingArray = (field: keyof Appearance['clothing'], value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          clothing: {
            ...prev.appearance.clothing,
            [field]: [...prev.appearance.clothing[field], value.trim()],
          },
        },
      }));
    }
  };

  const removeFromClothingArray = (field: 'colors' | 'accessories', index: number) => {
    setFormData(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        clothing: {
          ...prev.appearance.clothing,
          [field]: prev.appearance.clothing[field].filter((_: string, i: number) => i !== index),
        },
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const token = await getToken();
    if (!token) {
      setIsSaving(false);
      return;
    }

    try {
      await createCharacter(formData, token);
      router.push('/dashboard/manage-characters');
    } catch (error) {
      console.error('Error creating character:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href='/dashboard/manage-characters'
            className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4'
          >
            <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back to Characters
          </Link>
          <h1 className='text-3xl font-bold text-gray-900'>Create New Character</h1>
          <p className='text-gray-600 mt-2'>Bring your character to life with detailed information</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Basic Information */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <button
              type='button'
              onClick={() => toggleSection('basic')}
              className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-xl font-semibold text-gray-900'>Basic Information</h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openSections.basic ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections.basic ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Select Book <span className='text-red-500'>*</span>
                    </label>
                    <select
                      required
                      value={formData.bookId}
                      onChange={e => handleInputChange('bookId', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                    >
                      <option value=''>Choose a book for this character...</option>
                      <option value='none'>None (Character not yet assigned to a book)</option>
                      {availableBooks.map(book => (
                        <option key={book.bookId} value={book.bookId}>
                          {book.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Character Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Aria Nightwhisper'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Nicknames</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={nicknameInput}
                        onChange={e => setNicknameInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addToArray('nicknames', nicknameInput);
                            setNicknameInput('');
                          }
                        }}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                        placeholder='e.g., The Shadow Weaver'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          addToArray('nicknames', nicknameInput);
                          setNicknameInput('');
                        }}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.nicknames.map((nickname, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                        >
                          {nickname}
                          <button
                            type='button'
                            onClick={() => removeFromArray('nicknames', index)}
                            className='ml-2 text-blue-600 hover:text-blue-800'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Age</label>
                    <input
                      type='number'
                      min='0'
                      value={formData.age}
                      onChange={e => handleInputChange('age', parseInt(e.target.value))}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
                    <select
                      value={formData.gender}
                      onChange={e => handleInputChange('gender', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Race/Species</label>
                    <input
                      type='text'
                      value={formData.raceOrSpecies}
                      onChange={e => handleInputChange('raceOrSpecies', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Elf, Human, Dragon'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
                    <select
                      value={formData.role}
                      onChange={e => handleInputChange('role', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                    >
                      <option value='protagonist'>Protagonist</option>
                      <option value='antagonist'>Antagonist</option>
                      <option value='side_character'>Side Character</option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Faction/Group</label>
                    <input
                      type='text'
                      value={formData.faction}
                      onChange={e => handleInputChange('faction', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Twilight Council, City Guard'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <button
              type='button'
              onClick={() => toggleSection('personality')}
              className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-xl font-semibold text-gray-900'>Personality</h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openSections.personality ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections.personality ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-6'>
                <div className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Personality Traits</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={traitInput}
                        onChange={e => setTraitInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addToArray('personalityTraits', traitInput);
                            setTraitInput('');
                          }
                        }}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                        placeholder='e.g., Brave, Cunning, Loyal'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          addToArray('personalityTraits', traitInput);
                          setTraitInput('');
                        }}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.personalityTraits.map((trait, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'
                        >
                          {trait}
                          <button
                            type='button'
                            onClick={() => removeFromArray('personalityTraits', index)}
                            className='ml-2 text-purple-600 hover:text-purple-800'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Speech Patterns</label>
                    <textarea
                      value={formData.speechPatterns}
                      onChange={e => handleInputChange('speechPatterns', e.target.value)}
                      rows={3}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='Describe how this character speaks (e.g., formal, uses metaphors, stutters)'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <button
              type='button'
              onClick={() => toggleSection('appearance')}
              className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-xl font-semibold text-gray-900'>Appearance</h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openSections.appearance ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections.appearance ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-6'>
                <div className='space-y-6'>
                  {/* Image Upload Section */}
                  <div className='flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                    {imagePreview ? (
                      <div className='relative w-48 h-48'>
                        <Image
                          src={imagePreview}
                          alt='Character preview'
                          fill
                          className='object-cover rounded-lg shadow-md'
                        />
                        <button
                          type='button'
                          onClick={removeImage}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-10'
                          title='Remove image'
                        >
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className='cursor-pointer flex flex-col items-center'>
                        <svg
                          className='w-12 h-12 text-gray-400 mb-3'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-sm text-gray-600 mb-1'>Click to upload character image</span>
                        <span className='text-xs text-gray-500'>(Optional - Max 5MB)</span>
                        <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
                      </label>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Height</label>
                    <input
                      type='text'
                      value={formData.appearance.height}
                      onChange={e => handleAppearanceChange('height', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., 5&apos;9"'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Build</label>
                    <input
                      type='text'
                      value={formData.appearance.build}
                      onChange={e => handleAppearanceChange('build', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Athletic, Slender, Muscular'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Eye Color</label>
                    <input
                      type='text'
                      value={formData.appearance.eyeColor}
                      onChange={e => handleAppearanceChange('eyeColor', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Emerald green'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Hair Color</label>
                    <input
                      type='text'
                      value={formData.appearance.hairColor}
                      onChange={e => handleAppearanceChange('hairColor', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Raven black'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Hair Style</label>
                    <input
                      type='text'
                      value={formData.appearance.hairStyle}
                      onChange={e => handleAppearanceChange('hairStyle', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Long and flowing, Short and spiky'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Skin Tone</label>
                    <input
                      type='text'
                      value={formData.appearance.skinTone}
                      onChange={e => handleAppearanceChange('skinTone', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Pale, Tan, Dark'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Distinguishing Features</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={featureInput}
                        onChange={e => setFeatureInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addToAppearanceArray('distinguishingFeatures', featureInput);
                            setFeatureInput('');
                          }
                        }}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                        placeholder='e.g., Scar across left eye, Tattoo on neck'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          addToAppearanceArray('distinguishingFeatures', featureInput);
                          setFeatureInput('');
                        }}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.appearance.distinguishingFeatures.map((feature, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'
                        >
                          {feature}
                          <button
                            type='button'
                            onClick={() => removeFromAppearanceArray('distinguishingFeatures', index)}
                            className='ml-2 text-green-600 hover:text-green-800'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clothing */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <button
              type='button'
              onClick={() => toggleSection('clothing')}
              className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-xl font-semibold text-gray-900'>Clothing & Accessories</h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openSections.clothing ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections.clothing ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-6'>
                <div className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Clothing Style</label>
                    <input
                      type='text'
                      value={formData.appearance.clothing.style}
                      onChange={e => handleClothingChange('style', e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='e.g., Elegant robes, Battle armor, Casual tunic'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Colors</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={colorInput}
                        onChange={e => setColorInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addToClothingArray('colors', colorInput);
                            setColorInput('');
                          }
                        }}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                        placeholder='e.g., Deep purple, Silver'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          addToClothingArray('colors', colorInput);
                          setColorInput('');
                        }}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.appearance.clothing.colors.map((color, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm'
                        >
                          {color}
                          <button
                            type='button'
                            onClick={() => removeFromClothingArray('colors', index)}
                            className='ml-2 text-indigo-600 hover:text-indigo-800'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Accessories</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={accessoryInput}
                        onChange={e => setAccessoryInput(e.target.value)}
                        onKeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addToClothingArray('accessories', accessoryInput);
                            setAccessoryInput('');
                          }
                        }}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                        placeholder='e.g., Moonstone pendant, Leather gloves'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          addToClothingArray('accessories', accessoryInput);
                          setAccessoryInput('');
                        }}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        Add
                      </button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.appearance.clothing.accessories.map((accessory, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm'
                        >
                          {accessory}
                          <button
                            type='button'
                            onClick={() => removeFromClothingArray('accessories', index)}
                            className='ml-2 text-yellow-600 hover:text-yellow-800'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <button
              type='button'
              onClick={() => toggleSection('background')}
              className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-xl font-semibold text-gray-900'>Background</h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openSections.background ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections.background ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-6'>
                <div className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Backstory</label>
                    <textarea
                      value={formData.backstory}
                      onChange={e => handleInputChange('backstory', e.target.value)}
                      rows={6}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder="Describe your character's history, origin, and significant events that shaped them..."
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>General Notes</label>
                    <textarea
                      value={formData.generalNotes}
                      onChange={e => handleInputChange('generalNotes', e.target.value)}
                      rows={4}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500'
                      placeholder='Any additional notes, motivations, relationships, or important details...'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className='flex items-center justify-end gap-4 pb-8'>
            <Link
              href='/dashboard/manage-characters'
              className='px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </Link>
            <button
              type='submit'
              disabled={isSaving}
              className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isSaving ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Create Character
                </>
              )}
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

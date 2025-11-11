'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Appearance = {
  height: string;
  build: string;
  eyeColor: string;
  hairColor: string;
  hairStyle: string;
  skinTone: string;
  distinguishingFeatures: string[];
  clothing: {
    style: string;
    colors: string[];
    accessories: string[];
  };
};

type Character = {
  characterId: string;
  name: string;
  image?: string;
  nicknames?: string[];
  bookId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  raceOrSpecies?: string;
  role: 'protagonist' | 'antagonist' | 'side_character' | 'mentor' | 'companion';
  faction: string;
  personalityTraits: string[];
  speechPatterns: string;
  appearance: Appearance;
  backstory: string;
  generalNotes: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ManageCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.action-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    // Simulate API call
    const fetchCharacters = async () => {
      try {
        // Simulated API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const fakeData: Character[] = [
          {
            characterId: 'c1',
            name: 'Aria Nightwhisper',
            nicknames: ['The Shadow Weaver', 'Lady of Whispers'],
            bookId: 'b1',
            age: 24,
            gender: 'female',
            raceOrSpecies: 'Elf',
            role: 'protagonist',
            faction: 'Twilight Council',
            personalityTraits: ['Mysterious', 'Determined', 'Compassionate', 'Strategic'],
            speechPatterns: 'Speaks in measured, poetic tones with frequent nature metaphors',
            appearance: {
              height: '5\'9"',
              build: 'Lithe and graceful',
              eyeColor: 'Violet',
              hairColor: 'Silver',
              hairStyle: 'Long, flowing with intricate braids',
              skinTone: 'Pale with a slight silvery sheen',
              distinguishingFeatures: ['Glowing runes on forearms', 'Star-shaped birthmark'],
              clothing: {
                style: 'Elegant shadowweave robes',
                colors: ['Deep purple', 'Silver', 'Midnight blue'],
                accessories: ['Moonstone pendant', 'Silver circlet', 'Enchanted rings'],
              },
            },
            backstory: 'Born during a lunar eclipse to the High Priestess of the Twilight Council...',
            generalNotes: 'Aria possesses rare shadow-weaving abilities, making her crucial in the coming conflict...',
            createdAt: new Date('2025-10-15'),
            updatedAt: new Date('2025-11-01'),
          },
          {
            characterId: 'c2',
            name: 'Marcus Ironclad',
            nicknames: ['The Unbreakable', 'Shield of the People'],
            bookId: 'b1',
            age: 35,
            gender: 'male',
            raceOrSpecies: 'Human',
            role: 'companion',
            faction: 'City Guard',
            personalityTraits: ['Loyal', 'Protective', 'Honorable', 'Stubborn'],
            speechPatterns: 'Direct and formal speech, often using military terminology',
            appearance: {
              height: '6\'2"',
              build: 'Muscular and battle-hardened',
              eyeColor: 'Steel gray',
              hairColor: 'Dark brown with gray streaks',
              hairStyle: 'Short military cut',
              skinTone: 'Tanned and weathered',
              distinguishingFeatures: ['Scar across right eye', 'Enchanted metal arm'],
              clothing: {
                style: "Modified guard captain's uniform",
                colors: ['Navy blue', 'Silver', 'Gold trim'],
                accessories: ['Badge of office', 'Enchanted shield', 'Family signet ring'],
              },
            },
            backstory: 'Former captain of the city guard who lost his arm defending the city from a demon invasion...',
            generalNotes: 'Despite his gruff exterior, Marcus has a soft spot for helping street orphans...',
            createdAt: new Date('2025-10-20'),
            updatedAt: new Date('2025-11-03'),
          },
          {
            characterId: 'c3',
            name: 'Dr. Nova Voidweaver',
            nicknames: ['The Mad Oracle', 'Keeper of Chaos'],
            bookId: 'b1',
            age: 45,
            gender: 'female',
            raceOrSpecies: 'Human-Void Hybrid',
            role: 'antagonist',
            faction: 'Void Seekers',
            personalityTraits: ['Brilliant', 'Obsessive', 'Unpredictable', 'Visionary'],
            speechPatterns: 'Rapid-fire speech pattern with frequent scientific jargon and void-related metaphors',
            appearance: {
              height: '5\'7"',
              build: 'Wiry and energetic',
              eyeColor: 'Black with swirling void energy',
              hairColor: 'White with streaks of shifting void-black',
              hairStyle: 'Wild and gravity-defying',
              skinTone: 'Pale with shifting void patterns',
              distinguishingFeatures: ['Void energy crackling around hands', 'Floating research implements'],
              clothing: {
                style: 'Modified research robes with tech augments',
                colors: ['Deep black', 'Electric blue', 'Void purple'],
                accessories: ['Void-powered monocle', 'Multiple floating screens', 'Reality-anchor pendant'],
              },
            },
            backstory: 'A brilliant scientist whose experiments with void energy led to a transformation...',
            generalNotes: 'Her pursuit of void knowledge threatens to unravel reality itself...',
            createdAt: new Date('2025-10-25'),
            updatedAt: new Date('2025-11-05'),
          },
        ];

        setCharacters(fakeData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-12rem)]'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-gray-600 font-medium'>Waking your characters...</p>
        </div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm mx-6 my-6'>
        <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
          <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>No Characters Yet</h2>
        <p className='text-gray-600 text-center mb-8 max-w-md'>
          You haven&apos;t created any characters yet. Create your first character to begin your storytelling journey!
        </p>
        <Link
          href='/dashboard/create-character'
          className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          Create Your First Character
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>Your Characters</h1>
        <Link
          href='/dashboard/manage-characters/create'
          className='inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm'
        >
          <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          New Character
        </Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {characters.map(character => (
          <div
            key={character.characterId}
            className='group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden hover:border-blue-200 hover:-translate-y-1'
          >
            {/* Clickable Link Wrapper */}
            <Link href={`/dashboard/characters/${character.characterId}`} className='block'>
              {/* Character Header */}
              <div className='relative h-48'>
                <div
                  className={`absolute inset-0 transition-colors duration-200 ${
                    character.role === 'protagonist'
                      ? 'bg-blue-600 group-hover:bg-blue-700'
                      : character.role === 'antagonist'
                      ? 'bg-red-600 group-hover:bg-red-700'
                      : character.role === 'mentor'
                      ? 'bg-purple-600 group-hover:bg-purple-700'
                      : character.role === 'companion'
                      ? 'bg-green-600 group-hover:bg-green-700'
                      : 'bg-gray-600 group-hover:bg-gray-700'
                  }`}
                >
                  {/* Decorative Pattern */}
                  <div className='absolute inset-0 opacity-10'>
                    <svg className='w-full h-full' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'>
                      <pattern id='grid' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
                        <path d='M 20 0 L 0 0 0 20' fill='none' stroke='currentColor' strokeWidth='1' />
                      </pattern>
                      <rect x='0' y='0' width='100%' height='100%' fill='url(#grid)' />
                    </svg>
                  </div>

                  {/* Character Initial */}
                  <div className='absolute inset-0 flex items-center justify-center text-white/20 font-bold text-7xl'>
                    {character.name.charAt(0)}
                  </div>
                </div>

                {character.image && (
                  <Image
                    src={character.image}
                    alt={character.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-xl'
                  />
                )}

                {/* Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                {/* Character Info */}
                <div className='absolute bottom-0 left-0 p-4 text-white'>
                  <h3 className='font-bold text-xl mb-1'>{character.name}</h3>
                  <div className='flex items-center flex-wrap gap-2 text-sm'>
                    <span className='px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm'>
                      {character.role.replace('_', ' ')}
                    </span>
                    {character.nicknames && character.nicknames.length > 0 && (
                      <span className='px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm'>
                        {character.nicknames[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Menu Button - Outside Link to prevent event bubbling */}
                <div className='absolute top-4 right-4 z-10 action-menu'>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === character.characterId ? null : character.characterId);
                    }}
                    className='text-white hover:text-gray-200 bg-black/30 hover:bg-black/40 rounded-full p-1.5 backdrop-blur-sm transition-colors'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                      />
                    </svg>
                  </button>

                  {/* Action Menu Dropdown */}
                  {openMenuId === character.characterId && (
                    <div
                      className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 flex-col py-1'
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                        onClick={e => {
                          e.preventDefault();
                          // TODO: Implement star functionality
                          setOpenMenuId(null);
                        }}
                      >
                        <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                          />
                        </svg>
                        Star Character
                      </button>
                      <button
                        className='flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left'
                        onClick={e => {
                          e.preventDefault();
                          // TODO: Implement delete functionality
                          setOpenMenuId(null);
                        }}
                      >
                        <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Delete Character
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Link>

            {/* Character Details */}
            <div className='p-6'>
              <div className='flex flex-wrap gap-2 mb-4'>
                <span className='px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm'>{character.faction}</span>
                <span className='px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm'>
                  {character.raceOrSpecies}
                </span>
                <span className='px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm'>Age {character.age}</span>
              </div>

              <div className='relative'>
                <div className='space-y-4 h-[280px] overflow-hidden'>
                  {/* Personality */}
                  <div>
                    <h4 className='text-sm font-semibold text-gray-500 mb-2'>Personality</h4>
                    <div className='flex flex-wrap gap-2'>
                      {character.personalityTraits.map((trait, index) => (
                        <span key={index} className='px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm'>
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Speech Pattern */}
                  <div>
                    <h4 className='text-sm font-semibold text-gray-500 mb-2'>Speech Pattern</h4>
                    <p className='text-sm text-gray-600'>{character.speechPatterns}</p>
                  </div>

                  {/* Quick Appearance */}
                  <div>
                    <h4 className='text-sm font-semibold text-gray-500 mb-2'>Appearance</h4>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p>
                        {character.appearance.build} • {character.appearance.height}
                      </p>
                      <p>
                        {character.appearance.hairStyle} {character.appearance.hairColor} hair
                      </p>
                      <p>
                        {character.appearance.eyeColor} eyes • {character.appearance.skinTone}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Gradient Overlay */}
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
              </div>

              {/* Footer */}
              <div className='mt-4 pt-4 border-t border-gray-100'>
                <span className='text-xs text-gray-500'>
                  Updated {new Date(character.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

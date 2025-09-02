'use client';
import { updateUser } from '../../../lib/api';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';

type EditProfileFormTypes = {
  username: string;
  userDescription: string;
  currentBgImg: string;
  currentProfileImg: string;
};

const EditProfileForm = ({ username, userDescription, currentBgImg, currentProfileImg }: EditProfileFormTypes) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [usernameInput, setUsernameInput] = useState(username);
  const [description, setDescription] = useState(userDescription);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

  const successMessage = 'Profile updated successfully!';

  const { getToken } = useAuth();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackgroundImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setBackgroundPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Check if username contains spaces
    if (usernameInput.includes(' ')) {
      setMessage('Username cannot contain spaces.');
      setLoading(false);
      return;
    }

    // Check if username contains special characters (only allow letters, numbers, underscores, and hyphens)
    const specialCharRegex = /[^a-zA-Z0-9_-]/;
    if (specialCharRegex.test(usernameInput)) {
      setMessage('Username cannot contain special characters.');
      setLoading(false);
      return;
    }

    const token = await getToken();

    if (!token) {
      setMessage('Authentication error. Please log in again.');
      setLoading(false);
      return;
    }

    const updatedUserPayload = {
      username: usernameInput,
      userBackgroundImgFile: backgroundImageFile,
      userProfileImgFile: profileImageFile,
      description: description,
    };

    try {
      const res = await updateUser(updatedUserPayload, token);
      if (res.ok) {
        setMessage(successMessage);
        setTimeout(() => {
          setMessage('');
          window.location.reload();
        }, 1500);
      } else {
        setMessage('Profile failed to update. Please try again.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('An error occured. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className='max-w-xl mx-auto p-6 bg-white rounded shadow-md'
      aria-label='Edit Profile Form'
      onSubmit={handleSubmit}
    >
      <h1 className='text-2xl font-bold mb-6 text-center'>Edit Profile</h1>
      <div className='mb-5'>
        <label htmlFor='username' className='block mb-1 font-semibold text-gray-700'>
          Username
        </label>
        <input
          id='username'
          name='username'
          type='text'
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
          required
        />
      </div>

      <div className='mb-5'>
        <label htmlFor='profilePicture' className='block mb-1 font-semibold text-gray-700'>
          Profile Picture
        </label>
        <div className='flex flex-col items-center justify-center'>
          <input
            id='profileImg'
            type='file'
            name='profileImg'
            accept='image/*'
            onChange={handleProfileImageChange}
            className='block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
          />
        </div>
        <div className='w-[160px] h-[160px] mx-auto mt-4 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center'>
          <Image
            src={profilePreview || currentProfileImg}
            width={160}
            height={160}
            alt="user's current profile picture"
            className='object-cover w-full h-full'
          />
        </div>
      </div>

      <div className='mb-5'>
        <label htmlFor='backgroundImage' className='block mb-1 font-semibold text-gray-700'>
          Background Image
        </label>
        <div className='flex flex-col items-center justify-center'>
          <input
            id='bgImgFile'
            type='file'
            name='bgImgFile'
            accept='image/*'
            onChange={handleBackgroundImageChange}
            className='block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
          />
        </div>
        <div>
          <Image
            src={backgroundPreview || currentBgImg}
            width={1200}
            height={192}
            alt="user's current background image"
            className='h-90 object-cover object-center mt-4'
          />
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='block mb-1 font-semibold text-gray-700'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
          placeholder='Tell us about yourself...'
          className='w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
        />
      </div>

      <button
        type='submit'
        className='w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors flex items-center justify-center'
        disabled={loading}
      >
        {loading ? (
          <span className='flex items-center gap-2'>
            <svg
              className='animate-spin h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
            </svg>
            Saving...
          </span>
        ) : (
          'Save Changes'
        )}
      </button>
      {message && (
        <div
          className={`mt-4 text-center ${message == successMessage ? 'text-green-700' : 'text-red-700'} font-semibold`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default EditProfileForm;

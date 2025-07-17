import { timelineCardFormType } from '@/utils/types';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
const baseUrl = 'http://localhost:8000';

type userType = {
  user_id: string;
  username: string | null;
  email: string;
  description: string | null;
  profile_background_img_url: string | null;
  user_profile_url: string | null;
  role: 'user' | 'admin';
};

type updateUserType = {
  username: string;
  profile_background_img_url: string | null;
  user_profile_url: string | null;
  description: string | null;
};

export const fetchUserData = async (username: string, init?: RequestInit) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/${username}`, init);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};

const token = process.env.CLERK_SECRET_KEY;

export const createUser = async (user: userType) => {
  const res = await fetch(`${baseUrl}/api/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.status;
};

export const updateUser = async (user: updateUserType, token: string) => {
  const res = await fetch(`${baseUrl}/api/users/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }

  return res;
};

export const deleteUser = async (userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/users/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete user');
  }

  return res.status;
};

export const uploadUserImages = async (bgImgFile: File, userProfileImgFile: File, token: string) => {
  const formData = new FormData();

  formData.append('bg_img_file', bgImgFile);
  formData.append('user_profile_img_file', userProfileImgFile);

  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  if (bucket) {
    formData.append('bucket', bucket);
  }

  const res = await fetch(`${baseUrl}/api/users/upload-imgs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload file');
  }
  return res;
};

export const fetchUserProfileImg = async (username: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/users/${username}/profile-img`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to retrieve user profile img');
  }

  return res;
};

export const createStory = async (formData: FormData, userId: string, token: string) => {
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error('AWS S3 bucket name is not configured');
  }
  formData.append('bucket', bucket);

  const res = await fetch(`${baseUrl}/api/books/${userId}/create-story`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok && res.status !== 409) {
    throw new Error('Failed to create a new story');
  }

  return res;
};

export const getNewChapterNum = async (bookId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/books/${bookId}/get-new-chapter-number`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to create chapter');
  }

  return res;
};

export const createChapter = async (
  chapterContent: object,
  chapterName: string,
  chapterNumber: string,
  bookId: string,
  token: string
) => {
  const formData = new FormData();
  formData.append('chapter_name', chapterName);
  formData.append('chapter_content', JSON.stringify(chapterContent));

  const res = await fetch(`${baseUrl}/api/books/${bookId}/create-chapter/${chapterNumber}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to create chapter');
  }

  return res;
};

export const fetchStories = async (userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/books/${userId}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user stories');
  }

  return res;
};

export const fetchBookData = async (bookId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch book data');
  }

  return res;
};

export const fetchBookChapters = async (bookId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/books/get-chapters/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch book');
  }

  return res;
};

export const fetchOneChapter = async (bookId: string, chapterNumber: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/books/${bookId}/chapter/${chapterNumber}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch book');
  }

  return res;
};

export const fetchNumOfStories = async (userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}/num-of-books`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }

  return res;
};

export const fetchTimelineCards = async (bookId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/timeline/${bookId}/get-timeline-cards`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch timeline cards');
  }

  return res;
};

export const createTimelineCard = async (formData: timelineCardFormType, token: string) => {
  const res = await fetch(`${baseUrl}/api/timeline/${formData.bookId}/create-timeline-card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  return res;
};

export const fetchLatestTimelineIndex = async (bookId: string, token: string) => {
  const res = await fetch(`${baseUrl}/api/timeline/${bookId}/latest-timeline-index`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch latest timeline index');
  }

  return res;
};

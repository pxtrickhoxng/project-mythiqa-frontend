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

  const res = await fetch(`${baseUrl}/api/upload`, {
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

  const res = await fetch(`${baseUrl}/api/${userId}/create-story`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  // Don't throw error for 409 (Conflict) - let the component handle it
  if (!res.ok && res.status !== 409) {
    throw new Error('Failed to create a new story');
  }

  return res;
};

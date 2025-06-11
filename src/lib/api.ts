import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const baseUrl = 'http://localhost:8000';

export const fetchUserData = async (userId: string, init?: RequestInit) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}`, init);
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

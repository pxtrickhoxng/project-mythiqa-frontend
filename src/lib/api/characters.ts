import { CreateCharacterForm } from '@/utils/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CHARACTERS_API = `${BASE_URL}/api/characters`;

export const createCharacter = async (chapter: CreateCharacterForm, token: string) => {
  const res = await fetch(`${CHARACTERS_API}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapter),
  });

  if (!res.ok) {
    throw new Error('Failed to create character');
  }

  return res;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CHAPTERS_API = `${BASE_URL}/api/chapters`;

type NewChapterNumType = {
  chapterNumber: number;
};

type CreateChapterType = {
  chapterContent: object;
  chapterName: string;
  chapterNumber: number;
  bookId: string;
};

// Add these new types for fetchOneChapter
type CurrentChapter = {
  chapterId: string;
  chapterNumber: string;
  chapterContent: string;
  chapterName: string;
  createdAt: string;
};

type NavigationChapter = {
  chapterId: string;
  chapterName: string;
  chapterNumber: number;
};

export type FetchOneChapterResponse = {
  currentChapter: CurrentChapter;
  prevChapter: NavigationChapter | null;
  nextChapter: NavigationChapter | null;
};

export const getNewChapterNum = async (bookId: string): Promise<NewChapterNumType> => {
  const res = await fetch(`${CHAPTERS_API}/${bookId}/new-chapter-num`);

  if (!res.ok) {
    throw new Error('Failed to fetch new chapter number');
  }

  return res.json();
};

export const fetchChapters = async (bookId: string) => {
  const res = await fetch(`${CHAPTERS_API}/${bookId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch chapters');
  }

  return res;
};

export const fetchOneChapter = async (bookId: string, chapterId: string): Promise<FetchOneChapterResponse> => {
  const res = await fetch(`${CHAPTERS_API}/read/${bookId}/${chapterId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch chapter view');
  }
  return res.json();
};

export const createChapter = async (chapter: CreateChapterType, token: string) => {
  const res = await fetch(`${CHAPTERS_API}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapter),
  });

  if (!res.ok) {
    throw new Error('Failed to create chapter');
  }

  return res;
};

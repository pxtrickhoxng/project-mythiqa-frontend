const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CHAPTERS_API = `${BASE_URL}/api/chapters`;

type NewChapterNumType = {
  chapterNumber: number;
};

type Chapter = {
  chapterId: string;
  chapterName: string;
  chapterNumber: string;
  createdAt: string;
};

type CreateChapterType = {
  chapterContent: object;
  chapterName: string;
  chapterNumber: number;
  bookId: string;
};

export const getNewChapterNum = async (bookId: string): Promise<NewChapterNumType> => {
  const res = await fetch(`${CHAPTERS_API}/${bookId}/new-chapter-num`);

  if (!res.ok) {
    throw new Error('Failed to fetch new chapter number');
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

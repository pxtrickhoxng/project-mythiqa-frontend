const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BOOKS_API = `${BASE_URL}/api/books`;

type BookType = {
  bookId: number;
  userId: string;
  bookName: string;
  bookType: string;
  description?: string;
  genre: string;
  targetAudience?: string;
  contentWarnings?: string;
  bookCoverUrl?: string;
  createdAt: string;
};


export const createStory = async (
  formData: FormData,
  token: string
) => {
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error("AWS S3 bucket name is not configured");
  }
  formData.append("bucket", bucket);

  const res = await fetch(`${BOOKS_API}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok && res.status !== 409) {
    throw new Error("Failed to create a new story");
  }

  return res;
};

export const fetchStories = async (userId: string): Promise<BookType[]> => {
  const res = await fetch(`${BOOKS_API}/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user stories");
  }

  return res.json();
};

export const fetchBookData = async (bookId: string, token: string) => {
  const res = await fetch(`${BOOKS_API}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book data");
  }

  return res;
};

export const fetchBookChapters = async (bookId: string, token: string) => {
  const res = await fetch(`${BOOKS_API}/get-chapters/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  return res;
};

export const fetchOneChapter = async (
  bookId: string,
  chapterNumber: string,
  token: string
) => {
  const res = await fetch(`${BOOKS_API}/${bookId}/chapter/${chapterNumber}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  return res;
};

export const fetchBookCover = async (bookId: string, token: string) => {
  const res = await fetch(`${BOOKS_API}/${bookId}/cover`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  return res;
};

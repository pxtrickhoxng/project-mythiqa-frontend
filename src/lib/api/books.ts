const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BOOKS_API = `${BASE_URL}/api/books`;

export const createStory = async (
  formData: FormData,
  userId: string,
  token: string
) => {
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  if (!bucket) {
    throw new Error("AWS S3 bucket name is not configured");
  }
  formData.append("bucket", bucket);

  const res = await fetch(`${BOOKS_API}/${userId}/create-story`, {
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

export const getNewChapterNum = async (bookId: string, token: string) => {
  const res = await fetch(`${BOOKS_API}/${bookId}/get-new-chapter-number`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create chapter");
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
  formData.append("chapter_name", chapterName);
  formData.append("chapter_content", JSON.stringify(chapterContent));

  const res = await fetch(
    `${BOOKS_API}/${bookId}/create-chapter/${chapterNumber}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create chapter");
  }

  return res;
};

export const fetchStories = async (userId: string, token: string) => {
  const res = await fetch(`${BOOKS_API}/${userId}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user stories");
  }

  return res;
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

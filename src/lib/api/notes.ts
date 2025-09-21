const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const NOTES_API = `${BASE_URL}/api/notes`;

type CreateNoteType = {
  title: string;
  noteContent: string;
  tags: string[];
  favorited: boolean;
  checked: boolean;
  images: File[];
  bookId: string;
};

export const createNote = async (note: CreateNoteType, token: string) => {
  const formData = new FormData();

  if (note.title) {
    formData.append('title', note.title);
  }

  if (note.noteContent) {
    formData.append('noteContent', note.noteContent);
  }

  if (note.tags && note.tags.length > 0) {
    formData.append('tags', JSON.stringify(note.tags));
  }

  if (note.favorited !== undefined) {
    formData.append('favorited', note.favorited.toString());
  }

  if (note.checked !== undefined) {
    formData.append('checked', note.checked.toString());
  }

  if (note.images && note.images.length > 0) {
    note.images.forEach(image => {
      formData.append(`images`, image);
    });
  }

  if (note.bookId) {
    formData.append('bookId', note.bookId);
  }

  const res = await fetch(`${NOTES_API}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch timeline cards');
  }

  return res;
};

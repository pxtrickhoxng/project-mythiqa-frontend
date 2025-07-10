export type Book = {
  book_id: number;
  user_id: string;
  book_name: string;
  book_type?: string;
  description?: string;
  genre?: string;
  target_audience?: string;
  content_warnings?: string[];
  book_cover_url?: string;
  created_at: string;
};

export type Chapter = {
  chapter_id: string;
  chapter_name: string;
  chapter_number: string;
  creation_date: string;
};

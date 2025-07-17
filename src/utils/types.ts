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

// Types for new timeline card

export type detailsType = {
  detailTitle: string;
  detailContent: string;
  detailColor: string;
};

export type eventsType = {
  eventText: string;
  eventTextColor: string;
  eventBgColor: string;
};

export type timelineCardFormType = {
  bookId: string;
  index: number;
  userId: string;
  eventTag: eventsType;
  cardTitle: string;
  cardColor: string;
  chapter: string;
  details: detailsType[];
};

// type for timeline card data as returned from the backend API (snake_case)
export type timelineCardType = {
  book_id: string;
  index: number;
  user_id: string;
  event_tag: eventsType;
  card_title: string;
  card_color: string;
  chapter: string;
  details: detailsType[];
};

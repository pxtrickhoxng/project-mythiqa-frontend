export type Book = {
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

export type Chapter = {
  chapterId: string;
  chapterName: string;
  chapterNumber: string;
  createdAt: string;
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

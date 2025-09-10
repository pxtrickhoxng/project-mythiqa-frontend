import { timelineCardFormType } from "@/utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TIMELINE_API = `${BASE_URL}/api/timeline`;

export const fetchTimelineCards = async (bookId: string, token: string) => {
  const res = await fetch(`${TIMELINE_API}/${bookId}/get-timeline-cards`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch timeline cards");
  }

  return res;
};

export const createTimelineCard = async (
  formData: timelineCardFormType,
  token: string
) => {
  const res = await fetch(
    `${TIMELINE_API}/${formData.bookId}/create-timeline-card`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  return res;
};

export const updateTimelineCard = async (
  formData: timelineCardFormType,
  token: string
) => {
  const res = await fetch(
    `${TIMELINE_API}/${formData.bookId}/update-timeline-card/${formData.index}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  return res;
};

export const deleteTimelineCard = async (
  bookId: string,
  index: number,
  token: string
) => {
  const res = await fetch(
    `${TIMELINE_API}/${bookId}/delete-timeline-card/${index}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const fetchLatestTimelineIndex = async (
  bookId: string,
  token: string
) => {
  const res = await fetch(`${TIMELINE_API}/${bookId}/latest-timeline-index`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch latest timeline index");
  }

  return res;
};

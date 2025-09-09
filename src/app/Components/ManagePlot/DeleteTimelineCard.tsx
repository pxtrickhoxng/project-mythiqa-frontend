"use client";
import { useRouter } from "next/navigation";
import { deleteTimelineCard } from "@/lib/api/timeline";
import { useAuth } from "@clerk/nextjs";

type DeleteCardProps = {
  bookId: string;
  index: number;
};

const DeleteTimelineCard = ({ bookId, index }: DeleteCardProps) => {
  const router = useRouter();
  const { getToken } = useAuth();

  const deleteCard = async () => {
    const token = await getToken();

    if (!token) {
      console.error("Failed to delete timeline card");
      return;
    }

    const res = await deleteTimelineCard(bookId, index, token);
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <button className="text-red-600 hover:text-red-800" onClick={deleteCard}>
      Delete
    </button>
  );
};

export default DeleteTimelineCard;

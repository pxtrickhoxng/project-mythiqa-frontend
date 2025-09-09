"use client";

import { createTimelineCard } from "@/lib/api/timeline";
import { useState, useRef, useEffect } from "react";
import { timelineCardFormType, detailsType, eventsType } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Success from "./Success";
import PromptToAddEvent from "./PromptToAddEvent";

type PropTypes = {
  bookId: string;
  userId: string;
  latestIndex: number;
};

export default function AddTimelineCard({
  bookId,
  userId,
  latestIndex,
}: PropTypes) {
  const { getToken } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [hasFailed, setHasFailed] = useState(false);

  // states for the form
  const emptyEvent = {
    eventText: "",
    eventTextColor: "#000000",
    eventBgColor: "#ffffff",
  };
  const [eventTag, setEventTag] = useState<eventsType>(emptyEvent);

  const [cardTitle, setCardTitle] = useState("");
  const [cardColor, setCardColor] = useState("#3b82f6");
  const [chapter, setChapter] = useState("");

  const emptyDetail = {
    detailTitle: "",
    detailContent: "",
    detailColor: "#6b7280",
  };
  const [details, setDetails] = useState<detailsType[]>([emptyDetail]);

  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getToken();
      if (!token) {
        setHasFailed(true);
        return;
      }

      const formPayload: timelineCardFormType = {
        bookId: bookId,
        index: latestIndex,
        userId: userId,
        eventTag: eventTag,
        cardTitle: cardTitle,
        cardColor: cardColor,
        chapter: chapter,
        details: details,
      };

      const res = await createTimelineCard(formPayload, token);
      if (res.ok) {
        setShowSuccessNotification(true);
        // Reset form
        setCardTitle("");
        setChapter("");
        setEventTag(emptyEvent);
        setDetails([emptyDetail]);
        setIsOpen(false);
        router.refresh();
      } else {
        setHasFailed(true);
        setTimeout(() => {
          setHasFailed(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error creating timeline card:", error);
      setHasFailed(true);
      setTimeout(() => {
        setHasFailed(false);
      }, 5000);
    }
  };

  const addDetailBlock = () => {
    setDetails((prevDetails) => [...prevDetails, emptyDetail]);
  };

  const removeDetailBlock = (index: number) => {
    setDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
  };

  return (
    <div>
      {isOpen ? (
        <div className="relative flex items-start ml-16">
          <input
            ref={colorInputRef}
            name="cardColor"
            onChange={(e) => setCardColor(e.target.value)}
            type="color"
            className="hidden"
            value={cardColor}
          />
          <div
            onClick={() => colorInputRef.current?.click()}
            className={`absolute -left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg`}
            style={{ backgroundColor: cardColor }}
          ></div>

          <div
            className="bg-white rounded-lg shadow-md p-6 w-full border-l-4 relative"
            style={{ borderLeftColor: cardColor }}
          >
            <div
              className="absolute left-0 top-0 w-1 h-full cursor-pointer hover:w-2 transition-all duration-200"
              onClick={() => colorInputRef.current?.click()}
              title="Click to change card color"
            ></div>

            <form onSubmit={handleSubmit}>
              {hasFailed && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-red-700 font-medium">
                      Failed to save timeline event. Please try again.
                    </p>
                    <button
                      type="button"
                      onClick={() => setHasFailed(false)}
                      className="ml-auto text-red-400 hover:text-red-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded">
                      #{latestIndex}
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        onChange={(e) =>
                          setEventTag((prevEvent) => ({
                            ...prevEvent,
                            eventText: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Event Tag"
                        value={eventTag.eventText}
                        className="px-3 py-1 bg-blue-100 text-xs font-semibold rounded-md border outline-none border-gray-400 placeholder-gray-400 min-w-[80px] text-center"
                        style={{
                          color: eventTag.eventTextColor,
                          backgroundColor: eventTag.eventBgColor,
                        }}
                      />
                      <input
                        className="w-8 h-8 cursor-pointer"
                        onChange={(e) =>
                          setEventTag((prevEvent) => ({
                            ...prevEvent,
                            eventTextColor: e.target.value,
                          }))
                        }
                        type="color"
                        value={eventTag.eventTextColor}
                      />
                      <input
                        className="w-8 h-8 cursor-pointer"
                        onChange={(e) =>
                          setEventTag((prevEvent) => ({
                            ...prevEvent,
                            eventBgColor: e.target.value,
                          }))
                        }
                        type="color"
                        value={eventTag.eventBgColor}
                      />
                    </div>
                  </div>
                  <input
                    onChange={(e) => setCardTitle(e.target.value)}
                    type="text"
                    name="cardTitle"
                    placeholder="Timeline Event Title"
                    className="text-xl font-bold text-gray-900 w-full border-gray-400 rounded-md border-1 p-1 mr-10 placeholder-gray-400/70"
                  />
                  <div className="flex items-center gap-1 my-2">
                    <span className="text-sm text-gray-500">Chapter</span>
                    <input
                      onChange={(e) => setChapter(e.target.value)}
                      type="text"
                      name="chapter"
                      placeholder="1"
                      className="text-sm text-gray-500 w-12 border border-gray-400 rounded-md bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {details.map((detail, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={detail.detailTitle}
                        type="text"
                        placeholder={`Detail ${index + 1}`}
                        className="font-semibold text-gray-700 flex-1 border border-gray-400 bg-transparent placeholder-gray-400 rounded px-2 py-1"
                        style={{ color: detail.detailColor }}
                        onChange={(e) => {
                          const newDetails = [...details];
                          newDetails[index].detailTitle = e.target.value;
                          setDetails(newDetails);
                        }}
                      />
                      <input
                        type="color"
                        value={detail.detailColor}
                        className="w-8 h-8 cursor-pointer"
                        title="Change detail color"
                        onChange={(e) => {
                          const newDetails = [...details];
                          newDetails[index].detailColor = e.target.value;
                          setDetails(newDetails);
                        }}
                      />
                      {details.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDetailBlock(index)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove detail block"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <textarea
                      value={detail.detailContent}
                      placeholder="Detail content..."
                      rows={3}
                      className="text-sm text-gray-600 w-full border border-gray-400 rounded p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      onChange={(e) => {
                        const newDetails = [...details];
                        newDetails[index].detailContent = e.target.value;
                        setDetails(newDetails);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 underline"
                  onClick={addDetailBlock}
                >
                  + Add Detail Block
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <PromptToAddEvent setIsOpen={setIsOpen} />
      )}

      {showSuccessNotification && (
        <Success setShowSuccessNotification={setShowSuccessNotification} />
      )}
    </div>
  );
}

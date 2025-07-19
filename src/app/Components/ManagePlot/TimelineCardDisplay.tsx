'use client';

import { useState } from 'react';
import { timelineCardType } from '@/utils/types';
import EditTimelineCard from './EditTimelineCard';
import DeleteTimelineCard from './DeleteTimelineCard';

type TimelineCardDisplayProps = {
  note: timelineCardType;
};

export default function TimelineCardDisplay({ note }: TimelineCardDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <EditTimelineCard card={note} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className='relative flex items-start ml-16'>
      <div
        className={`absolute -left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg`}
        style={{ backgroundColor: note.card_color }}
      ></div>

      <div
        className={`bg-white rounded-lg shadow-md p-6 w-full border-l-4`}
        style={{ borderLeftColor: note.card_color }}
      >
        <div className='flex justify-between items-start mb-4'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <span className='inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded'>
                #{note.index}
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full`}
                style={{
                  backgroundColor: note.event_tag.eventBgColor,
                  color: note.event_tag.eventTextColor,
                }}
              >
                {note.event_tag.eventText}
              </span>
            </div>
            <h3 className='text-xl font-bold text-gray-900'>{note.card_title}</h3>
            <p className='text-sm text-gray-500'>Chapter {note.chapter}</p>
          </div>
          <div className='flex space-x-2'>
            <button className='text-blue-600 hover:text-blue-800' onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <DeleteTimelineCard bookId={note.book_id} index={note.index} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {note.details && note.details.length > 0 ? (
            note.details.map((detail, detailIndex) => (
              <div key={detailIndex}>
                <h4 className='font-semibold text-gray-700 mb-2' style={{ color: detail.detailColor }}>
                  {detail.detailTitle}
                </h4>
                <p className='text-sm text-gray-600'>{detail.detailContent}</p>
              </div>
            ))
          ) : (
            <div>
              <p className='text-sm text-gray-500 italic'>No details available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

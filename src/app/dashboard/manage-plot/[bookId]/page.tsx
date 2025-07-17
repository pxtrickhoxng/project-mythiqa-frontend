import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';
import AddTimelineCard from '@/app/Components/ManagePlot/AddTimelineCard';
import { fetchTimelineCards, fetchLatestTimelineIndex } from '@/lib/api';
import { timelineCardType } from '@/utils/types';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { bookId: string };
};

export default async function ManagePlotPage({ params }: PageProps) {
  const { bookId } = await params;

  // add feature for    delete card

  const { getToken, userId } = await auth();
  const token = await getToken();

  if (!userId) {
    redirect('/sign-in');
  }

  if (!token) {
    redirect('/sign-in');
  }

  const indexRes = await fetchLatestTimelineIndex(bookId, token);
  const data = await indexRes.json();

  const res = await fetchTimelineCards(bookId, token);
  const timelineEvents: timelineCardType[] = await res.json();

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />
      <div className='container mx-auto py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Story Timeline</h1>
          <p className='text-gray-600'>Organize your plot structure and key story events</p>
        </div>

        <div className='relative'>
          <div className='space-y-12'>
            <AddTimelineCard bookId={bookId} userId={userId} latestIndex={data.latest_timeline_index} />

            {timelineEvents && timelineEvents.length > 0 ? (
              timelineEvents.map(note => (
                <div key={note.index} className='relative flex items-start ml-16'>
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
                        <button className='text-blue-600 hover:text-blue-800'>Edit</button>
                        <button className='text-red-600 hover:text-red-800'>Delete</button>
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
              ))
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>No timeline events yet.</p>
                <p className='text-gray-400 text-sm mt-2'>Create your first timeline event to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';
import AddTimelineCard from '@/app/Components/ManagePlot/AddTimelineCard';
import TimelineCardDisplay from '@/app/Components/ManagePlot/TimelineCardDisplay';
import { fetchTimelineCards, fetchLatestTimelineIndex, fetchBookCover } from '@/lib/api';
import { timelineCardType } from '@/utils/types';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { bookId: string };
};

export default async function ManagePlotPage({ params }: PageProps) {
  const { bookId } = await params;
  // add feature for    delete card + edit

  const { getToken, userId } = await auth();
  const userToken = await getToken();
  const frontendToken = process.env.NEXT_PUBLIC_FRONTEND_API_KEY;
  let coverUrl;

  if (!userId) {
    redirect('/sign-in');
  }

  if (!userToken) {
    redirect('/sign-in');
  }

  if (frontendToken) {
    const coverRes = await fetchBookCover(bookId, frontendToken);
    const coverData = await coverRes.json();
    coverUrl = coverData.url;
  }

  const indexRes = await fetchLatestTimelineIndex(bookId, userToken);
  const data = await indexRes.json();

  const res = await fetchTimelineCards(bookId, userToken);
  const timelineEvents: timelineCardType[] = await res.json();

  return (
    <div className='min-h-screen bg-gray-50'>
      <ReturnToDashboard />
      <div className='container mx-auto py-8'>
        <div className='flex justify-between items-start mb-8'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Story Timeline</h1>
            <p className='text-gray-600'>Organize your plot structure and key story events</p>
          </div>
          {coverUrl && (
            <div className='ml-6 flex-shrink-0'>
              <div className='relative'>
                <Image
                  src={coverUrl}
                  alt='book cover'
                  width={120}
                  height={180}
                  className='rounded-lg shadow-lg border border-gray-200 object-cover'
                />
                <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent pointer-events-none'></div>
              </div>
            </div>
          )}
        </div>

        <div className='relative'>
          <div className='space-y-12'>
            <AddTimelineCard bookId={bookId} userId={userId} latestIndex={data.latest_timeline_index} />

            {timelineEvents && timelineEvents.length > 0 ? (
              timelineEvents.map(note => <TimelineCardDisplay key={note.index} note={note} />)
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

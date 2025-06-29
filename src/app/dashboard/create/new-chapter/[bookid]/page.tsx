import ReturnToDashboard from '@/app/Components/Dashboard/ReturnToDashboard';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

type PageProps = {
  params: {
    bookid: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { bookid } = await params;

  return (
    <div>
      <ReturnToDashboard />
      <div className='flex flex-col justify-center items-center text-black'>
        <h1>Book id: {bookid}</h1>
        <div className='border-1 border-gray-400'>
          <SimpleEditor bookId={bookid} />
        </div>
      </div>
    </div>
  );
};

export default page;

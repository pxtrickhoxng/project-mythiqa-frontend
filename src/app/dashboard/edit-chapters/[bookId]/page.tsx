import { fetchBookData } from "@/lib/api/books";
import { fetchChapters } from "@/lib/api/chapters";
import { Book, Chapter } from "@/utils/types";
import Link from "next/link";
import { formatDate } from "@/utils/formateDate";
import ReturnToDashboard from "@/app/Components/Dashboard/ReturnToDashboard";

type PageProps = {
  params: {
    bookId: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { bookId } = await params;

  try {
    const [bookRes, chaptersRes] = await Promise.all([
      fetchBookData(bookId),
      fetchChapters(bookId),
    ]);

    const book: Book = await bookRes.json();
    const chapters: Chapter[] = await chaptersRes.json();

    // Sort chapters by chapterNumber (convert string to number for proper sorting)
    const sortedChapters = chapters.sort(
      (a, b) => parseInt(a.chapterNumber) - parseInt(b.chapterNumber)
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <ReturnToDashboard />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {book.bookName}
                  </h2>
                  <p className="text-gray-600">Select a chapter to edit</p>
                </div>
                <Link
                  href={`/dashboard/create/new-chapter/${book.bookId}`}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  + New Chapter
                </Link>
              </div>
            </div>

            {sortedChapters.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {sortedChapters.map((chapter, index) => (
                  <Link
                    key={chapter.chapterId}
                    href={`/dashboard/edit-chapters/${book.bookId}/${chapter.chapterId}`}
                    className="block p-6 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm group-hover:bg-blue-200 transition-colors">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                            Chapter {chapter.chapterNumber}:{" "}
                            {chapter.chapterName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              Published {formatDate(chapter.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg
                          className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No chapters yet!
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first chapter to get started with your story.
                </p>
                <Link
                  href={`/dashboard/create/new-chapter/${book.bookId}`}
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Create First Chapter
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <p className="text-red-500 text-lg font-medium mb-2">
            Error loading chapters
          </p>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default page;

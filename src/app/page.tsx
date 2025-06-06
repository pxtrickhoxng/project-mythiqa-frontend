export default function Home() {
  return (
    <div>
      <div className='flex flex-col min-h-screen justify-center items-center text-black'>
        <h1 className='text-6xl font-bold'>Welcome to Mythiqa</h1>
        <h2 className='text-2xl mt-4 max-w-xl mx-auto text-center'>Unite your stories, worlds, and voices.</h2>
        <div className='flex gap-6 mt-8'>
          <button className='px-6 py-3 bg-gray-900 text-[#f7f4ed] rounded-lg font-semibold text-lg shadow-md hover:bg-gray-950 transition'>
            Start Reading
          </button>
          <button className='px-6 py-3 bg-[#f7f4ed] text-black border border-black rounded-lg font-semibold text-lg shadow-md hover:bg-gray-200 transition'>
            Start Writing
          </button>
        </div>
      </div>
    </div>
  );
}

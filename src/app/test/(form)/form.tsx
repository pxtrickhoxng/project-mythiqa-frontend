export const UploadForm = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[200px]'>
      <form className='bg-white p-6 rounded shadow-md flex flex-col gap-4 w-full max-w-sm'>
        <label className='block text-gray-700 font-semibold mb-2' htmlFor='file'>
          Select an image to upload
        </label>
        <input
          id='file'
          type='file'
          name='file'
          accept='image/*'
          className='block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
        />
        <button
          type='submit'
          className='mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors font-semibold'
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

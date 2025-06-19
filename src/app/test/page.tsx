'use client';
import { UploadForm } from './(form)/form';

const page = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-black'>
      <h1>Upload files to S3</h1>
      <UploadForm />
    </div>
  );
};

export default page;

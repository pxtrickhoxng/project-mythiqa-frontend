import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  setShowSuccessNotification: Dispatch<SetStateAction<boolean>>;
};

const Success = ({ setShowSuccessNotification }: PropTypes) => {
  return (
    <div className='fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3'>
      <div className='flex items-center space-x-2'>
        <span className='text-lg'>✓</span>
        <span className='font-medium'>Timeline event created successfully!</span>
      </div>
      <button
        onClick={() => setShowSuccessNotification(false)}
        className='text-white hover:text-gray-200 text-xl font-bold'
      >
        ×
      </button>
    </div>
  );
};

export default Success;

import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const PromptToAddEvent = ({ setIsOpen }: PropTypes) => {
  return (
    <div className='relative flex items-start ml-16'>
      <div className='absolute -left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg bg-gray-400'></div>

      <div className='bg-white rounded-lg shadow-md p-6 w-full border-l-4 border-gray-400 border-dashed'>
        <div className='text-center py-8'>
          <div className='mb-4'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
              <svg className='w-8 h-8 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
            </div>
          </div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>Add Timeline Event</h3>
          <p className='text-gray-500 mb-6'>Create a new plot point for your story timeline</p>
          <button
            className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
            onClick={() => setIsOpen(true)}
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            Add a Timeline Notecard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptToAddEvent;

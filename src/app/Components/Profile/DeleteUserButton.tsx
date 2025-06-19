'use client';
import { useState } from 'react';

const DeleteUserButton = ({ onDelete }: { onDelete: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onDelete();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button className='px-4 py-2 bg-red-600 text-white rounded font-nunito' onClick={handleDelete}>
        Delete User
      </button>
      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
          <div className='bg-white p-6 rounded shadow-lg flex flex-col items-center'>
            <p className='mb-4 text-lg font-nunito'>Are you sure?</p>
            <div className='flex gap-4'>
              <button className='px-4 py-2 bg-red-600 text-white rounded font-nunito' onClick={handleConfirm}>
                Yes, Delete
              </button>
              <button className='px-4 py-2 bg-gray-300 text-black rounded font-nunito' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserButton;

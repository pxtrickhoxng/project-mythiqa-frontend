'use client';

import { nunito } from '@/assets/fonts';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type EditButtonTypes = {
  urlUsername: string;
  currentUser: string | null;
};

const EditButton = ({ urlUsername, currentUser }: EditButtonTypes) => {
  const pathname = usePathname();

  if (urlUsername === currentUser) {
    return (
      <Link
        href={`${pathname}/edit`}
        className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600 ${nunito.className}`}
      >
        EDIT PROFILE
      </Link>
    );
  } else {
    return (
      <Link
        href={`${pathname}/report`}
        className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600 ${nunito.className}`}
      >
        REPORT USER
      </Link>
    );
  }
};

export default EditButton;

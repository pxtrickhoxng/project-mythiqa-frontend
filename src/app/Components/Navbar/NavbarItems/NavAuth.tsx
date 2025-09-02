import Link from 'next/link';
import UserDropdown from './UserDropdown';

interface AuthData {
  isAuthenticated: boolean;
  username: string;
  imageUrl: string;
}

interface NavAuthProps {
  authData: AuthData | null;
}

const NavAuth = ({ authData }: NavAuthProps) => {
  if (authData?.isAuthenticated) {
    return (
      <div className='flex justify-end items-center flex-1 gap-6'>
        <UserDropdown imageUrl={authData.imageUrl} username={authData.username} />
      </div>
    );
  }

  return (
    <div className='flex justify-end items-center flex-1 gap-6'>
      <Link
        href='/sign-in'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Sign in
      </Link>
      <Link
        href='/sign-up'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Sign up
      </Link>
    </div>
  );
};

export default NavAuth;

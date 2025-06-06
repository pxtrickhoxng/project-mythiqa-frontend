import Link from 'next/link';
import UserAvatar from './UserInfo/UserAvatar';

const Navbar = async () => {
  return (
    <nav className='bg-[#f7f4ed] text-black px-0 py-4 fixed top-0 left-0 w-full z-50 border-b'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4'>
        <div className='flex-1'>
          <Link href='/' className='text-2xl font-bold tracking-wide'>
            Mythiqa
          </Link>
        </div>

        <div className='flex justify-center space-x-6 flex-1'>
          <Link
            href='/'
            className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href='/'
            className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
          >
            About
          </Link>
          <Link
            href='/'
            className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
          >
            Contact
          </Link>
        </div>

        <div className='flex justify-end items-center space-x-4 flex-1'>
          <Link
            href='/signin'
            className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
          >
            Sign In
          </Link>
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from 'next/link';

const NavbarCenter = () => {
  return (
    <div className='flex justify-center space-x-6 flex-1'>
      <Link
        href='/'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Home
      </Link>
      <Link
        href='/about'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        About
      </Link>
      <Link
        href='/contact'
        className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
      >
        Contact
      </Link>
    </div>
  );
};

export default NavbarCenter;

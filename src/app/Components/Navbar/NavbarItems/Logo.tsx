import Link from 'next/link';

const Logo = () => {
  return (
    <div className='flex-1'>
      <Link href='/' className='text-2xl font-bold tracking-wide'>
        Mythiqa
      </Link>
    </div>
  );
};

export default Logo;

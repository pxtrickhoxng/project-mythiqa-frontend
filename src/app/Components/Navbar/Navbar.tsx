import Logo from './NavbarItems/Logo';
import NavbarCenter from './NavbarItems/NavbarCenter';
import NavAuth from './NavbarItems/NavAuth';

const Navbar = async () => {
  return (
    <nav className={'bg-[#f7f4ed] text-gray-500 px-0 py-2 fixed top-0 left-0 w-full z-50 border-b font-semibold'}>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4'>
        <Logo />
        <NavbarCenter />
        <NavAuth />
      </div>
    </nav>
  );
};

export default Navbar;

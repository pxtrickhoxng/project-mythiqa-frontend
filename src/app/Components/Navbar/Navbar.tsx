import Logo from './NavbarItems/Logo';
import NavbarCenter from './NavbarItems/NavbarCenter';
import NavAuth from './NavbarItems/NavAuth';

interface AuthData {
  isAuthenticated: boolean;
  username: string;
  imageUrl: string;
}

interface NavbarProps {
  authData: AuthData | null;
}

const Navbar = ({ authData }: NavbarProps) => {
  return (
    <nav
      className={
        'bg-white text-gray-500 px-0 py-2 fixed top-0 left-0 w-full z-50 border-b-2 border-gray-300 font-semibold'
      }
    >
      <div className='flex items-center max-w-6xl mx-auto px-4 relative'>
        <Logo />
        <NavbarCenter authData={authData} />
        <div className='hidden md:flex justify-end flex-1'>
          <NavAuth authData={authData} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

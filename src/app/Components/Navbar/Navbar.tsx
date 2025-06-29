import Logo from './NavbarItems/Logo';
import NavbarCenter from './NavbarItems/NavbarCenter';
import NavAuth from './NavbarItems/NavAuth';
import { auth, currentUser } from '@clerk/nextjs/server';
import { fetchUserProfileImg } from '@/lib/api';

const Navbar = async () => {
  const { userId, getToken } = await auth();
  const token = await getToken();
  const user = await currentUser();

  let authData = null;
  if (userId && user?.username && token) {
    const res = await fetchUserProfileImg(user?.username, token);
    const data = await res.json();
    authData = {
      isAuthenticated: true,
      username: user.username,
      imageUrl: data.user_profile_img_url,
    };
  }

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
          <NavAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { currentUser, auth } from '@clerk/nextjs/server';
import { fetchUserData } from '@/lib/api';
import EditProfileForm from '@/app/Components/Profile/EditProfileForm';

const page = async () => {
  const user = await currentUser();
  const username = user?.username;
  const { getToken } = await auth();
  const token = await getToken?.();

  if (!username) {
    return (
      <div className='max-w-xl mx-auto p-4 text-center text-red-600 font-semibold'>
        Please login to edit your profile.
      </div>
    );
  }

  const userData = await fetchUserData(username, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (userData) {
    return (
      <EditProfileForm
        username={username}
        userDescription={userData.description}
        currentBgImg={userData.profile_background_img_url}
        currentProfileImg={userData.user_profile_url}
      />
    );
  } else {
    return <div>Error retrieving user data</div>;
  }
};

export default page;

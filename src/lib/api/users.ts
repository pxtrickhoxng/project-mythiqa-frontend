const BASE_URL = process.env.BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

type userType = {
  userId: string;
  username: string | null;
  displayName: string;
  email: string;
  description: string | null;
  userBackgroundImgUrl: string | null;
  userProfileImgUrl: string | null;
  role: "user" | "admin";
};

type updateUserType = {
  username: string;
  userBackgroundImgFile: File | null;
  userProfileImgFile: File | null;
  description: string | null;
};

type UserProfile = {
  displayName: string;
  description: string;
  userBackgroundImgUrl: string;
  userProfileImgUrl: string;
  createdAt: string;
};

export const fetchUserData = async (
  username: string
): Promise<UserProfile | null> => {
  try {
    const res = await fetch(`${USERS_API}/${username}/profile`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const fetchUserDisplayName = async (username: string) => {
  try {
    const res = await fetch(`${USERS_API}/${username}/display-name`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data?.userDisplayName || null;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const userExists = async (userId: string, token: string) => {
  const res = await fetch(`${USERS_API}/${userId}/exists`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createUser = async (user: userType, token: string) => {
  const res = await fetch(`${USERS_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.status;
};

export const updateUser = async (user: updateUserType, token: string) => {
  const formData = new FormData();

  if (user.username) {
    formData.append("username", user.username);
  }

  if (user.description) {
    formData.append("description", user.description);
  }
  if (user.userBackgroundImgFile) {
    formData.append("userBackgroundImgFile", user.userBackgroundImgFile);
  }
  if (user.userProfileImgFile) {
    formData.append("userProfileImgFile", user.userProfileImgFile);
  }

  const res = await fetch(`${USERS_API}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return res;
};

// yet to be implemented
export const deleteUser = async (userId: string, token: string) => {
  const res = await fetch(`${USERS_API}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.status;
};

export const fetchUserProfileImg = async (username: string) => {
  try {
    const res = await fetch(`${USERS_API}/${username}/profile-img`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.userProfileImgUrl || null;
  } catch (err) {
    console.error("Failed to fetch user profile image", err);
    return null;
  }
};

export const fetchNumOfStories = async (userId: string) => {
  const res = await fetch(`${USERS_API}/${userId}/books/count`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res;
};

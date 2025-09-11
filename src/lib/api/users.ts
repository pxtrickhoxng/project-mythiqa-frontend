const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

type CreateUserType = {
  userId: string;
  username: string;
  displayName: string;
  email: string | null;
  description: string | null;
  userBackgroundImgUrl: string | null;
  userProfileImgUrl: string | null;
  role: "user" | "admin";
};

type UpdateUserType = {
  displayName: string;
  userBackgroundImgFile: File | null;
  userProfileImgFile: File | null;
  description: string | null;
};

type UserDisplayNameType = {
  userDisplayName: string;
}

type UserProfile = {
  displayName: string;
  description: string;
  userBackgroundImgUrl: string;
  userProfileImgUrl: string;
  createdAt: string;
};

type UserProfileImgType = {
  userProfileImgUrl: string | null;
}

type NumOfBooksType = {
  count: number;
}

export const fetchUserData = async (
  username: string
): Promise<UserProfile | null> => {
  try {
    const res = await fetch(`${USERS_API}/${username}/profile`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const fetchUserDisplayName = async (username: string): Promise<UserDisplayNameType | null> => {
  try {
    const res = await fetch(`${USERS_API}/${username}/display-name`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const userExists = async (userId: string, token: string): Promise<Response> => {
  const res = await fetch(`${USERS_API}/${userId}/exists`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createUser = async (user: CreateUserType, token: string): Promise<Response> => {
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

  return res;
};

export const updateUser = async (user: UpdateUserType, token: string): Promise<Response> => {
  const formData = new FormData();

  if (user.displayName) {
    formData.append("displayName", user.displayName);
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
export const deleteUser = async (userId: string, token: string): Promise<Response> => {
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

  return res;
};

export const fetchUserProfileImg = async (username: string): Promise<UserProfileImgType | null> => {
  try {
    const res = await fetch(`${USERS_API}/${username}/profile-img`);

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch user profile image", err);
    return null;
  }
};

export const fetchNumOfStories = async (userId: string): Promise<NumOfBooksType> => {
  const res = await fetch(`${USERS_API}/${userId}/books/count`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return await res.json();
};

export const updateDisplayName = async (displayName: string, token: string): Promise<Response> => {
  const res = await fetch(`${USERS_API}/display-name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({displayName})
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res;
};



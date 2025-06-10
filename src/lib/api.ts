const baseUrl = 'http://localhost:8000';

export const fetchUserData = async (userId: string) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}`);
  return res.json();
};

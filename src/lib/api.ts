const baseUrl = 'http://localhost:8000';

export const fetchUserData = async (userId: string) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('API error:', errorText);
    return null;
  }
  const data = await res.json();
  return data;
};

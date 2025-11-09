const API_URL = 'https://e-commerce-website-zxn0.onrender.com';
const AUTH_API_URL = `${API_URL}/api/auth`;

interface UserData {
  name?: string;
  email: string;
  password?: string;
}

interface Credentials {
  email: string;
  password?: string;
}

export const registerUser = async (userData: UserData) => {
  const response = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed.');
  }
  return response.json();
};

export const loginUser = async (credentials: Credentials) => {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Invalid credentials.');
  }
  return response.json();
};
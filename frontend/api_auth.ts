// frontend/api/auth.ts
// Handles login and registration API calls for the frontend.

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// ✅ Detect API base URL automatically
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://e-commerce-website-zxn0.onrender.com";

/**
 * Logs in a user.
 * The JWT token is received in an httpOnly cookie and handled by the browser.
 * This function resolves with the user data from the response body.
 */
// --- LOGIN ---
export async function loginUser(data: LoginCredentials): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Login failed: ${text || response.statusText}`);
    }

    const result = await response.json();
    // On success, the response body contains user info, but no token.
    // The token is in an httpOnly cookie, managed by the browser.
    // We no longer need to check for `result.token`.
    return result as User;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

// --- REGISTER ---
/**
 * Registers a new user.
 * The JWT token is received in an httpOnly cookie and handled by the browser.
 * This function resolves with the new user's data from the response body.
 */
export async function registerUser(data: RegisterCredentials): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Registration failed: ${text || response.statusText}`);
    }

    const result = await response.json();
    // On success, the response body contains user info, but no token.
    return result as User;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

/**
 * Logs out the user by calling the backend endpoint to clear the cookie.
 */
export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", // ✅ Send cookies to be cleared
  });
};
// frontend/api/auth.ts
// Handles login and registration API calls for the frontend.

interface AuthResponse {
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// ✅ Detect API base URL automatically
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://e-commerce-website-zxn0.onrender.com";

// --- LOGIN ---
export async function loginUser(data: LoginData): Promise<AuthResponse> {
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
    if (!result.token) {
      throw new Error("Invalid login response: no token found.");
    }

    return result as AuthResponse;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

// --- REGISTER ---
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
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

    // Backend may or may not return a token directly — handle both cases
    if (result.token) {
      return result as AuthResponse;
    } else {
      // If token not returned, follow up with a login on frontend
      return { token: "" };
    }
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}
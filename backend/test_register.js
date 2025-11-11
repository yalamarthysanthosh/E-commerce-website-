import axios from "axios";

const BASE = "http://localhost:5000";

async function testRegistration() {
  try {
    console.log("➡ Registering user...");
    const res = await axios.post(`${BASE}/api/users/register`, {
      name: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    console.log("✅ Registration succeeded:", res.data);
    process.exit(0);
  } catch (err) {
    console.error("❌ Registration failed:", err.response?.data || err.message);
    process.exit(1);
  }
}

testRegistration();
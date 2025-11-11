import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

// This interceptor will automatically add the auth token to every request
// It's the same as in userApi.ts, ensuring consistency.
API.interceptors.request.use((req) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return req;
});

export const placeOrder = async (data: any) => {
  return API.post("/orders", data);
};
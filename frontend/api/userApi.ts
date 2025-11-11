import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

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

export const registerUser = async (data: any) => {
  return API.post("/users/register", data);
};

export const loginUser = async (data: any) => {
  return API.post("/users/login", data);
};
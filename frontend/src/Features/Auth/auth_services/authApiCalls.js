import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AdminLoginApiCall = async (data) => {
  try {
    console.log(data);
    const res = await api.post("/admin/login", data);
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Login Failed");
  }
};

export const UserLoginApiCall = async (data) => {
  try {
    console.log(data);
    const res = await api.post("/user/login", data);
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Login Failed");
  }
};

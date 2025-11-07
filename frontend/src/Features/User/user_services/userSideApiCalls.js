import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const UserProfileApiCall = async (data) => {
  try {
    const res = await api.put("/user/update/profile", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const UserTasks = async () => {
  try {
    const res = await api.get("/user/tasks");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const UpdateTaskStatus = async (id, status) => {
  console.log(id, status);
  try {
    const res = await api.put(`/user/update-status/${id}`, { status });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

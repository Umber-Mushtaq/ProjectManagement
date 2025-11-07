import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const CreateProjectApiCall = async (data) => {
  try {
    const res = await api.post("/admin/project/create", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const GetAllProjects = async () => {
  try {
    const res = await api.get("/admin/project/all");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "No Project Yet");
  }
};

export const CreateTaskApiCall = async (data) => {
  try {
    const res = await api.post("/admin/task/create", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const GetTaskApiCall = async (id) => {
  try {
    const res = await api.post(`/admin/task/project/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

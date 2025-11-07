import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const UpdateProfileApiCall = async (data) => {
  try {
    const res = await api.put("/admin/update", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const GetAllMembersApiCall = async () => {
  try {
    const res = await api.get("/admin/all");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "No Users Yet");
  }
};

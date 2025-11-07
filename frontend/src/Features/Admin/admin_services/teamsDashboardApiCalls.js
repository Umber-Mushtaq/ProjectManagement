import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AddMemberApiCall = async (data) => {
  try {
    const res = await api.post("/admin/add", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message, "Axios Error");
  }
};

export const UserMoveToTrashApiCall = async (id) => {
  try {
    const res = await api.patch(`/admin/soft-delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const AddTeamApiCall = async (data) => {
  try {
    console.log(data);
    const res = await api.post("/admin/team/create", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios Error");
  }
};

export const GetALLTeamsApiCall = async () => {
  try {
    const res = await api.get("/admin/team/get");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "No team yet");
  }
};

export const UpdateTeamApiCall = async (data, id) => {
  console.log(data, id);
  try {
    const res = await api.put(`/admin/team/update/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios error");
  }
};

export const DeleteTeamApiCall = async (id) => {
  try {
    const res = await api.delete(`/admin/team/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Axios error");
  }
};

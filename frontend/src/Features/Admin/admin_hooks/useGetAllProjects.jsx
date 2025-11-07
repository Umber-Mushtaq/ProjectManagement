import toast from "react-hot-toast";
import { GetAllProjects } from "../admin_services/projectDashboardApiCalls";

export const useGetAllProjects = () => {
  const getProjects = async () => {
    try {
      const res = await GetAllProjects();
      return res.projects;
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { getProjects };
};

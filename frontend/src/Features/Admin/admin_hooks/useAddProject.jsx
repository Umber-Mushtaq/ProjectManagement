import { CreateProjectApiCall } from "../admin_services/projectDashboardApiCalls";
import toast from "react-hot-toast";

export const useAddProject = () => {
  const addProject = async (data) => {
    try {
      const res = await CreateProjectApiCall(data);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { addProject };
};

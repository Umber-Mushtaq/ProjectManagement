import toast from "react-hot-toast";
import { GetTaskApiCall } from "../admin_services/projectDashboardApiCalls";

export const useGetTasks = () => {
  const getTasks = async (id) => {
    try {
      const res = await GetTaskApiCall(id);
      return res.tasks;
    } catch (error) {
      toast(error?.message);
    }
  };
};

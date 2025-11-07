import toast from "react-hot-toast";
import { CreateTaskApiCall } from "../admin_services/projectDashboardApiCalls";

export const useAddTask = () => {
  const addTask = async (data) => {
    try {
      const res = await CreateTaskApiCall(data);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { addTask };
};

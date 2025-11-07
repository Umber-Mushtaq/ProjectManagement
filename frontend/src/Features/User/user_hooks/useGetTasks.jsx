import toast from "react-hot-toast";
import { UserTasks } from "../user_services/userSideApiCalls";

export const useGetTasks = () => {
  const getTasks = async () => {
    try {
      const res = await UserTasks();
      return res.tasks;
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { getTasks };
};

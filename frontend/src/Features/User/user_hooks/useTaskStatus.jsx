import toast from "react-hot-toast";
import { UpdateTaskStatus } from "../user_services/userSideApiCalls";

export const useTaskStatus = () => {
  const updateStatus = async (id, status) => {
    try {
      const res = await UpdateTaskStatus(id, status);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { updateStatus };
};

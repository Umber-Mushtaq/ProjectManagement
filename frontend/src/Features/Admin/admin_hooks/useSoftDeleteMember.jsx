import toast from "react-hot-toast";
import { UserMoveToTrashApiCall } from "../admin_services/teamsDashboardApiCalls";

export const useSoftDeleteMember = () => {
  const softDeleteUser = async (id) => {
    try {
      const res = await UserMoveToTrashApiCall(id);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { softDeleteUser };
};

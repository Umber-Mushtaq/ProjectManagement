import toast from "react-hot-toast";
import { DeleteTeamApiCall } from "../admin_services/teamsDashboardApiCalls";

export const useDeleteTeam = () => {
  const deleteTeam = async (id) => {
    try {
      const res = await DeleteTeamApiCall(id);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { deleteTeam };
};

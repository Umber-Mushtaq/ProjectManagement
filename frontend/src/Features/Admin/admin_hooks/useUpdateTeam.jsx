import toast from "react-hot-toast";
import { UpdateTeamApiCall } from "../admin_services/teamsDashboardApiCalls";

export const useUpdateTeam = () => {
  const updateTeam = async (data, id) => {
    try {
      const res = await UpdateTeamApiCall(data, id);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { updateTeam };
};

import { AddTeamApiCall } from "../admin_services/teamsDashboardApiCalls";
import toast from "react-hot-toast";
export const useAddTeam = () => {
  const addTeam = async (data) => {
    try {
      const res = await AddTeamApiCall(data);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { addTeam };
};

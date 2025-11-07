import toast from "react-hot-toast";
import { GetALLTeamsApiCall } from "../admin_services/teamsDashboardApiCalls";
export const useGetAllTeams = () => {
  const getTeams = async () => {
    try {
      const res = await GetALLTeamsApiCall();
      return res.teams;
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { getTeams };
};

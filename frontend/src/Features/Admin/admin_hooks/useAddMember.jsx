import toast from "react-hot-toast";
import { AddMemberApiCall } from "../admin_services/teamsDashboardApiCalls";

export const useAddMember = () => {
  const addMember = async (credentials) => {
    try {
      const res = await AddMemberApiCall(credentials);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { addMember };
};

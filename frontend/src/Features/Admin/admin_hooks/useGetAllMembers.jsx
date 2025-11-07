import toast from "react-hot-toast";
import { GetAllMembersApiCall } from "../admin_services/adminDashboardApiCalls";

export const useGetAllMembers = () => {
  const allMembers = async () => {
    try {
      const res = await GetAllMembersApiCall();
      console.log(res.users);
      return res.users;
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { allMembers };
};

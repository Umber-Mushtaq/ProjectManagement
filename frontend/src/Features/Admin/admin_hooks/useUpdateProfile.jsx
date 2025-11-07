import toast from "react-hot-toast";
import { UpdateProfileApiCall } from "../admin_services/adminDashboardApiCalls";

export const useUpdateProfile = () => {
  const update = async (credentials) => {
    try {
      const res = await UpdateProfileApiCall(credentials);
      localStorage.setItem("Admin", JSON.stringify(res?.admin));
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return { update };
};

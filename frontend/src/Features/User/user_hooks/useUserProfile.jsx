import toast from "react-hot-toast";
import { UserProfileApiCall } from "../user_services/userSideApiCalls";
export const useUserProfile = () => {
  const userProfile = async (data) => {
    try {
      const res = await UserProfileApiCall(data);
      localStorage.setItem("User", JSON.stringify(res?.user));
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return { userProfile };
};

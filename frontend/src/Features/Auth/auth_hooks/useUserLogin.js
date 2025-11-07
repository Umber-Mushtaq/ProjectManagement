import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserLoginApiCall } from "../auth_services/authApiCalls";
export const useUserLogin = () => {
  const navigate = useNavigate();
  const userLogin = async (credentials) => {
    try {
      const res = await UserLoginApiCall(credentials);
      localStorage.setItem("User", JSON.stringify(res?.user));
      toast.success(res?.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return { userLogin };
};

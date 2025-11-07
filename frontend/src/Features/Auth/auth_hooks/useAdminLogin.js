import toast from "react-hot-toast";
import { AdminLoginApiCall } from "../auth_services/authApiCalls";
import { useNavigate } from "react-router-dom";

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const login = async (credentials) => {
    try {
      const res = await AdminLoginApiCall(credentials);
      localStorage.setItem("Admin", JSON.stringify(res?.user));
      toast.success(res?.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return { login };
};

import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedAdminDashboard = () => {
  console.log("inside admin protected url");
  const user =
    JSON.parse(localStorage.getItem("Admin")) ||
    JSON.parse(localStorage.getItem("User"));

  // ✅ Check both presence and role
  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (user.role !== "admin") {
    // 🚫 Not an admin — redirect to user dashboard
    return <Navigate to='tasks-board' replace />;
  }

  // ✅ Render Admin Dashboard
  return (
    <div className='flex'>
      <SideBar />
      <div className='w-full ml-15'>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedAdminDashboard;

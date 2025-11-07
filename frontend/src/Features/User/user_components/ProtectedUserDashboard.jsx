import { Navigate, Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const ProtectedUserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  if (!user) {
    // No user found — redirect to login
    return <Navigate to='/' replace />;
  }

  if (user.role !== "user") {
    // Logged in but not a normal user — redirect to admin
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='flex'>
      <UserSideBar />
      <div className='w-full ml-15 mr-5'>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedUserDashboard;

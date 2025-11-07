import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./Context/SocketContext";
import { Route, Routes } from "react-router-dom";
import AuthenticationPage from "./Features/Auth/auth_pages/AuthenticationPage";
import ProtectedAdminDashboard from "./Features/Admin/admin_components/ProtectedAdminDashboard";
import AdminDashboard from "./Features/Admin/admin_pages/AdminDashboard";
import ProjectsDashboard from "./Features/Admin/admin_pages/ProjectsDashboard";
import TeamsDashboard from "./Features/Admin/admin_pages/TeamsDashboard";
import GlobalChatRoom from "./Features/Admin/admin_pages/GlobalChatRoom";
import ProtectedUserDashboard from "./Features/User/user_components/ProtectedUserDashboard";
import UserProfile from "./Features/User/user_pages/UserProfile";
import TaskBoard from "./Features/User/user_pages/TaskBoard";

const App = () => {
  return (
    <SocketProvider>
      <Routes>
        <Route path='/' element={<AuthenticationPage />} />
        <Route element={<ProtectedAdminDashboard />}>
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/projects' element={<ProjectsDashboard />} />
          <Route path='/charts' element={<GlobalChatRoom />} />
          <Route path='/teams' element={<TeamsDashboard />} />
        </Route>
        <Route element={<ProtectedUserDashboard />}>
          <Route path='/tasks-board' element={<TaskBoard />} />
          <Route path='/user-charts' element={<GlobalChatRoom />} />
        </Route>
      </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </SocketProvider>
  );
};

export default App;

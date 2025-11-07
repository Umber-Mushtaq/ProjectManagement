import ProjectsOverview from "../admin_components/ProjectsOverview";
import UsersOverview from "../admin_components/UsersOverview";
import Categories from "../admin_components/Categories";
import Calander from "../admin_components/Calander";

const AdminDashboard = () => {
  return (
    <div className='w-full flex flex-col px-5 py-3'>
      <div className='h-screen overflow-scroll md:h-auto md:overflow-auto flex-col md:flex md:flex-row justify-between py-2'>
        <div className='flex flex-col md:flex-1 gap-3 w-full px-5'>
          <h1 className='text-2xl tracking-wider text-white bg-linear-to-r to-violet-400 from-fuchsia-500 font-bold w-full  py-3 px-3 rounded-lg '>
            Quick Overview
          </h1>
          <ProjectsOverview />
          <UsersOverview />
        </div>
        <div className='flex flex-col gap-3 px-5 py-3 md:px-0 md:py-0'>
          <Categories />
          <Calander />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

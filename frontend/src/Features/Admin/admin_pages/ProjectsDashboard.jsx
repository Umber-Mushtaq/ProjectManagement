import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddProjectForm from "../admin_components/AddProjectForm";
import ProjectLists from "../admin_components/ProjectLists";

const ProjectsDashboard = () => {
  const [projectMode, setProjectMode] = useState(false);
  return (
    <>
      <div className='w-full flex flex-col px-5 py-3 gap-5'>
        <div className='w-full flex flex-col'>
          <h1 className='flex items-center justify-between text-2xl tracking-wider text-white font-bold w-full bg-linear-to-r to-violet-600 from-fuchsia-500 py-3 px-3 rounded-lg '>
            Projects
            <button
              onClick={() => setProjectMode(true)}
              className='hover:bg-rose-500 py-2 px-2 rounded-full'
            >
              <FaPlus />
            </button>
          </h1>
        </div>
        <ProjectLists />
      </div>
      {projectMode && <AddProjectForm setProjectMode={setProjectMode} />}
    </>
  );
};

export default ProjectsDashboard;

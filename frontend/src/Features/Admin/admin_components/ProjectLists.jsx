import { useEffect } from "react";
import { useGetAllProjects } from "../admin_hooks/useGetAllProjects";
import { useState } from "react";
import AssignTask from "./AssignTask";
import TaskList from "./TaskList";

const ProjectLists = () => {
  const [projects, setProjects] = useState([]);
  const { getProjects } = useGetAllProjects();
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      console.log(res);
      setProjects(res || []);
    };
    fetchProjects();
  }, []);
  return (
    <>
      {projects.length > 0 ? (
        <div className='grid grid-cols-1 gap-4'>
          {projects.map((project) => (
            <div
              key={project._id}
              className='bg-white flex flex-col py-3 px-5 rounded-md shadoe-lg mx-auto md:mx-5'
            >
              <div className='flex-col md:flex md:flex-row items-center justify-between w-full'>
                <div>
                  <h2 className='text-2xl tracking-wide font-medium flex-col md:flex md:flex-row items-center gap-2'>
                    {project.name}
                    <span className='text-sm bg-rose-100 text-rose-500 w-fit text-center py-1 px-2 rounded-lg'>
                      {project.status}
                    </span>
                  </h2>
                  <h2 className='text-sm text-gray-400 tracking-widest'>
                    {project.description}
                  </h2>
                </div>
                <div className='flex flex-col gap-2 w-fit items-center justify-between bg-rose-100 py-2 px-2 rounded-md text-rose-500 tracking-wider'>
                  <img
                    src={project.team.logo}
                    className='w-12 h-12 object-cover rounded-full'
                  />
                </div>
              </div>
              <hr className='my-3 text-gray-200' />

              <AssignTask projectId={project._id} members={project.members} />
              <hr className='my-3 text-gray-200' />
              <TaskList tasks={project.task} />

              <hr className='my-3 text-gray-300' />
              <div className='flex flex-row items-center justify-between w-full'>
                <h2 className='text-purple-600 text-sm tracking-widest'>
                  Task Done: {project.completedTasks}/{project.totalTasks}
                </h2>
                <h2 className='text-gray-400 text-sm tracking-widest'>
                  Due Date: {new Date(project.dueDate).toLocaleDateString()}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default ProjectLists;

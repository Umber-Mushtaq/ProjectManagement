import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useGetAllProjects } from "../admin_hooks/useGetAllProjects";
import PercentageBar from "./PercentageBar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { getProjects } = useGetAllProjects();
  const [startIndex, setStartIndex] = useState(0);
  const variableProjects =
    projects.length > 0 ? projects.slice(startIndex, startIndex + 4) : [];

  const handleNext = () => {
    if (startIndex + 4 < projects.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      setProjects(res || []);
    };
    fetchProjects();
  }, []);
  return (
    <div className='border-2 bg-white border-gray-50 shadow-sm rounded-lg py-6 px-5 space-y-3 w-full'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl tracking-wide font-medium text-purple-600'>
          Projects Overview
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={() => handlePrev()}
            className='bg-purple-200 text-rose-500 py-2 px-2 rounded-full cursor-pointer text-sm'
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => handleNext()}
            className='bg-purple-200 text-rose-500 py-2 px-2 rounded-full cursor-pointer text-sm'
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className='flex-col md:flex md:flex-row gap-3 items-center '>
        {projects.length > 0 ? (
          variableProjects.map((project, index) => (
            <div
              key={project._id}
              className={`${
                index % 2 === 0 ? "bg-pink-100" : "bg-fuchsia-200"
              } flex flex-col gap-2 border border-gray-200 rounded-md py-2 px-5 w-full`}
            >
              <div className='flex items-center justify-between w-full'>
                <img
                  src={`${
                    project.team.logo ? project.team.logo : "/images/img.png"
                  }`}
                  className='w-12 h-12 rounded-full object-cover'
                />
                <h2 className='text-sm bg-teal-100 text-teal-600 w-fit text-center py-1 px-2 rounded-lg'>
                  {project.status}
                </h2>
              </div>
              <div className='flex w-full items-center justify-between'>
                <h2 className='text-purple-500 text-md'>{project.name}</h2>
                <h2 className='text-gray-500 text-sm'>
                  Due Date: {new Date(project.dueDate).toLocaleDateString()}
                </h2>
              </div>
              <PercentageBar
                completedTasks={project.completedTasks}
                totalTasks={project.totalTasks}
              />
              <div className='flex w-full items-start'>
                {project.members.map((member) => (
                  <img
                    key={member._id}
                    src={member.imageUrl ? member.imageUrl : "/images/img.png"}
                    className='w-12 h-12 object-cover rounded-full'
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Projects;

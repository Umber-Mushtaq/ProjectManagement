import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

const TaskList = ({ tasks }) => {
  const [mode, setMode] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between text-purple-500'>
        <h2 className='text-2xl'>Tasks</h2>
        <button
          onClick={() => setMode(!mode)}
          className='bg-rose-100 py-2 px-2 rounded-full hover:cursor-pointer'
        >
          <FaArrowDown
            className={`transition-transform duration-300 ${
              mode ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          mode ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className='flex gap-2 items-center justify-between border-l-2 bg-[#f5f9fc] border-purple-500 shadow-sm py-2 px-5 rounded-lg mt-2'
            >
              <div>
                <h2 className='flex items-center gap-2'>
                  {task.name}
                  <span className='text-sm bg-teal-100 text-teal-500 w-fit text-center py-1 px-2 rounded-lg'>
                    {task.status}
                  </span>
                </h2>
                <h3 className='text-sm text-gray-400'>{task.description}</h3>
              </div>
              <div className='text-right'>
                <h2 className='text-sm text-gray-500'>
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className='text-gray-400 italic'>No Tasks Yet</div>
        )}
      </div>
    </>
  );
};

export default TaskList;

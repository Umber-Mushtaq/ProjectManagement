import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import AddTaskForm from "./AddTaskForm";

const AssignTask = ({ projectId, members }) => {
  const [mode, setMode] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [userid, setuserid] = useState("");

  const handleModal = (id) => {
    setuserid(id);
    setTaskModal(true);
  };

  return (
    <>
      <div className='flex items-center justify-between text-purple-500'>
        <h2 className='text-2xl'>Members</h2>
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
        {members.map((member) => (
          <div
            key={member._id}
            className='flex gap-2 items-center justify-between border-l-2 bg-[#f5f9fc] border-purple-500 shadow-sm py-2 px-5 rounded-lg mt-2'
          >
            <div className='flex items-center gap-3'>
              <img
                src={member.imageUrl ? member.imageUrl : "/images/img.png"}
                alt='Member'
                className='w-12 h-12 rounded-full object-cover'
              />
              <div>
                <h2>
                  {member.firstName} {member.lastName}
                </h2>
                <h3 className='text-sm text-gray-400'>{member.speciality}</h3>
              </div>
            </div>
            <button
              onClick={() => handleModal(member._id)}
              className='text-rose-600 hover:cursor-pointer text-sm'
            >
              Assign task
            </button>
          </div>
        ))}
      </div>

      {taskModal && (
        <AddTaskForm
          user={userid}
          project={projectId}
          setTaskModal={setTaskModal}
        />
      )}
    </>
  );
};

export default AssignTask;

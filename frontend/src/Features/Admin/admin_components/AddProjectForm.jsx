import { useState } from "react";
import FormButton from "../../Auth/auth_components/FormButton";
import { useAddProject } from "../admin_hooks/useAddProject";

const AddProjectForm = ({ setProjectMode }) => {
  const { addProject } = useAddProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeamName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject({ name, description, team, dueDate });
    setProjectMode(false);
  };

  return (
    <div
      className='fixed inset-0 z-50 p-3 w-full bg-black/50 shadow-2xl flex items-center justify-center'
      onClick={() => setProjectMode(false)}
    >
      <div
        className=' bg-white w-fit py-5 px-8 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-between w-full gap-4'>
            <FormButton
              label='Assign Name'
              type='text'
              name='name'
              value={name}
              placeholder='Enter name of the project'
              onChange={(e) => setName(e.target.value)}
            />
            <FormButton
              label='Give Description'
              type='text'
              name='description'
              value={description}
              placeholder='Enter description of the project'
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormButton
              label='Assign Team'
              type='text'
              name='team'
              value={team}
              placeholder='Enter team name'
              onChange={(e) => setTeamName(e.target.value)}
            />
            <div className='flex flex-col w-full'>
              <label className='text-sm text-gray-700 mb-1'>Due Date</label>
              <input
                type='date'
                name='dueDate'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-rose-400'
              />
            </div>
          </div>
          <button
            type='submit'
            className='py-2 px-3 my-3 border-2 bg-rose-500 w-full rounded-lg text-white tracking-wider hover:cursor-pointer'
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;

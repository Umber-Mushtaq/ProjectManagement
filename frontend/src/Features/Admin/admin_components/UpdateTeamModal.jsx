import { useRef, useState } from "react";
import FormButton from "../../Auth/auth_components/FormButton";
import { useUpdateTeam } from "../admin_hooks/useUpdateTeam";
import SelectMembers from "./SelectMembers";

const UpdateTeamModal = ({ setEditTeamModal, id, team }) => {
  const { updateTeam } = useUpdateTeam();
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [logo, setLogo] = useState(team.logo);
  const [memberList, setmemberList] = useState(team.memberList);
  console.log(memberList);
  const fileref = useRef();
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = `/images/${file.name}`;
      console.log(url);
      setLogo(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${name} | ${description} | ${logo} | ${memberList}`);
    await updateTeam({ name, description, logo, memberList }, id);
    setEditTeamModal(false);
  };
  return (
    <div
      className='fixed inset-0 z-50 p-3 w-full bg-black/50 shadow-2xl flex items-center justify-center'
      onClick={() => setEditTeamModal(false)}
    >
      <div
        className=' bg-white w-fit py-5 px-8 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-between w-full gap-4'>
            <div
              className='flex flex-col w-full items-center justify-center'
              onClick={() => fileref.current.click()}
            >
              <img
                src={logo ? logo : "/images/img.png"}
                className='w-20 h-20 rounded-full object-cover hover:cursor-pointer'
              />
              <p className='text-sm text-rose-400'>Select Logo</p>
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileref}
              className='hidden'
              onChange={handleImageSelect}
            />
            <FormButton
              label='Assign Name'
              type='text'
              name='name'
              value={name}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            />
            <FormButton
              label='Give Description'
              type='text'
              name='description'
              value={description}
              placeholder='Enter description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <SelectMembers
              setmemberList={setmemberList}
              text='Change members of the team...'
            />
            <div className='flex flex-col text-right w-full gap-2'>
              {memberList.map((member) => (
                <h2 className='text-[12px] text-rose-500' key={member._id}>
                  {member.firstName} | {member.speciality}
                </h2>
              ))}
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

export default UpdateTeamModal;

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddUserForm from "../admin_components/AddUserForm";
import MembersCRUD from "../admin_components/MembersCRUD";
import AddTeamForm from "../admin_components/AddTeamForm";
import TeamsCRUD from "../admin_components/TeamsCRUD";

const TeamsDashboard = () => {
  const [memberMode, setMemberMode] = useState(false);
  const [teamMode, setTeamMode] = useState(false);
  return (
    <>
      <div className='w-full flex flex-col px-5 py-3 gap-5'>
        <div className='w-full flex flex-col'>
          <h1 className='flex items-center justify-between text-2xl tracking-wider text-white font-bold w-full bg-linear-to-r to-violet-600 from-fuchsia-500 py-3 px-3 rounded-lg '>
            Teams
            <button
              onClick={() => setTeamMode(true)}
              className='hover:bg-rose-500 py-2 px-2 rounded-full'
            >
              <FaPlus />
            </button>
          </h1>
          <TeamsCRUD />
        </div>
        <div className='w-full flex flex-col'>
          <h1 className='flex items-center justify-between text-2xl tracking-wider text-white font-bold w-full bg-linear-to-r to-violet-600 from-fuchsia-500 py-3 px-3 rounded-lg '>
            Members
            <button
              onClick={() => setMemberMode(true)}
              className='hover:bg-rose-500 py-2 px-2 rounded-full'
            >
              <FaPlus />
            </button>
          </h1>
          <MembersCRUD />
        </div>
      </div>
      {memberMode && <AddUserForm setMemberMode={setMemberMode} />}
      {teamMode && <AddTeamForm setTeamMode={setTeamMode} />}
    </>
  );
};

export default TeamsDashboard;

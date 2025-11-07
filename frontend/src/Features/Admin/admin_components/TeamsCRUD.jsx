import { useEffect, useState } from "react";
import { useGetAllTeams } from "../admin_hooks/useGetAllTeams";
import { FaArrowLeft, FaArrowRight, FaPen, FaTrash } from "react-icons/fa6";
import DeleteTeamModal from "./DeleteTeamModal";
import UpdateTeamModal from "./UpdateTeamModal";

const TeamsCRUD = () => {
  const [teams, setTeams] = useState([]);
  const { getTeams } = useGetAllTeams();
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [deleteid, setDeleteid] = useState("");
  const [editTeamModal, setEditTeamModal] = useState(false);
  const [editid, seteditid] = useState("");
  const [team, setTeam] = useState({});

  const [startIndex, setStartIndex] = useState(0);
  const variableMembers =
    Array.isArray(teams) && teams.length > 0
      ? teams.slice(startIndex, startIndex + 3)
      : [];

  const handleNext = () => {
    startIndex + 3 < teams.length && setStartIndex(startIndex + 1);
  };
  const handlePrev = () => {
    startIndex > 0 && setStartIndex(startIndex - 1);
  };

  const handleEditButton = (id, team) => {
    if ((id, team)) {
      setEditTeamModal(true);
      seteditid(id);
      setTeam(team);
    }
  };

  const handleDeletButton = (id) => {
    setDeleteTeamModal(true);
    setDeleteid(id);
  };

  useEffect(() => {
    const fetchAllTeams = async () => {
      const res = await getTeams();
      setTeams(res);
      console.log(res);
    };
    fetchAllTeams();
  }, []);
  return (
    <div className='block md:flex md:flex-row items-center justify-center gap-5'>
      <button
        onClick={() => handlePrev()}
        className='hidden md:block bg-linear-to-tl text-white from-rose-400 to-fuchsia-600 px-2 py-2 rounded-full'
      >
        <FaArrowLeft />
      </button>

      {variableMembers.length > 0 ? (
        <div className='w-full flex-col md:flex md:flex-row py-2 px-3 gap-5'>
          {variableMembers.map((team) => (
            <div
              key={team._id}
              className='flex-col md:flex md:flex-row items-center justify-center bg-white mt-3 md:w-full shadow-lg px-2 rounded-2xl border-gray-300 py-2'
            >
              <div className='flex flex-col items-center justify-center gap-3 px-3 py-3'>
                <img
                  src={`${team.logo ? team.logo : "/images/img.png"}`}
                  className='w-20 h-20 rounded-full object-cover shadow-lg'
                />
                <div className='flex flex-col gap-2 items-center'>
                  <h2 className='text-purple-700 font-semibold tracking-widest'>
                    {team.name}
                  </h2>
                  <h2 className='text-sm tracking-wide text-gray-400 text-center'>{`${
                    team.description ? team.description : ""
                  }`}</h2>
                  <h2 className='text-md bg-rose-100 py-2 px-3 rounded-full text-purple-500 tracking-wide'>
                    {team.memberList.length} Members
                  </h2>
                </div>
                <hr className='w-full text-gray-300' />
                <div className='flex items-center justify-between w-full gap-5'>
                  <button
                    onClick={() => handleDeletButton(team._id)}
                    className=' text-rose-500 flex items-center justify-between gap-2 hover:cursor-pointer'
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleEditButton(team._id, team)}
                    className=' text-rose-500 flex items-center justify-between gap-2 hover:cursor-pointer'
                  >
                    <FaPen />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button
        onClick={() => handleNext()}
        className='hidden md:block bg-linear-to-tl text-white from-rose-400 to-fuchsia-600 px-2 py-2 rounded-full'
      >
        <FaArrowRight />
      </button>

      {deleteTeamModal && (
        <DeleteTeamModal
          setDeleteTeamModal={setDeleteTeamModal}
          id={deleteid}
        />
      )}
      {editTeamModal && (
        <UpdateTeamModal
          setEditTeamModal={setEditTeamModal}
          id={editid}
          team={team}
        />
      )}
    </div>
  );
};

export default TeamsCRUD;

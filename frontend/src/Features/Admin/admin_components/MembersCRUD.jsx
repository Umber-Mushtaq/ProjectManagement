import { useEffect, useState } from "react";
import { useGetAllMembers } from "../admin_hooks/useGetAllMembers";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "./DeleteUserModal";

const MembersCRUD = () => {
  const { allMembers } = useGetAllMembers();
  const [deletemodal, setDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [members, setMembers] = useState([]);

  const [startIndex, setStartIndex] = useState(0);
  const variableMembers = members.slice(startIndex, startIndex + 5);
  const handleNext = () => {
    startIndex + 5 < members.length && setStartIndex(startIndex + 1);
  };
  const handlePrev = () => {
    startIndex > 0 && setStartIndex(startIndex - 1);
  };

  const handleDeletButton = (id) => {
    setDeleteModal(true);
    setMemberId(id);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await allMembers();
      console.log(res);
      if (res) setMembers(res);
    };
    fetchMembers();
  }, []);
  return (
    <div className='block md:flex md:flex-row items-center justify-center gap-5'>
      <button
        onClick={() => handlePrev()}
        className='hidden md:block bg-linear-to-tl text-white from-rose-400 to-fuchsia-600 px-2 py-2 rounded-full shadow-lg'
      >
        <FaArrowLeft />
      </button>

      {variableMembers.length > 0 ? (
        <div className='w-full flex-col md:flex md:flex-row py-2 px-3 gap-5'>
          {variableMembers.map((member) => (
            <div
              key={member._id}
              className='flex-col md:flex md:flex-row items-center justify-center bg-white mt-3 md:w-full shadow-lg px-2 rounded-md border-gray-300 py-2'
            >
              <div className='flex flex-col items-center justify-center gap-3 px-3'>
                <img
                  src={`${
                    member.imageUrl ? member.imageUrl : "/images/img.png"
                  }`}
                  className='w-20 h-20 rounded-full object-cover'
                />
                <div className='flex flex-col gap-1 items-center'>
                  <h2 className='text-purple-700 font-semibold tracking-widest'>
                    {member.firstName} {member.lastName}
                  </h2>
                  <h2 className='text-gray-400 text-sm'>{member.email}</h2>
                  <h2 className='text-sm tracking-wide text-teal-400'>{`${
                    member.speciality ? member.speciality : ""
                  }`}</h2>
                </div>
                <div>
                  <button
                    onClick={() => handleDeletButton(member._id)}
                    className='text-[20px] text-rose-500 hover:cursor-pointer'
                  >
                    <FaTrash />
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

      {deletemodal && (
        <DeleteModal id={memberId} setDeleteModal={setDeleteModal} />
      )}
    </div>
  );
};

export default MembersCRUD;

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useGetAllMembers } from "../admin_hooks/useGetAllMembers";

// export const users = [
//   {
//     id: 1,
//     name: "Ayesha Khan",
//     specialty: "Frontend Developer",
//     imageUrl: "",
//   },
//   {
//     id: 2,
//     name: "Ahmed Raza",
//     specialty: "Backend Developer",
//     imageUrl: "",
//   },
//   {
//     id: 3,
//     name: "Sana Ali",
//     specialty: "UI/UX Designer",
//     imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
//   },
//   {
//     id: 4,
//     name: "Bilal Ahmed",
//     specialty: "Full Stack Developer",
//     imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     id: 5,
//     name: "Hira Malik",
//     specialty: "Quality Assurance",
//     imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
//   {
//     id: 6,
//     name: "Usman Tariq",
//     specialty: "DevOps Engineer",
//     imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
//   },
//   {
//     id: 7,
//     name: "Fatima Noor",
//     specialty: "Project Manager",
//     imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
//   },
//   {
//     id: 8,
//     name: "Hamza Qureshi",
//     specialty: "Mobile App Developer",
//     imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
//   },
// ];

const UsersOverview = () => {
  const [users, setUsers] = useState([]);
  const { allMembers } = useGetAllMembers();
  const [startIndex, setStartIndex] = useState(0);
  const variableUsers =
    users.length > 0 ? users.slice(startIndex, startIndex + 4) : [];
  const handleNext = () => {
    if (startIndex + 4 < users.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await allMembers();
      setUsers(res ? res : []);
    };
    getUsers();
  }, []);

  return (
    <div className='border-2 bg-white border-gray-50 shadow-sm rounded-lg py-6 px-5 space-y-3'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl tracking-wide font-medium text-purple-600'>
          Users Overview
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
        {users.length > 0 ? (
          variableUsers.map((user, index) => (
            <div
              key={user._id}
              className={`${
                index % 2 === 0 ? "bg-pink-100" : "bg-fuchsia-200"
              } flex flex-col border border-gray-200 rounded-md py-2 px-2 items-center justify-center w-full`}
            >
              <img
                src={`${user.imageUrl ? user.imageUrl : "/images/img.png"}`}
                className='w-20 h-20 rounded-full object-cover'
              />
              <h2 className='text-purple-500 text-md'>
                {user.firstName} {user.lastName}
              </h2>
              <h2 className='text-gray-500 text-md'>{user.email}</h2>
              <h2 className='text-rose-500 text-sm'>{`${
                user.speciality ? user.speciality : "N/A"
              }`}</h2>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default UsersOverview;

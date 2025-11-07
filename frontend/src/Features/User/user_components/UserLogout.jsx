import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const UserLogout = ({ setlogoutmodal }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout clicked");
    localStorage.removeItem("User");
    navigate("/");
  };
  return (
    <div
      className='fixed inset-0 z-50 p-3 w-full bg-black/50 shadow-2xl flex items-center justify-center'
      onClick={() => setlogoutmodal(false)}
    >
      <div
        className='flex flex-col gap-3 items-center bg-white w-fit py-5 px-8 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='py-5 px-5 border-2 flex items-center justify-center border-rose-600 rounded-full '>
          <FaExclamationTriangle className='text-3xl text-rose-600' />
        </div>
        <h1 className='text-2xl font-bold tracking-wider text-rose-500'>
          Come Back Soon
        </h1>
        <h2 className='text-sm tracking-wider text-purple-400'>
          Are you sure you want to logout
        </h2>
        <div className='flex w-full items-center justify-center gap-3 mt-3'>
          <button
            onClick={() => handleLogout()}
            className='bg-teal-600 text-white py-1 px-3 rounded-md hover:cursor-pointer'
          >
            Yes
          </button>
          <button
            onClick={() => setlogoutmodal(false)}
            className='bg-rose-600 text-white py-1 px-3 rounded-md hover:cursor-pointer'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogout;

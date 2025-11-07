import { useState } from "react";
import { FiFolder, FiGrid, FiLogOut } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserLogout from "./UserLogout";
import UserProfile from "../user_pages/UserProfile";

const UserSideBar = () => {
  const data = JSON.parse(localStorage.getItem("User"));
  const [logoutmodal, setlogoutmodal] = useState(false);
  const [profilemodal, setprofilemodal] = useState(false);

  return (
    <>
      <div className='flex flex-col items-center justify-between border-r-2 border-pink-200 bg-purple-100 fixed h-screen px-3 py-4 text-rose-600'>
        <div>
          <h2 className='tracking-wide font-semibold text-sm border-x-3 text-purple-800 border-rose-400 py-1 px-1 rounded-md '>
            PM
          </h2>
        </div>
        <div className='flex flex-col items-center justify-center gap-8 '>
          <NavLink
            to='tasks-board'
            className={({ isActive }) =>
              `${isActive && "bg-purple-300 py-3 px-3 rounded-full"}`
            }
          >
            <FiFolder />
          </NavLink>
          <NavLink
            to='/user-charts'
            className={({ isActive }) =>
              `${isActive && "bg-purple-300 py-3 px-3 rounded-full"}`
            }
          >
            <FaRegCommentDots />
          </NavLink>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <div className='hover:cursor-pointer hover:bg-purple-300 py-3 px-3 rounded-full'>
            <FiLogOut onClick={() => setlogoutmodal(true)} />
          </div>
          <img
            src={`${data.imageUrl ? data.imageUrl : "/images/img.png"}`}
            alt='img'
            onClick={() => setprofilemodal(true)}
            className='cursor-pointer w-12 h-12 object-cover rounded-full'
          />
        </div>
      </div>
      {logoutmodal && <UserLogout setlogoutmodal={setlogoutmodal} />}
      {profilemodal && <UserProfile setprofilemodal={setprofilemodal} />}
    </>
  );
};

export default UserSideBar;

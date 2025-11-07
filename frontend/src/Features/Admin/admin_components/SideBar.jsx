import { useState } from "react";
import { FiFolder, FiGrid, FiLogOut } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import LogoutModal from "./LogoutModal";
import { NavLink } from "react-router-dom";
import AdminProfile from "../admin_pages/AdminProfile";

const SideBar = () => {
  const [profilemodal, setprofilemodal] = useState(false);
  const data = JSON.parse(localStorage.getItem("Admin"));
  const [logoutmodal, setlogoutmodal] = useState(false);

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
            to='dashboard'
            className={({ isActive }) =>
              `${isActive && "bg-purple-300 py-3 px-3 rounded-full"}`
            }
          >
            <FiGrid />
          </NavLink>
          <NavLink
            to='/projects'
            className={({ isActive }) =>
              `${isActive && "bg-purple-300 py-3 px-3 rounded-full"}`
            }
          >
            <FiFolder />
          </NavLink>
          <NavLink
            to='/teams'
            className={({ isActive }) =>
              `${isActive && "bg-purple-300 py-3 px-3 rounded-full"}`
            }
          >
            <FaUsers />
          </NavLink>
          <NavLink
            to='/charts'
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
            onClick={() => setprofilemodal(!profilemodal)}
            className='cursor-pointer w-12 h-12 object-cover rounded-full'
          />
        </div>
      </div>
      {logoutmodal && <LogoutModal setlogoutmodal={setlogoutmodal} />}
      {profilemodal && <AdminProfile setprofilemodal={setprofilemodal} />}
    </>
  );
};

export default SideBar;

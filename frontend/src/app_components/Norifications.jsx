import { useContext, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { FaBell } from "react-icons/fa";

const Norifications = () => {
  const { notifications, setNotifications } = useContext(SocketContext);
  const [openlist, setOpenlist] = useState(false);
  const handleRemove = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div>
      <button
        onClick={() => setOpenlist((prev) => !prev)}
        className='relative flex justify-center items-center gap-2 py-2 px-3 rounded-md hover:cursor-pointer'
      >
        <FaBell className='text-blue-700 text-3xl' />
        <span className='absolute -right-0.5 top-0 bg-rose-500 text-neutral-100 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
          {notifications.length}
        </span>
      </button>
      <ul
        className={`transform transition-all duration-300 origin-top ${
          openlist ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      >
        {notifications.length > 0 &&
          notifications.map((notify, index) => (
            <li
              onClick={() => handleRemove(index)}
              className='bg-teal-100 border-b-2 border-teal-200 max-w-fit py-2 px-3 rounded-sm hover:cursor-pointer hover:bg-teal-200 transition-colors duration-300'
              key={index}
            >
              {notify.message}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Norifications;

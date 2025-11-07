import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calander = () => {
  return (
    <div className='border-2 border-gray-50 shadow-sm rounded-lg'>
      <Calendar next2Label={null} prev2Label={null} value={new Date()} />
    </div>
  );
};

export default Calander;

const PercentageBar = ({ completedTasks, totalTasks }) => {
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
      <div
        className='bg-linear-to-r from-rose-400 to-purple-500 h-3 text-xs text-white text-center rounded-full transition-all duration-500 ease-in-out'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default PercentageBar;

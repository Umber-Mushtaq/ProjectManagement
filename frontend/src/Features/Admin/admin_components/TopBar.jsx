import Profile from "./Profile";

const TopBar = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center py-2 px-5'>
        <h2 className='text-2xl tracking-wide font-medium'>Dashboard</h2>
        <Profile />
      </div>
    </div>
  );
};

export default TopBar;

const Stats = () => {
  return (
    <div className='border-2 bg-white border-gray-50 shadow-sm rounded-lg py-6 px-5 space-y-3'>
      <h2 className='text-2xl tracking-wide font-medium text-purple-600'>
        Project Categories
      </h2>
      <ul className='list-disc marker:text-rose-500 pl-6 text-gray-700 mt-3 space-y-5 text-sm'>
        <li>Web Development</li>
        <li>Mobile App Development</li>
        <li>UI/UX Design</li>
        <li>Backend Development</li>
        <li>Frontend Development</li>
        <li>Quality Analysis</li>
      </ul>
    </div>
  );
};

export default Stats;

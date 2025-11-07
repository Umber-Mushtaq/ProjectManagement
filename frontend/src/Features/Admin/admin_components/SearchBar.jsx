import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className='flex items-center justify-between w-auto md:w-2xl border-2 border-purple-200 rounded-full py-2 px-4'>
      <input
        type='text'
        placeholder='Search'
        className='border-none outline-none text-gray-500'
      />
      <FiSearch className='text-2xl text-gray-400' />
    </div>
  );
};

export default SearchBar;
